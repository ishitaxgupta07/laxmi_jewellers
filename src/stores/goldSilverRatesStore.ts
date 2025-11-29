import { create } from 'zustand';

export interface RatesData {
  city: string;
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silverPerGram: number;
  silverPerKg: number;
  timestamp: string;
  source: string;
  gold10gm?: number;
  silver10gm?: number;
}

// Demo data for development/testing
const DEMO_RATES: RatesData = {
  city: 'India',
  gold24k: 7450,
  gold22k: 6830,
  gold18k: 5730,
  silverPerGram: 92.50,
  silverPerKg: 92500,
  gold10gm: 74500,
  silver10gm: 925,
  timestamp: new Date().toISOString(),
  source: 'Bullions.co.in',
};

interface RatesStore {
  rates: RatesData | null;
  loading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  isFallback: boolean;
  setRates: (rates: RatesData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastFetchTime: (time: number) => void;
  setIsFallback: (isFallback: boolean) => void;
  fetchRates: () => Promise<void>;
}

export const useGoldSilverRatesStore = create<RatesStore>((set, get) => ({
  rates: DEMO_RATES,
  loading: false,
  error: null,
  lastFetchTime: Date.now(),
  isFallback: false,

  setRates: (rates) => set({ rates }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setLastFetchTime: (time) => set({ lastFetchTime: time }),
  setIsFallback: (isFallback) => set({ isFallback }),

  fetchRates: async () => {
    const state = get();
    const now = Date.now();

    // Prevent too frequent fetches
    if (state.lastFetchTime && (now - state.lastFetchTime) < 60000) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await fetch('/_functions/fetch-gold-silver-rates');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();

      if (result.success && result.data) {
        set({
          rates: result.data,
          loading: false,
          lastFetchTime: now,
          isFallback: result.fallback || false,
        });
      } else {
        throw new Error(result.error || 'Failed to fetch rates');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Gold/Silver rates fetch error:', errorMessage);
      
      // Keep showing demo data on error instead of clearing rates
      set({
        error: errorMessage,
        loading: false,
        isFallback: true,
      });
    }
  },
}));
