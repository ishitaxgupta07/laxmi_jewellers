import React, { useEffect, useState } from 'react';
import { useGoldSilverRatesStore } from '@/stores/goldSilverRatesStore';
import { ChevronDown, Info, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RatesData {
  city: string;
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silverPerGram: number;
  silverPerKg: number;
  timestamp: string;
  source: string;
}

export default function GoldSilverRatesBanner() {
  const { rates, loading, error, isFallback, fetchRates } = useGoldSilverRatesStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetchRates().catch((err) => {
      console.error('Failed to fetch gold/silver rates:', err);
    });

    // Set up interval for periodic updates
    const isMarketHours = () => {
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const dayOfWeek = istTime.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6) return false;
      if (hours < 9 || (hours === 9 && minutes < 30)) return false;
      if (hours >= 17) return false;

      return true;
    };

    const interval = setInterval(() => {
      fetchRates().catch((err) => {
        console.error('Failed to fetch gold/silver rates:', err);
      });
    }, isMarketHours() ? 5 * 60 * 1000 : 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchRates]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!rates && loading) {
    return (
      <div
        className="w-full bg-gradient-to-r from-primary to-primary-foreground text-foreground py-3 px-4 sticky top-0 z-40 shadow-md"
        role="status"
        aria-live="polite"
        aria-label="Loading gold and silver rates"
      >
        <div className="max-w-[100rem] mx-auto flex items-center justify-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-foreground border-t-transparent rounded-full" />
          <span className="text-sm font-paragraph">Loading rates...</span>
        </div>
      </div>
    );
  }

  if (!rates && error) {
    return (
      <div
        className="w-full bg-gradient-to-r from-primary to-primary-foreground text-foreground py-3 px-4 sticky top-0 z-40 shadow-md"
        role="status"
        aria-live="polite"
        aria-label="Gold and silver rates unavailable"
      >
        <div className="max-w-[100rem] mx-auto flex items-center justify-center gap-2">
          <span className="text-sm font-paragraph">Gold & Silver rates temporarily unavailable</span>
        </div>
      </div>
    );
  }

  if (!rates) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-gradient-to-r from-primary to-primary-foreground text-foreground sticky top-0 z-40 shadow-md"
        role="region"
        aria-label="Gold and silver rates banner"
      >
        <div className="max-w-[100rem] mx-auto px-4 py-3">
          {/* Compact view */}
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {/* Left: City and timestamp */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs md:text-sm font-paragraph font-semibold">
                  {rates.city}
                </span>
                <span className="text-xs text-foreground/70 hidden sm:inline">
                  {formatDate(rates.timestamp)} {formatTime(rates.timestamp)} IST
                </span>
                {isFallback && (
                  <span
                    className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                    aria-label="Using cached rates"
                  >
                    Cached
                  </span>
                )}
              </div>
            </div>

            {/* Center: Key rates (compact) */}
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="text-xs text-foreground/70">Gold 24K</div>
                <div className="font-semibold">₹{rates.gold24k.toFixed(0)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-foreground/70">Silver</div>
                <div className="font-semibold">₹{rates.silverPerGram.toFixed(0)}</div>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowInfoModal(true)}
                className="p-1.5 hover:bg-foreground/10 rounded transition-colors"
                aria-label="Show rate information"
                title="Information about rates"
              >
                <Info size={18} />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-foreground/10 rounded transition-colors md:hidden"
                aria-label={isExpanded ? 'Collapse rates' : 'Expand rates'}
                aria-expanded={isExpanded}
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 hover:bg-foreground/10 rounded transition-colors"
                aria-label={isCollapsed ? 'Expand banner' : 'Collapse banner'}
                title={isCollapsed ? 'Show banner' : 'Hide banner'}
              >
                <TrendingUp size={18} />
              </button>
            </div>
          </div>

          {/* Expanded view (mobile) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 pt-3 border-t border-foreground/20 grid grid-cols-2 gap-3 md:hidden"
              >
                <div className="text-center">
                  <div className="text-xs text-foreground/70">Gold 24K</div>
                  <div className="font-semibold text-sm">₹{rates.gold24k.toFixed(0)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-foreground/70">Gold 22K</div>
                  <div className="font-semibold text-sm">₹{rates.gold22k.toFixed(0)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-foreground/70">Gold 18K</div>
                  <div className="font-semibold text-sm">₹{rates.gold18k.toFixed(0)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-foreground/70">Silver/g</div>
                  <div className="font-semibold text-sm">₹{rates.silverPerGram.toFixed(0)}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Info Modal */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Gold & Silver Rates</DialogTitle>
            <DialogDescription className="font-paragraph">
              Current rates for {rates.city}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* BIS Hallmark Badge */}
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="text-2xl">✓</div>
              <div>
                <div className="font-semibold text-sm">BIS Hallmark Certified</div>
                <div className="text-xs text-foreground/70">
                  All rates comply with Bureau of Indian Standards
                </div>
              </div>
            </div>

            {/* Detailed Rates */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Gold Rates (per gram)</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-background border border-bordersubtle rounded">
                  <span>24K:</span>
                  <span className="font-semibold">₹{rates.gold24k.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-2 bg-background border border-bordersubtle rounded">
                  <span>22K:</span>
                  <span className="font-semibold">₹{rates.gold22k.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-2 bg-background border border-bordersubtle rounded col-span-2">
                  <span>18K:</span>
                  <span className="font-semibold">₹{rates.gold18k.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Silver Rates */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Silver Rates</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-background border border-bordersubtle rounded">
                  <span>Per gram:</span>
                  <span className="font-semibold">₹{rates.silverPerGram.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-2 bg-background border border-bordersubtle rounded">
                  <span>Per kg:</span>
                  <span className="font-semibold">₹{rates.silverPerKg.toFixed(0)}</span>
                </div>
              </div>
            </div>

            {/* Timestamp and Source */}
            <div className="text-xs text-foreground/70 space-y-1 pt-2 border-t border-bordersubtle">
              <div>
                <span className="font-semibold">Last Updated:</span> {formatDate(rates.timestamp)}{' '}
                {formatTime(rates.timestamp)} IST
              </div>
              <div>
                <span className="font-semibold">Source:</span>{' '}
                <a
                  href="https://www.ibja.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  aria-label="Visit IBJA website"
                >
                  {rates.source} (India Bullion & Jewellers Association)
                </a>
              </div>
              {isFallback && (
                <div className="text-yellow-700">
                  ⚠️ Showing cached rates. Live rates unavailable.
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'PriceSpecification',
          priceCurrency: 'INR',
          price: rates.gold24k,
          description: `Gold 24K rate in ${rates.city}`,
          validFrom: rates.timestamp,
        })}
      </script>
    </>
  );
}
