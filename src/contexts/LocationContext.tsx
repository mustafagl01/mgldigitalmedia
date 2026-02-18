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

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [region, setRegion] = useState<PricingRegionCode>(DEFAULT_REGION);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
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

        setCountryCode(normalizedCountry);
        setRegion(resolveRegionByCountry(normalizedCountry));
      } catch {
        setCountryCode(null);
        setRegion(DEFAULT_REGION);
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
