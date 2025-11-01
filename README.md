# 🕒 PWA Timer

A simple **Progressive Web App (PWA)** timer that works **offline** once installed.

---

## 🚀 Features
- Works offline after first visit  
- Installable on desktop and mobile  
- Sends timer notifications  
- Fully functional on `localhost`

---

## ⚙️ How to Run Locally

1. **Clone or Download** the project  
   ```bash
   git clone https://github.com/naraina20/pwa-focus-timer```
   cd pwa-focus-timer

2. Open in VS Code → Right-click index.html → Open with Live Server

   ⚠️ PWA won’t work using file:// — use localhost only.

    The console should show:

    Service Worker registered: http://127.0.0.1:5500/sw.js


3. Install the App

    Desktop: Click the install icon in your browser.

    Mobile: Tap “Add to Home Screen”.

4. Go Offline & Test

    Stop Live Server

    Reopen the installed app → It should still work.

---

### 🧠 Notes (for developers)

Update cache by changing version in sw.js:

const CACHE_NAME = 'pwa-timer-v2';

To clear old cache: DevTools → Application → Storage → Clear site data.


### 👨‍💻 Author

Made by Narayan dewasi — HTML, CSS, and JavaScript only.
