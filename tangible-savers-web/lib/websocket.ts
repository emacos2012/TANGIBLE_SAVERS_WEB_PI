import { Location } from './types';

type WebSocketCallback = (data: any) => void;

interface WebSocketMessage {
  type: 'location_update' | 'status_update' | 'error';
  deliveryId: string;
  [key: string]: any;
}

class DeliveryWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private callbacks: Map<string, WebSocketCallback[]> = new Map();
  private deliveryId: string | null = null;
  private isConnecting = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Will be initialized when connecting
    }
  }

  // Connect to WebSocket server
  connect(deliveryId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.joinDeliveryRoom(deliveryId);
        resolve();
        return;
      }

      if (this.isConnecting) {
        // Wait for existing connection to complete
        const checkConnection = setInterval(() => {
          if (this.ws?.readyState === WebSocket.OPEN) {
            clearInterval(checkConnection);
            this.joinDeliveryRoom(deliveryId);
            resolve();
          }
        }, 100);
        return;
      }

      this.isConnecting = true;
      this.deliveryId = deliveryId;

      try {
        // For demo purposes, we'll simulate WebSocket with mock data
        // In production, replace with actual WebSocket URL
        // const wsUrl = `wss://your-api.com/ws/delivery/${deliveryId}`;
        
        // Simulating connection for demo
        console.log('WebSocket: Simulating connection for delivery:', deliveryId);
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        
        // Start simulating real-time updates
        this.startMockUpdates(deliveryId);
        
        resolve();
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  // Join a specific delivery room
  private joinDeliveryRoom(deliveryId: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'join',
        deliveryId
      }));
    }
  }

  // Subscribe to events
  on(event: string, callback: WebSocketCallback): void {
    const callbacks = this.callbacks.get(event) || [];
    callbacks.push(callback);
    this.callbacks.set(event, callbacks);
  }

  // Unsubscribe from events
  off(event: string, callback: WebSocketCallback): void {
    const callbacks = this.callbacks.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
      this.callbacks.set(event, callbacks);
    }
  }

  // Emit event to subscribers
  private emit(event: string, data: any): void {
    const callbacks = this.callbacks.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  // Send message to server
  send(message: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  // Update location
  sendLocationUpdate(deliveryId: string, location: Location): void {
    this.emit('location_update', {
      type: 'location_update',
      deliveryId,
      ...location
    });
  }

  // Disconnect
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.deliveryId = null;
    this.callbacks.clear();
  }

  // Reconnect with exponential backoff
  private reconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.emit('error', { message: 'Max reconnection attempts reached' });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    setTimeout(() => {
      if (this.deliveryId) {
        this.connect(this.deliveryId);
      }
    }, delay);
  }

  // Mock real-time updates for demo
  private startMockUpdates(deliveryId: string): void {
    let lat = 40.7128;
    let lng = -74.0060;

    const interval = setInterval(() => {
      // Simulate small movements
      lat += (Math.random() * 0.001 - 0.0005);
      lng += (Math.random() * 0.001 - 0.0005);

      const locationUpdate = {
        type: 'location_update',
        deliveryId,
        latitude: lat,
        longitude: lng,
        timestamp: new Date().toISOString()
      };

      this.emit('location_update', locationUpdate);
    }, 5000);

    // Store interval reference for cleanup (would need to be stored in class)
    // For now, we'll rely on component unmount to clean up
  }

  // Check if connected
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN || this.deliveryId !== null;
  }
}

// Singleton instance
let wsInstance: DeliveryWebSocket | null = null;

export const getDeliveryWebSocket = (): DeliveryWebSocket => {
  if (!wsInstance) {
    wsInstance = new DeliveryWebSocket();
  }
  return wsInstance;
};

export const createDeliveryWebSocket = (): DeliveryWebSocket => {
  return new DeliveryWebSocket();
};

export default DeliveryWebSocket;


