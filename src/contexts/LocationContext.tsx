import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { REGIONAL_PRICING, resolveRegionByCountry, type PricingRegionCode, type RegionalPricing } from '../config/pricing';

type LocationApiResponse = {
  country?: string;
};

type LocationContextValue = {
  countryCode: string | null;
  region: PricingRegionCode;
  pricing: RegionalPricing;
  isLoadingLocation: boolean;
};

const DEFAULT_REGION: PricingRegionCode = 'GB';
const COUNTRY_STORAGE_KEY = 'mgl-country-code';

function detectCountryFromClient(): string | null {
  if (typeof window === 'undefined') return null;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone?.toUpperCase() ?? '';
  const language = navigator.language?.toUpperCase() ?? '';

  // Turkey detection
  if (timezone.includes('ISTANBUL') || language.startsWith('TR')) {
    return 'TR';
  }

  // UK detection (London timezone, Europe/London, or en-GB language)
  if (timezone.includes('LONDON') || timezone.includes('EUROPE/LONDON') || language.startsWith('EN-GB')) {
    return 'GB';
  }

  // Default to GB for international (non-TR) users
  return 'GB';
}

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [region, setRegion] = useState<PricingRegionCode>(DEFAULT_REGION);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      const cachedCountry = window.localStorage.getItem(COUNTRY_STORAGE_KEY);

      try {
        const response = await fetch('/api/location', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Location API returned ${response.status}`);
        }

        const data = (await response.json()) as LocationApiResponse;
        const normalizedCountry = data.country?.toUpperCase() ?? null;

        console.log('[Location] API detected country:', normalizedCountry);

        setCountryCode(normalizedCountry);
        setRegion(resolveRegionByCountry(normalizedCountry));

        if (normalizedCountry) {
          window.localStorage.setItem(COUNTRY_STORAGE_KEY, normalizedCountry);
        }
      } catch (error) {
        console.log('[Location] API failed, using fallback:', { cachedCountry, error });
        const fallbackCountry = cachedCountry || detectCountryFromClient();

        console.log('[Location] Fallback country:', fallbackCountry, 'Region:', resolveRegionByCountry(fallbackCountry));

        setCountryCode(fallbackCountry);
        setRegion(resolveRegionByCountry(fallbackCountry));
      } finally {
        setIsLoadingLocation(false);
      }
    };

    void fetchLocation();
  }, []);

  const value = useMemo<LocationContextValue>(
    () => ({
      countryCode,
      region,
      pricing: REGIONAL_PRICING[region],
      isLoadingLocation,
    }),
    [countryCode, region, isLoadingLocation]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }

  return context;
}
