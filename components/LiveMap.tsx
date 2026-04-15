'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components with no SSR to avoid window reference errors
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

import type { Location } from '@/lib/types';

interface LiveMapProps {
  deliveryId: string;
  initialLocation: Location;
  pickupLocation?: Location;
  dropoffLocation?: Location;
  onLocationUpdate?: (location: Location) => void;
}

// Custom driver icon as SVG
const driverIconHtml = `
  <div style="
    background: #3B82F6;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <span style="font-size: 16px;">🚚</span>
  </div>
`;

const createDriverIcon = () => {
  if (typeof window === 'undefined') return undefined;
  
  // We'll use a workaround with divIcon
  return null;
};

export default function LiveMap({ 
  deliveryId, 
  initialLocation,
  pickupLocation,
  dropoffLocation,
  onLocationUpdate
}: LiveMapProps) {
  const [currentLocation, setCurrentLocation] = useState<Location>(initialLocation);
  const [route, setRoute] = useState<Location[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const routeLineRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Import Leaflet on client side only
    import('leaflet').then((leaflet) => {
      const L = leaflet.default || leaflet;
      setL(L);
      
      // Fix Leaflet's default icon issues - use type assertion to bypass TypeScript check
      const iconPrototype = L.Icon.Default.prototype as any;
      delete iconPrototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    });
  }, []);

  // Simulate real-time location updates
  useEffect(() => {
    if (!deliveryId) return;

    const interval = setInterval(() => {
      // Simulate small movements for demo purposes
      const newLocation: Location = {
        lat: currentLocation.lat + (Math.random() * 0.0005 - 0.00025),
        lng: currentLocation.lng + (Math.random() * 0.0005 - 0.00025),
        timestamp: new Date().toISOString()
      };

      setCurrentLocation(newLocation);
      setRoute(prev => [...prev.slice(-20), newLocation]); // Keep last 20 points

      if (onLocationUpdate) {
        onLocationUpdate(newLocation);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [deliveryId, currentLocation, onLocationUpdate]);

  if (!isClient) {
    return (
      <div className="bg-gray-200 rounded-lg flex items-center justify-center" style={{ height: '400px' }}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="tracking-map-container">
      <div 
        id={`map-${deliveryId}`} 
        style={{ height: '400px', width: '100%', borderRadius: '12px' }}
        className="overflow-hidden"
      >
        {L && (
          <MapContainer
            center={[currentLocation.lat, currentLocation.lng]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Pickup marker */}
            {pickupLocation && (
              <Marker position={[pickupLocation.lat, pickupLocation.lng]}>
                <Popup>
                  <div className="text-sm">
                    <strong>📍 Pickup Location</strong>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Dropoff marker */}
            {dropoffLocation && (
              <Marker position={[dropoffLocation.lat, dropoffLocation.lng]}>
                <Popup>
                  <div className="text-sm">
                    <strong>🏁 Delivery Location</strong>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Driver marker */}
            <Marker position={[currentLocation.lat, currentLocation.lng]}>
              <Popup>
                <div className="text-sm">
                  <strong>🚚 Driver Location</strong>
                  <br />
                  <span className="text-xs">
                    Last updated: {new Date(currentLocation.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </Popup>
            </Marker>

            {/* Route polyline */}
            {route.length > 1 && (
              <Polyline
                positions={route.map(loc => [loc.lat, loc.lng] as [number, number])}
                pathOptions={{
                  color: '#3B82F6',
                  weight: 4,
                  opacity: 0.7,
                  dashArray: '10, 10'
                }}
              />
            )}
          </MapContainer>
        )}
      </div>
      
      {/* Location info */}
      <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-gray-700 dark:text-gray-300">Live Tracking</span>
          </div>
          <div className="text-gray-500">
            📍 {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
          </div>
          <div className="text-gray-500 text-xs">
            Updated: {new Date(currentLocation.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
