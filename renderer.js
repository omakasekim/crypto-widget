// renderer.js

// Helper function to fetch JSON data
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error: ${response.status} for URL: ${url}\nResponse: ${text}`);
      throw new Error(`HTTP error: ${response.status} for URL: ${url}`);
    }
    return await response.json();
  }
  
  // Get saved custom KRW rate from localStorage
  let customKrwRate = localStorage.getItem("customKrwRate") || null;
  if (customKrwRate) {
    customKrwRate = parseFloat(customKrwRate);
  }
  
  // Listen for saving custom KRW rate
  document.getElementById("saveCustomRate").addEventListener("click", () => {
    const inputVal = parseFloat(document.getElementById("custom-krw-rate").value);
    if (!isNaN(inputVal) && inputVal > 0) {
      customKrwRate = inputVal;
      localStorage.setItem("customKrwRate", inputVal);
      console.log(`Custom KRW exchange rate saved: ${inputVal}`);
      fetchData(); // Refresh prices immediately
    } else {
      console.error("Invalid KRW rate entered.");
    }
  });
  
  // Listen for reset button click (restore live exchange rate)
  document.getElementById("resetValues").addEventListener("click", () => {
    customKrwRate = null;
    localStorage.removeItem("customKrwRate");
    console.log("Resetting to live exchange rate.");
    fetchData(); // Refresh prices immediately
  });
  
  // Fetch and update the widget
  async function fetchData() {
    try {
      // 1. Get live exchange rate USD → KRW
      const rateURL = "https://api.exchangerate-api.com/v4/latest/USD";
      const rateData = await fetchJSON(rateURL);
      let exchangeRate = rateData.rates.KRW; // Default to live rate
  
      // If a custom rate is set, override with that
      if (customKrwRate) {
        exchangeRate = customKrwRate;
      }
  
      // 2. Get Upbit prices for BTC, ETH, and USDT (KRW)
      const upbitURL = "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-USDT";
      const upbitData = await fetchJSON(upbitURL);
      const upbitBTC = upbitData.find(item => item.market === 'KRW-BTC')?.trade_price || 0;
      const upbitETH = upbitData.find(item => item.market === 'KRW-ETH')?.trade_price || 0;
      const upbitUSDT = upbitData.find(item => item.market === 'KRW-USDT')?.trade_price || 0;
  
      // 3. Get Binance prices for BTC and ETH (USD)
      const binanceBTCData = await fetchJSON("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
      const binanceBTC = parseFloat(binanceBTCData.price);
  
      const binanceETHData = await fetchJSON("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT");
      const binanceETH = parseFloat(binanceETHData.price);
  
      // 4. Get Tether price from CoinGecko (USD)
      const coingeckoData = await fetchJSON("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd");
      const coinGeckoTether = parseFloat(coingeckoData.tether.usd);
  
      // 5. Calculate Kimchi Premium using the custom or live KRW exchange rate
      function calcPremium(upbitPrice, binancePrice) {
        return ((upbitPrice - (binancePrice * exchangeRate)) / (binancePrice * exchangeRate)) * 100;
      }
  
      const premiumBTC = calcPremium(upbitBTC, binanceBTC);
      const premiumETH = calcPremium(upbitETH, binanceETH);
      const premiumUSDT = ((upbitUSDT - (coinGeckoTether * exchangeRate)) / (coinGeckoTether * exchangeRate)) * 100;
  
      // 6. Update UI
      document.getElementById("exchange").textContent =
        `💰 1 USD = ${exchangeRate.toFixed(2)} KRW ${customKrwRate ? "(Custom)" : "(Live)"}`;
  
      document.getElementById("btc").textContent =
        `BTC: Upbit ${upbitBTC.toLocaleString()} KRW | Binance ${binanceBTC.toFixed(2)} USD | Premium: ${premiumBTC.toFixed(2)}%`;
  
      document.getElementById("eth").textContent =
        `ETH: Upbit ${upbitETH.toLocaleString()} KRW | Binance ${binanceETH.toFixed(2)} USD | Premium: ${premiumETH.toFixed(2)}%`;
  
      document.getElementById("usdt").textContent =
        `USDT: Upbit ${upbitUSDT.toLocaleString()} KRW | Binance 1.00 USD | Premium: ${premiumUSDT.toFixed(2)}%`;
  
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("exchange").textContent = "Error loading data";
    }
  }
  
  // Initial fetch and refresh every 60 seconds
  fetchData();
  setInterval(fetchData, 10000);
  
