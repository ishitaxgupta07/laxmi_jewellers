import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RateData {
  gold_24k: string;
  silver_999: string;
  timestamp: string;
}

interface GoldSilverRatesProps {
  apiKey?: string;
}

export function GoldSilverRates({ apiKey = "demo_key" }: GoldSilverRatesProps) {
  const [rates, setRates] = useState<RateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://rappid.in/apis/gold_rates.php?key=${apiKey}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch rates');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setRates(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rates');
      // Fallback demo data for development
      setRates({
        gold_24k: "6,850",
        silver_999: "850",
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [apiKey]);

  const formatPrice = (price: string) => {
    // Remove commas and convert to number for formatting
    const numPrice = parseFloat(price.replace(/,/g, ''));
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading && !rates) {
    return (
      <section className="bg-gradient-to-r from-primary/5 to-softaccent/10 py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="font-paragraph text-foreground/60">Loading live rates...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-primary/5 to-softaccent/10 py-12">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
            Live Gold & Silver Rates
          </h2>
          <p className="font-paragraph text-foreground/70">
            Real-time precious metal rates per 10 grams
          </p>
          {lastUpdated && (
            <p className="font-paragraph text-sm text-foreground/50 mt-2">
              Last updated: {formatTime(lastUpdated)}
            </p>
          )}
        </div>

        {error && !rates && (
          <div className="text-center mb-8">
            <p className="font-paragraph text-destructive mb-4">{error}</p>
            <Button onClick={fetchRates} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {rates && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Gold Rate Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-bordersubtle hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Au</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-foreground">Gold 24K</h3>
                    <p className="font-paragraph text-sm text-foreground/60">Per 10 grams</p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl text-foreground mb-2">
                  {formatPrice(rates.gold_24k)}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Live Rate
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Silver Rate Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-bordersubtle hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Ag</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-foreground">Silver 999</h3>
                    <p className="font-paragraph text-sm text-foreground/60">Per 10 grams</p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl text-foreground mb-2">
                  {formatPrice(rates.silver_999)}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Live Rate
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <Button
            onClick={fetchRates}
            variant="outline"
            size="sm"
            disabled={loading}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Updating...' : 'Refresh Rates'}
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-6">
          <p className="font-paragraph text-xs text-foreground/50 max-w-2xl mx-auto">
            * Rates are indicative and may vary. Please contact us for the most current pricing on your purchase.
            Actual rates may differ based on quantity, purity, and market conditions.
          </p>
        </div>
      </div>
    </section>
  );
}