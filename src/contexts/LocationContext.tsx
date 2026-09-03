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
const LOCATION_API_URL = `${import.meta.env.VITE_API_URL || 'https://mgl-digital-media-auth.mustafagl01.workers.dev'}/api/location`;

function detectCountryFromClient(): string | null {
  if (typeof window === 'undefined') return null;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  const language = navigator.language?.toUpperCase() ?? '';
  const timezoneUpper = timezone.toUpperCase();

  // PRIORITY: Timezone over language (location matters more than browser language)

  // Turkey timezone detection - HIGHEST PRIORITY for TR
  if (timezoneUpper.includes('ISTANBUL') || timezoneUpper.includes('TURKEY')) {
    return 'TR';
  }

  // UK timezone detection - HIGHEST PRIORITY for GB
  if (timezoneUpper.includes('LONDON') || timezoneUpper.includes('EUROPE/LONDON')) {
    return 'GB';
  }

  // Check other UK/Ireland timezones
  if (timezone.startsWith('Europe/') && ['London', 'Belfast', 'Dublin', 'Guernsey', 'Isle_of_Man', 'Jersey'].some(tz => timezoneUpper.includes(tz.toUpperCase()))) {
    return 'GB';
  }

  // Language-based detection as fallback (only if timezone doesn't match)
  const isTurkishLanguage = language === 'TR' || language.startsWith('TR-');
  const isEnglishUK = language === 'EN-GB';

  if (isTurkishLanguage) {
    return 'TR';
  }

  if (isEnglishUK) {
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
        const response = await fetch(LOCATION_API_URL, {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Location API returned ${response.status}`);
        }

        const data = (await response.json()) as LocationApiResponse;
        const normalizedCountry = data.country?.toUpperCase() ?? null;

        setCountryCode(normalizedCountry);
        setRegion(resolveRegionByCountry(normalizedCountry));

        if (normalizedCountry) {
          window.localStorage.setItem(COUNTRY_STORAGE_KEY, normalizedCountry);
        }
      } catch (error) {
        console.info('[Location] Using cached or browser-derived region.', error);
        const fallbackCountry = cachedCountry || detectCountryFromClient();

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
