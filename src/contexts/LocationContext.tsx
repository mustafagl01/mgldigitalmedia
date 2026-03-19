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

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  const language = navigator.language?.toUpperCase() ?? '';
  const timezoneUpper = timezone.toUpperCase();

  console.log('[Location] Client detection:', { timezone, language, timezoneUpper });

  // PRIORITY: Timezone over language (location matters more than browser language)

  // Turkey timezone detection - HIGHEST PRIORITY for TR
  if (timezoneUpper.includes('ISTANBUL') || timezoneUpper.includes('TURKEY')) {
    console.log('[Location] Detected Turkey (timezone)');
    return 'TR';
  }

  // UK timezone detection - HIGHEST PRIORITY for GB
  if (timezoneUpper.includes('LONDON') || timezoneUpper.includes('EUROPE/LONDON')) {
    console.log('[Location] Detected UK (timezone)');
    return 'GB';
  }

  // Check other UK/Ireland timezones
  if (timezone.startsWith('Europe/') && ['London', 'Belfast', 'Dublin', 'Guernsey', 'Isle_of_Man', 'Jersey'].some(tz => timezoneUpper.includes(tz.toUpperCase()))) {
    console.log('[Location] Detected UK/Europe timezone');
    return 'GB';
  }

  // Language-based detection as fallback (only if timezone doesn't match)
  const isTurkishLanguage = language === 'TR' || language.startsWith('TR-');
  const isEnglishUK = language === 'EN-GB';

  console.log('[Location] Language fallback:', { isTurkishLanguage, isEnglishUK });

  if (isTurkishLanguage) {
    console.log('[Location] Detected Turkey (language fallback)');
    return 'TR';
  }

  if (isEnglishUK) {
    console.log('[Location] Detected UK (language fallback)');
    return 'GB';
  }

  // Default to GB for international (non-TR) users
  console.log('[Location] Defaulting to GB');
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
