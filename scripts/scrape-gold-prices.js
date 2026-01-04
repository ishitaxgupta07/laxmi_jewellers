const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeGoldPrices() {
  try {
    console.log('Fetching gold prices from bullions.co.in...\n');
    
    // Fetch the webpage
    const response = await axios.get('https://bullions.co.in/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Load HTML into cheerio
    const $ = cheerio.load(response.data);

    console.log('Page loaded successfully!');
    console.log('Parsing price data...\n');

    // Try multiple selectors and patterns for bullions.co.in
    const prices = {};
    
    // Pattern 1: Look for typical price display
    console.log('=== Method 1: Looking for price containers ===');
    $('div, span, td, p').each((i, elem) => {
      const text = $(elem).text().trim();
      const lowerText = text.toLowerCase();
      
      // Look for 22 Carat or 22K
      if ((lowerText.includes('22 carat') || lowerText.includes('22k') || lowerText.includes('22 k')) && !prices.gold22k) {
        // Look for ₹ followed by numbers
        const priceMatch = text.match(/₹\s*(\d{4,5}(?:\.\d{2})?)/);
        if (priceMatch) {
          prices.gold22k = Math.round(parseFloat(priceMatch[1]));
          console.log('Found 22K Gold:', text.substring(0, 100));
        }
      }
      
      // Look for 24 Carat or 24K
      if ((lowerText.includes('24 carat') || lowerText.includes('24k') || lowerText.includes('24 k')) && !prices.gold24k) {
        const priceMatch = text.match(/₹\s*(\d{4,5}(?:\.\d{2})?)/);
        if (priceMatch) {
          prices.gold24k = Math.round(parseFloat(priceMatch[1]));
          console.log('Found 24K Gold:', text.substring(0, 100));
        }
      }
      
      // Look for Silver
      if (lowerText.includes('silver') && lowerText.includes('gram') && !prices.silver) {
        const priceMatch = text.match(/₹\s*(\d{2,3}(?:\.\d{2})?)/);
        if (priceMatch && priceMatch[1] > 50 && priceMatch[1] < 300) {
          prices.silver = Math.round(parseFloat(priceMatch[1]));
          console.log('Found Silver:', text.substring(0, 100));
        }
      }
    });

    // Pattern 2: Look in tables
    console.log('\n=== Method 2: Looking in tables ===');
    $('table').each((tIndex, table) => {
      $(table).find('tr').each((rIndex, row) => {
        const rowText = $(row).text().toLowerCase();
        const cells = $(row).find('td, th');
        
        if (rowText.includes('22 karat') && rowText.includes('gold') && !prices.gold22k) {
          const fullText = $(row).text().replace(/\s+/g, '').trim();
          // Extract first occurrence of price like 12,430
          const match = fullText.match(/(\d{1,2},\d{3})/);
          if (match) {
            prices.gold22k = match[1].replace(/,/g, '');
            console.log('✓ Found 22K Gold: ₹' + prices.gold22k + ' per gram');
          }
        }
        
        if (rowText.includes('24 karat') && rowText.includes('gold') && !prices.gold24k) {
          const fullText = $(row).text().replace(/\s+/g, '').trim();
          // Extract first occurrence of price like 13,560
          const match = fullText.match(/(\d{1,2},\d{3})/);
          if (match) {
            prices.gold24k = match[1].replace(/,/g, '');
            console.log('✓ Found 24K Gold: ₹' + prices.gold24k + ' per gram');
          }
        }
        
        if (rowText.includes('silver 999') && !prices.silver) {
          const fullText = $(row).text().replace(/\s+/g, '').trim();
          
          // Extract silver price - look for price after "Rs₹" symbol
          // Pattern: 208 from "Silver999Fine(Rs₹)2082,079..."
          const match = fullText.match(/Rs₹\)(\d{3})/);
          if (match) {
            const price = parseInt(match[1]);
            // Validate silver price range (typically 50-500 per gram)
            if (price >= 50 && price <= 500) {
              prices.silver = match[1];
              console.log('✓ Found Silver 999: ₹' + prices.silver + ' per gram');
            }
          }
        }
      });
    });

    console.log('\n=== FINAL EXTRACTED PRICES ===');
    console.log('22K Gold per gram: ₹' + (prices.gold22k || 'Not found'));
    console.log('24K Gold per gram: ₹' + (prices.gold24k || 'Not found'));
    console.log('Silver per gram: ₹' + (prices.silver || 'Not found'));
    
    const timestamp = new Date().toISOString();
    console.log('\nTimestamp:', timestamp);
    
    // Create output data (multiply by 10 for per 10 grams)
    const output = {
      gold22k: prices.gold22k ? parseInt(prices.gold22k) * 10 : null,
      gold24k: prices.gold24k ? parseInt(prices.gold24k) * 10 : null,
      silver: prices.silver ? parseInt(prices.silver) * 10 : null,
      lastUpdated: timestamp,
      source: 'bullions.co.in'
    };
    
    // Save to JSON file
    const publicDir = path.join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log('\n✓ Created public/data directory');
    }
    
    const outputPath = path.join(publicDir, 'gold-prices.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log('✓ Saved to:', outputPath);
    console.log('\n=== JSON OUTPUT ===');
    console.log(JSON.stringify(output, null, 2));
    
    return output;

  } catch (error) {
    console.error('Error scraping gold prices:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

// Run the scraper
scrapeGoldPrices();
