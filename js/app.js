// GPS Location App - Main Application File

class GPSLocationApp {
    constructor() {
        this.map = null;
        this.marker = null;
        this.currentLocation = null;
        this.watchId = null;
        this.init();
    }

    async init() {
        // Initialize map
        this.initializeMap();
        
        // Get initial location
        await this.getLocation();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Request continuous location updates
        this.watchLocation();
    }

    initializeMap() {
        // Default to world view
        this.map = L.map('map').setView([20, 0], 2);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(this.map);
    }

    setupEventListeners() {
        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.getLocation();
        });

        // Retry button
        document.getElementById('retryBtn').addEventListener('click', () => {
            this.getLocation();
        });

        // Copy coordinates button
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyCoordinates();
        });

        // Share location button
        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareLocation();
        });
    }

    async getLocation() {
        this.showLoading();

        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => this.handleLocationSuccess(position),
            (error) => this.handleLocationError(error),
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }

    handleLocationSuccess(position) {
        const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
        const timestamp = position.timestamp;

        this.currentLocation = {
            latitude,
            longitude,
            accuracy,
            altitude,
            heading,
            speed,
            timestamp
        };

        // Update UI
        this.updateLocationInfo();
        
        // Update map
        this.updateMap();
        
        // Hide loading and error states
        this.hideLoading();
        this.hideError();
    }

    handleLocationError(error) {
        let errorMessage = 'Unable to retrieve location';

        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information is unavailable. Please try again.';
                break;
            case error.TIMEOUT:
                errorMessage = 'Location request timed out. Please try again.';
                break;
        }

        this.showError(errorMessage);
    }

    updateLocationInfo() {
        if (!this.currentLocation) return;

        const { latitude, longitude, accuracy, altitude, heading, speed, timestamp } = this.currentLocation;

        // Update text fields
        document.getElementById('latitude').textContent = latitude.toFixed(6);
        document.getElementById('longitude').textContent = longitude.toFixed(6);
        document.getElementById('accuracy').textContent = accuracy ? `${accuracy.toFixed(2)} m` : 'N/A';
        document.getElementById('altitude').textContent = altitude ? `${altitude.toFixed(2)} m` : 'N/A';
        document.getElementById('speed').textContent = speed ? `${(speed * 3.6).toFixed(2)} km/h` : 'N/A';
        document.getElementById('heading').textContent = heading ? `${heading.toFixed(2)}°` : 'N/A';
        
        // Format and display timestamp
        const date = new Date(timestamp);
        const timeString = date.toLocaleTimeString();
        const dateString = date.toLocaleDateString();
        document.getElementById('timestamp').textContent = `${dateString} ${timeString}`;

        // Show location info panel
        document.getElementById('locationInfo').style.display = 'flex';
    }

    updateMap() {
        if (!this.currentLocation) return;

        const { latitude, longitude, accuracy } = this.currentLocation;
        const latlng = [latitude, longitude];

        // Remove old marker and circle if they exist
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
        if (this.circle) {
            this.map.removeLayer(this.circle);
        }

        // Add new marker
        this.marker = L.marker(latlng, {
            icon: L.icon({
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMiIgZmlsbD0iIzAwN0FGRiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        }).addTo(this.map);

        // Add accuracy circle
        this.circle = L.circle(latlng, {
            radius: accuracy || 100,
            color: '#007AFF',
            fillColor: '#5AC8FA',
            fillOpacity: 0.2,
            weight: 2,
            dashArray: '5, 5'
        }).addTo(this.map);

        // Add popup
        this.marker.bindPopup(`
            <strong>Your Location</strong><br>
            Lat: ${latitude.toFixed(6)}<br>
            Lng: ${longitude.toFixed(6)}<br>
            Accuracy: ${accuracy ? accuracy.toFixed(2) + ' m' : 'N/A'}
        `).openPopup();

        // Center map on location
        this.map.setView(latlng, 16);
    }

    copyCoordinates() {
        if (!this.currentLocation) return;

        const { latitude, longitude } = this.currentLocation;
        const text = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Coordinates copied!');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.showNotification('Coordinates copied!');
    }

    shareLocation() {
        if (!this.currentLocation) return;

        const { latitude, longitude } = this.currentLocation;
        const text = `Check out my location: https://maps.google.com/?q=${latitude},${longitude}`;
        const url = `https://maps.google.com/?q=${latitude},${longitude}`;

        if (navigator.share) {
            navigator.share({
                title: 'My Location',
                text: 'Check out my location!',
                url: url
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    this.showNotification('Share link copied!');
                }).catch(() => {
                    this.fallbackCopyToClipboard(text);
                });
            }
        }
    }

    watchLocation() {
        if (!navigator.geolocation) return;

        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handleLocationSuccess(position),
            (error) => {
                // Continue watching even if there's an error
                console.error('Watch position error:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 5000
            }
        );
    }

    showLoading() {
        document.getElementById('loading').style.display = 'flex';
        document.getElementById('error').style.display = 'none';
        document.getElementById('locationInfo').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('error').style.display = 'block';
        document.getElementById('locationInfo').style.display = 'none';
    }

    hideError() {
        document.getElementById('error').style.display = 'none';
    }

    showNotification(message) {
        // Simple notification feedback (you can enhance this)
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ ' + message;
        btn.style.background = '#34C759';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }

    destroy() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GPSLocationApp();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.app) {
        window.app.destroy();
    }
});
