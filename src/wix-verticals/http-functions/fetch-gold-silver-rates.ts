import { response } from 'wix-http-functions';
import { query } from 'wix-data';

const CACHE_DURATION_MARKET_HOURS = 5 * 60 * 1000; // 5 minutes
const CACHE_DURATION_OFF_HOURS = 30 * 60 * 1000; // 30 minutes
const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second

interface RatesData {
  city: string;
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silverPerGram: number;
  silverPerKg: number;
  timestamp: string;
  source: string;
  gold10gm?: number; // Per 10 grams
  silver10gm?: number; // Per 10 grams
}

interface CacheEntry {
  data: RatesData;
  timestamp: number;
}

let cache: CacheEntry | null = null;

function isMarketHours(): boolean {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const dayOfWeek = istTime.getDay();

  // Market hours: Monday-Friday, 9:30 AM - 5:00 PM IST
  if (dayOfWeek === 0 || dayOfWeek === 6) return false; // Sunday or Saturday
  if (hours < 9 || (hours === 9 && minutes < 30)) return false;
  if (hours >= 17) return false;

  return true;
}

async function fetchWithBackoff(url: string, retries = 0): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      const backoffDelay = INITIAL_BACKOFF * Math.pow(2, retries);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
      return fetchWithBackoff(url, retries + 1);
    }
    throw error;
  }
}

async function fetchBullionsCoInRates(): Promise<RatesData> {
  try {
    // Fetch from bullions.co.in
    const apiUrl = 'https://bullions.co.in/api/rates';
    const apiData = await fetchWithBackoff(apiUrl);

    // Parse the response - bullions.co.in returns rates per gram
    // We need to calculate per 10 grams
    const goldPerGram = parseFloat(apiData.gold) || 0;
    const silverPerGram = parseFloat(apiData.silver) || 0;

    const ratesData: RatesData = {
      city: 'India',
      gold24k: goldPerGram,
      gold22k: goldPerGram * 0.916, // Approximate conversion
      gold18k: goldPerGram * 0.75, // Approximate conversion
      silverPerGram: silverPerGram,
      silverPerKg: silverPerGram * 1000,
      gold10gm: goldPerGram * 10, // Per 10 grams
      silver10gm: silverPerGram * 10, // Per 10 grams
      timestamp: new Date().toISOString(),
      source: 'Bullions.co.in',
    };

    return ratesData;
  } catch (error) {
    console.error('Error fetching from bullions.co.in:', error);
    throw error;
  }
}

async function getLastSuccessfulRates(): Promise<RatesData | null> {
  try {
    const results = await query('goldsilverrates')
      .eq('isActive', true)
      .descending('_updatedDate')
      .limit(1)
      .find();

    if (results.items.length > 0) {
      const item = results.items[0];
      return {
        city: item.city || 'India',
        gold24k: item.gold24k || 0,
        gold22k: item.gold22k || 0,
        gold18k: item.gold18k || 0,
        silverPerGram: item.silverPerGram || 0,
        silverPerKg: item.silverPerKg || 0,
        gold10gm: item.gold10gm || 0,
        silver10gm: item.silver10gm || 0,
        timestamp: item._updatedDate instanceof Date ? item._updatedDate.toISOString() : (item._updatedDate || new Date().toISOString()),
        source: item.source || 'Bullions.co.in',
      };
    }
  } catch (error) {
    console.error('Error fetching last successful rates:', error);
  }
  return null;
}

async function saveRatesToDatabase(data: RatesData): Promise<void> {
  try {
    const existingResults = await query('goldsilverrates')
      .eq('city', data.city)
      .limit(1)
      .find();

    if (existingResults.items.length > 0) {
      await query('goldsilverrates').updateItem({
        _id: existingResults.items[0]._id,
        city: data.city,
        gold24k: data.gold24k,
        gold22k: data.gold22k,
        gold18k: data.gold18k,
        silverPerGram: data.silverPerGram,
        silverPerKg: data.silverPerKg,
        gold10gm: data.gold10gm,
        silver10gm: data.silver10gm,
        timestamp: new Date(data.timestamp),
        source: data.source,
        isActive: true,
      });
    } else {
      await query('goldsilverrates').insertItem({
        _id: `${data.city}-${Date.now()}`,
        city: data.city,
        gold24k: data.gold24k,
        gold22k: data.gold22k,
        gold18k: data.gold18k,
        silverPerGram: data.silverPerGram,
        silverPerKg: data.silverPerKg,
        gold10gm: data.gold10gm,
        silver10gm: data.silver10gm,
        timestamp: new Date(data.timestamp),
        source: data.source,
        isActive: true,
      });
    }
  } catch (error) {
    console.error('Error saving rates to database:', error);
  }
}

export async function get_fetch_gold_silver_rates(request: any) {
  try {
    const now = Date.now();
    const cacheDuration = isMarketHours() ? CACHE_DURATION_MARKET_HOURS : CACHE_DURATION_OFF_HOURS;

    // Check cache
    if (cache && (now - cache.timestamp) < cacheDuration) {
      return response({
        status: 200,
        body: {
          success: true,
          data: cache.data,
          cached: true,
        },
      });
    }

    // Fetch from bullions.co.in
    const ratesData = await fetchBullionsCoInRates();

    // Update cache
    cache = {
      data: ratesData,
      timestamp: now,
    };

    // Save to database
    await saveRatesToDatabase(ratesData);

    return response({
      status: 200,
      body: {
        success: true,
        data: ratesData,
        cached: false,
      },
    });
  } catch (error) {
    console.error('Error fetching gold/silver rates:', error);

    // Fallback to last successful rates
    const lastRates = await getLastSuccessfulRates();
    if (lastRates) {
      return response({
        status: 200,
        body: {
          success: true,
          data: lastRates,
          cached: true,
          fallback: true,
        },
      });
    }

    return response({
      status: 500,
      body: {
        success: false,
        error: 'Unable to fetch rates',
      },
    });
  }
}
