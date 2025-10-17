# WhereAmI - GPS Location App

A web-based GPS location finder that works on Android and iOS browsers. Access your precise GPS coordinates, view your location on an interactive map, and install as a home screen app with a beautiful compass icon.

## Features

✨ **Core Features:**
- 📍 Real-time GPS location tracking via browser Geolocation API
- 🗺️ Interactive map display with pinpointed location (using Leaflet.js)
- 📊 Detailed location coordinates (latitude, longitude)
- 🎯 Location accuracy information in meters
- 📏 Altitude tracking (when available)
- 🧭 Heading/compass direction (when available)
- 💨 Current speed in km/h (when available)
- ⏰ Timestamp of last update
- 📋 Copy coordinates to clipboard
- 🔗 Share location via native share or map links
- 🔄 Real-time location updates
- 🌐 Works on any device with a modern web browser
- 🧭 **NEW:** Compass icon for home screen app installation
- 📱 **NEW:** Progressive Web App (PWA) support - install as native app

## Requirements

- **Modern Web Browser** with Geolocation API support:
  - Chrome/Edge (recommended)
  - Safari (iOS 13+)
  - Firefox
  - Mobile browsers (Android Chrome, Safari on iOS)
- **HTTPS Connection** (required for location access on production)
- **GPS/Location enabled** on your device

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the App

### Quick Start - Development Server

```bash
npm start
```

The app will be available at `http://localhost:8000`

To open it automatically in your browser:
```bash
npm run dev
```

### Live Deployment

**Access the live app here:**
🌐 **https://mountainstogo.github.io/WhereAmI/**

Works on any device with a modern web browser!

### Install as Home Screen App

#### 📱 **iOS (iPhone/iPad)**
1. Open Safari and visit: https://mountainstogo.github.io/WhereAmI/
2. Tap the **Share** button (arrow pointing up)
3. Select **Add to Home Screen**
4. The app will appear with the compass icon 🧭
5. You can now launch it like a native app

#### 🤖 **Android**
1. Open Chrome and visit: https://mountainstogo.github.io/WhereAmI/
2. Tap the **Menu** button (3 dots in top right)
3. Select **Install app** or **Add to Home Screen**
4. The app will appear with the compass icon 🧭
5. You can now launch it like a native app

### Access on Your Device (Local Network)

Once the local server is running:

**Same Network (Recommended):**
1. Find your computer's IP address:
   - Windows: `ipconfig` → look for IPv4 Address
   - Mac/Linux: `ifconfig` → look for inet
2. On your mobile device, visit: `http://<your-ip>:8000`

**Local Device Testing:**
- On mobile device connected to same WiFi
- On Android: Use `http://192.168.x.x:8000` (replace with your IP)
- On iOS: Same as Android

## File Structure

