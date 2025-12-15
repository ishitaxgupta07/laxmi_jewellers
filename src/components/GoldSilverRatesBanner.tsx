'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Clock } from 'lucide-react'

interface RatesData {
  gold22k: number
  gold24k: number
  silver: number
  lastUpdated: string
  source: string
}

export default function GoldSilverRatesBanner() {
  const [rates, setRates] = useState<RatesData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/gold-prices.json')
      .then(res => res.json())
      .then((data: RatesData) => {
        setRates(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load gold/silver rates:', err)
        setLoading(false)
      })
  }, [])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  if (loading) {
    return (
      <div className="w-full bg-primary text-primary-foreground py-2.5 px-4 border-b border-primary-foreground/10">
        <div className="max-w-[100rem] mx-auto flex items-center justify-center">
          <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
          <span className="ml-2 text-sm">Loading rates...</span>
        </div>
      </div>
    )
  }

  if (!rates) {
    return null
  }

  return (
    <div className="w-full bg-primary text-primary-foreground py-2.5 px-4 border-b border-primary-foreground/10">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-center justify-between md:justify-center gap-4 md:gap-8 flex-wrap">
          {/* Gold 22K */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-yellow-300" />
            <div>
              <div className="text-xs opacity-80">Gold 22K</div>
              <div className="font-navbar font-semibold">₹{rates.gold22k?.toLocaleString('en-IN')}/10g</div>
            </div>
          </div>

          {/* Gold 24K */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <div>
              <div className="text-xs opacity-80">Gold 24K</div>
              <div className="font-navbar font-semibold">₹{rates.gold24k?.toLocaleString('en-IN')}/10g</div>
            </div>
          </div>

          {/* Silver */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-300" />
            <div>
              <div className="text-xs opacity-80">Silver 999</div>
              <div className="font-navbar font-semibold">₹{rates.silver?.toLocaleString('en-IN')}/10g</div>
            </div>
          </div>

          {/* Updated time */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs opacity-70">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated {formatTime(rates.lastUpdated)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
