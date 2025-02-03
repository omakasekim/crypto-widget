# 🏦 Crypto Kimchi Premium Widget 💰

A lightweight Electron-based widget that calculates the **Kimchi Premium** for BTC, ETH, and USDT in **real-time**.

- 🔹 **Custom KRW Exchange Rate Support** – Manually set your own USD → KRW rate.
- 🔹 **Real-Time Crypto Prices** – Fetches live data from **Upbit, Binance, and CoinGecko**.
- 🔹 **Kimchi Premium Calculation** – Compares Korean exchange prices with global rates.
- 🔹 **Lightweight & Portable** – Runs as a standalone desktop widget.

---

## 📜 Features

✅ **Custom KRW Exchange Rate** – Enter a manual exchange rate to override live rates.  
✅ **Real-Time Updates** – Fetches live crypto prices every 60 seconds.  
✅ **Kimchi Premium Calculation** – Compares Upbit prices with Binance and CoinGecko.  
✅ **Persistent Settings** – Saves custom settings so they remain after restarting.  
✅ **Reset to Live Values** – A button to switch back to live exchange rates anytime.  
✅ **Portable EXE Build** – Works as a standalone app without installation.  

---

## 🛠 Installation & Usage

### 1️⃣ Install Dependencies

You need **Node.js** installed. If you don’t have it, download it [here](https://nodejs.org/).  
Clone this repository and install dependencies:

```bash
git clone https://github.com/omakasekim/crypto-widget.git
cd crypto-widget
npm install
```

---

### 2️⃣ Run in Development Mode

To start the app in development mode:

```bash
npm start
```

---

### 3️⃣ Build a Portable EXE

To package the app as a **standalone EXE** for Windows:

```bash
electron-packager . MyWidget --platform=win32 --arch=x64 --out=release-builds --overwrite

```


---

## 📊 Data Sources

- **Exchange Rate Data:** [ExchangeRate-API](https://www.exchangerate-api.com/)
- **Crypto Prices:** [Upbit API](https://docs.upbit.com/), [Binance API](https://api.binance.com/), [CoinGecko API](https://www.coingecko.com/en/api)

---

## 🎯 How It Works

1. The app fetches the latest **USD → KRW** exchange rate from ExchangeRate-API.
2. It retrieves real-time **BTC, ETH, and USDT prices** from Upbit and Binance.
3. The **Kimchi Premium** is calculated using the formula:

   ```
   Kimchi Premium (%) = ((Upbit Price - (Binance Price * KRW Rate)) / (Binance Price * KRW Rate)) * 100
   ```

4. **Custom KRW Exchange Rate Support:** If you manually enter a USD → KRW rate, all calculations will use your custom value instead of the live exchange rate.
5. **Reset Button:** Reverts back to live exchange rates.

---



## 🛑 Troubleshooting

### ❓ "Error loading data"
- Ensure you have an **active internet connection**.
- Check if the APIs (Upbit, Binance, CoinGecko) are **not down**.

### ❓ App crashes on startup?
- Run the app with:

  ```bash
  npm start
  ```

  Check for errors in the console.

---

## 🔧 Future Improvements

- 🔄 **Multi-Currency Support** – Allow selection of different base currencies.
- 📈 **Historical Kimchi Premium Chart** – Track premium trends over time.
- 📡 **Web-Based Version** – Implement a version accessible via browser.

---

## ⚖️ License

MIT License © 2025 [Jeffrey Kim](https://github.com/omakasekim)

---

## 💬 Contact

📧 Email: jk9576@email.com  
📂 GitHub: [Your GitHub](https://github.com/omakasekim)

