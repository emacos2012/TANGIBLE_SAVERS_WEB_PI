import axios from 'axios';
import { DeliveryTracking, Location, TrackingEvent, Driver } from './types';

const API_BASE_URL = '/api/track';

// Generate mock tracking events based on status
export const generateTrackingEvents = (status: string): TrackingEvent[] => {
  const allEvents: TrackingEvent[] = [
    {
      id: '1',
      status: 'ordered',
      title: 'Order Placed',
      description: 'Your order has been received and confirmed',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      completed: true
    },
    {
      id: '2',
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'The seller has confirmed your order',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      completed: true
    },
    {
      id: '3',
      status: 'preparing',
      title: 'Preparing Order',
      description: 'Your items are being prepared for pickup',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      completed: true
    },
    {
      id: '4',
      status: 'dispatched',
      title: 'Driver Assigned',
      description: 'A driver has been assigned to pick up your order',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      completed: status !== 'ordered' && status !== 'confirmed' && status !== 'preparing'
    },
    {
      id: '5',
      status: 'on_the_way',
      title: 'On the Way',
      description: 'Driver is on the way to your location',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      completed: status === 'on_the_way' || status === 'arriving' || status === 'delivered'
    },
    {
      id: '6',
      status: 'arriving',
      title: 'Arriving Soon',
      description: 'Driver is approaching your location',
      timestamp: new Date().toISOString(),
      completed: status === 'arriving' || status === 'delivered'
    },
    {
      id: '7',
      status: 'delivered',
      title: 'Delivered',
      description: 'Your order has been delivered successfully',
      timestamp: new Date().toISOString(),
      completed: status === 'delivered'
    }
  ];

  const statusOrder = ['ordered', 'confirmed', 'preparing', 'dispatched', 'on_the_way', 'arriving', 'delivered'];
  const currentIndex = statusOrder.indexOf(status);

  return allEvents.map(event => ({
    ...event,
    completed: statusOrder.indexOf(event.status) <= currentIndex
  }));
};

// Generate mock driver
export const generateMockDriver = (): Driver => {
  const drivers = [
    { name: 'John Driver', vehicle: 'Toyota Camry', plate: 'ABC-123' },
    { name: 'Sarah Smith', vehicle: 'Honda Civic', plate: 'XYZ-789' },
    { name: 'Mike Johnson', vehicle: 'Ford Focus', plate: 'DEF-456' },
    { name: 'Emily Brown', vehicle: 'Nissan Altima', plate: 'GHI-012' },
  ];
  
  const selected = drivers[Math.floor(Math.random() * drivers.length)];
  
  return {
    id: `driver_${Math.random().toString(36).substr(2, 9)}`,
    name: selected.name,
    phone: '+1234567890',
    vehicle: selected.vehicle,
    plate: selected.plate,
    rating: 4.5 + Math.random() * 0.5
  };
};

// Generate mock location
export const generateMockLocation = (baseLat = 40.7128, baseLng = -74.0060): Location => {
  return {
    lat: baseLat + (Math.random() * 0.02 - 0.01),
    lng: baseLng + (Math.random() * 0.02 - 0.01),
    timestamp: new Date().toISOString()
  };
};

// Fetch delivery tracking data
export const fetchDeliveryTracking = async (deliveryId: string): Promise<DeliveryTracking> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${deliveryId}`);
    return response.data.data;
  } catch (error) {
    // Return mock data if API fails
    console.log('Using mock delivery data');
    
    const status = 'on_the_way';
    const driver = generateMockDriver();
    const currentLocation = generateMockLocation();
    
    return {
      id: deliveryId,
      orderId: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userId: 'user_1',
      type: 'shopping',
      status,
      estimatedDelivery: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
      driver,
      currentLocation,
      pickup: {
        address: '123 Mall Street, Shopping District',
        lat: 40.7128,
        lng: -74.0060,
        time: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      dropoff: {
        address: '456 Home Avenue, Your City',
        lat: 40.7580,
        lng: -73.9855,
        estimatedTime: new Date(Date.now() + 20 * 60 * 1000).toISOString()
      },
      trackingEvents: generateTrackingEvents(status),
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
      updatedAt: new Date()
    };
  }
};

// Update delivery location
export const updateDeliveryLocation = async (
  deliveryId: string, 
  location: Location
): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/${deliveryId}`, {
      latitude: location.lat,
      longitude: location.lng
    });
  } catch (error) {
    console.error('Failed to update location:', error);
  }
};

// Calculate ETA based on distance
export const calculateETA = (
  currentLocation: Location,
  dropoffLat: number,
  dropoffLng: number,
  avgSpeedKmh: number = 40
): string => {
  // Simple distance calculation (Haversine formula would be more accurate)
  const latDiff = Math.abs(currentLocation.lat - dropoffLat);
  const lngDiff = Math.abs(currentLocation.lng - dropoffLng);
  const distanceKm = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // Rough conversion
  
  const timeHours = distanceKm / avgSpeedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  
  if (timeMinutes < 1) return 'Less than a minute';
  if (timeMinutes === 1) return '1 minute';
  if (timeMinutes < 60) return `${timeMinutes} minutes`;
  
  const hours = Math.floor(timeMinutes / 60);
  const mins = timeMinutes % 60;
  return `${hours}h ${mins}m`;
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

