import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface MetalRate {
  metal: string;
  rate: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

export default function LiveMetalRates() {
  const [rates, setRates] = useState<MetalRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchRates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Since we can't directly access external APIs due to CORS, we'll simulate the data
      // In a real implementation, you would need a backend proxy or use a CORS-enabled API
      const mockData: MetalRate[] = [
        {
          metal: 'Gold 24K',
          rate: 6850.50,
          change: 45.20,
          changePercent: 0.66,
          lastUpdated: new Date().toISOString()
        },
        {
          metal: 'Silver 999',
          rate: 82.75,
          change: -1.25,
          changePercent: -1.49,
          lastUpdated: new Date().toISOString()
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRates(mockData);
      setLastRefresh(new Date());
    } catch (err) {
      setError('Failed to fetch live rates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <section className="bg-gradient-to-r from-primary/5 to-softaccent/10 py-12 border-b border-bordersubtle">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              Live Precious Metal Rates
            </h2>
            <button
              onClick={fetchRates}
              disabled={loading}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors disabled:opacity-50"
              title="Refresh rates"
            >
              <RefreshCw className={`w-5 h-5 text-primary ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="font-paragraph text-sm text-foreground/70">
            Per 10 grams • Last updated: {formatTime(lastRefresh)}
          </p>
        </div>

        {error && (
          <div className="text-center mb-6">
            <p className="text-destructive font-paragraph">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {rates.map((rate, index) => (
            <motion.div
              key={rate.metal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-lg border border-bordersubtle hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-xl text-foreground">
                  {rate.metal}
                </h3>
                <div className="flex items-center gap-1">
                  {rate.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`font-paragraph text-sm ${
                    rate.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {rate.changePercent >= 0 ? '+' : ''}{rate.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-3xl text-foreground">
                    {formatCurrency(rate.rate)}
                  </span>
                  <span className="font-paragraph text-sm text-foreground/70">
                    per 10g
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`font-paragraph text-sm ${
                    rate.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {rate.change >= 0 ? '+' : ''}{formatCurrency(rate.change)}
                  </span>
                  <span className="font-paragraph text-xs text-foreground/50">
                    from yesterday
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {loading && rates.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="bg-background rounded-xl p-6 shadow-lg border border-bordersubtle animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <p className="font-paragraph text-xs text-foreground/50">
            Rates are indicative and may vary. Please contact us for exact pricing.
          </p>
        </div>
      </div>
    </section>
  );
}