```
WhereAmI/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest for app installation
├── css/
│   └── style.css          # Styling and responsive design
├── js/
│   └── app.js             # Main application logic
├── icons/
│   ├── compass.svg        # Compass icon (192x192)
│   └── favicon.svg        # Favicon for browser tab
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## How It Works

### Geolocation API
The app uses the browser's native Geolocation API to:
1. Request user permission to access location
2. Retrieve GPS coordinates with high accuracy
3. Continuously monitor location changes
4. Calculate and display accuracy radius

### Map Display
- **Leaflet.js**: Open-source mapping library
- **OpenStreetMap**: Free tile layer for the map
- Blue marker: Your current location
- Blue circle: Accuracy radius (±meters)

### Permissions

**First Visit:**
- Browser will prompt: "Allow GPS Location Finder to access your location?"
- Select "Allow" or "Allow While Using App"

**Permission Issues:**
- **iOS**: Settings > [App Name] > Location > Enable "While Using"
- **Android**: Settings > Apps > [App Name] > Permissions > Location > Enable

## Usage Guide

### Get Your Location
1. Open the app in your browser
2. Grant location permission when prompted
3. Wait for location detection to complete
4. Your coordinates will display on the map and info panel

### View Location Details
- **Latitude/Longitude**: GPS coordinates (6 decimal places)
- **Accuracy**: GPS accuracy in meters
- **Altitude**: Height above sea level (if available)
- **Heading**: Direction you're facing (if available)
- **Speed**: Your current movement speed in km/h (if moving)
- **Last Updated**: Time of last location refresh

### Copy Coordinates
1. Click "📋 Copy Coordinates" button
2. Coordinates are copied in `lat, lng` format
3. Paste anywhere: messaging apps, notes, etc.

### Share Location
1. Click "🔗 Share Location" button
2. On supported devices: native share menu appears
3. Share via Messages, Email, Messenger, etc.
4. Fallback: Google Maps link is copied to clipboard

### Refresh Location
1. Click the refresh button (🔄) in the header
2. App will request fresh GPS coordinates
3. Map and info panel update automatically

### Continuous Tracking
- App automatically watches for location changes
- Updates every few seconds when location changes
- Useful for navigation and tracking movement

## Technical Details

### Browser Compatibility

| Browser | Android | iOS | Desktop |
|---------|---------|-----|---------|
| Chrome | ✅ Full | N/A | ✅ Full |
| Safari | N/A | ✅ Full | ✅ Full |
| Firefox | ✅ Full | ✅ Full | ✅ Full |
| Edge | ✅ Full | N/A | ✅ Full |

### API Endpoints Used
- **Geolocation API**: Built-in browser API
- **OpenStreetMap Tiles**: CDN-hosted map tiles
- **Leaflet.js**: CDN-hosted mapping library

### Security & Privacy
- ✅ Location data stays on your device
- ✅ No data sent to external servers (except map tiles)
- ✅ HTTPS enforced in production
- ✅ User must grant permission explicitly
- ✅ Works offline for basic functionality

## Troubleshooting

### "Geolocation not supported"
- Use a modern browser (Chrome, Safari, Firefox)
- Ensure browser supports Geolocation API
- Try a different browser

### "Location permission denied"
- **iOS**: Settings > Privacy > Location Services > [App] > While Using
- **Android**: Settings > Apps > Permissions > Location > Allow
- Try incognito/private browsing mode first

### "Location information unavailable"
- Ensure GPS is enabled on your device
- Move to an open area (away from buildings)
- Wait a few seconds for GPS lock
- Disable Location Services and re-enable it

### "Location request timed out"
- Check if GPS is working (open Maps app)
- Try again in an area with better signal
- Restart your browser
- Check your internet connection

### Map not showing
- Check your internet connection
- Clear browser cache
- Try a different browser
- Ensure JavaScript is enabled

### Accuracy shown as very high (1000+ meters)
- This is normal in poor GPS conditions
- Move to an open area with clear sky view
- Indoor locations have lower accuracy
- Wait longer for GPS to improve accuracy

## Deployment

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to GitHub Pages
```bash
# Ensure HTTPS is used
# Push to main branch
# Enable Pages in repo settings
```

## Performance Tips

- Close unnecessary browser tabs
- Ensure good GPS signal (outdoor location)
- Disable power-saving mode for better GPS
- Use 5GHz WiFi for better connectivity
- Clear browser cache if map loads slowly

## Advanced Features

You can extend this app with:
- ✅ Location history/trail visualization
- ✅ Distance calculation to a point
- ✅ Route/waypoint tracking
- ✅ Offline mode with service workers
- ✅ Dark mode toggle
- ✅ Multiple map styles
- ✅ Location bookmarking
- ✅ Geofencing alerts

## Progressive Web App (PWA)

WhereAmI is a Progressive Web App, which means:

### ✨ PWA Features
- ✅ **Installable** - Add to home screen on iOS and Android
- ✅ **App-like** - Runs in standalone mode without browser UI
- ✅ **Fast** - Instant loading and smooth performance
- ✅ **Responsive** - Optimized for all device sizes
- ✅ **Secure** - HTTPS only (served via GitHub Pages)
- ✅ **Branded** - Custom compass icon and app name

### 🧭 Compass Icon
The beautiful compass icon features:
- Blue gradient background (#007AFF to #5AC8FA)
- Cardinal directions (N, E, S, W)
- Red north-pointing needle
- Perfect for GPS/navigation app

### 📋 Manifest File
The `manifest.json` file configures:
- App name and short name
- Display mode (standalone = no browser chrome)
- Theme color (#007AFF blue)
- Icon sizes and purposes
- App categories and shortcuts

### 🔧 Installation Requirements
- Modern web browser (Chrome, Safari, Firefox, Edge)
- HTTPS connection (required for PWA)
- Location permission grant

## Technologies Used

- **Leaflet.js** v1.9.4 - Interactive mapping
- **OpenStreetMap** - Map tiles
- **Vanilla JavaScript** - Core application
- **HTML5 & CSS3** - UI and styling
- **Geolocation API** - GPS access
- **PWA Manifest** - Web app configuration
- **SVG Icons** - Scalable vector graphics
- **GitHub Pages** - HTTPS hosting

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check browser console for errors (F12 > Console)
2. Verify location permissions are enabled
3. Test on different browsers
4. Check device GPS is working
5. Ensure good internet connection

---

**Happy exploring!** 🗺️📍

