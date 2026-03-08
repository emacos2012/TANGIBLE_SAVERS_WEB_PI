import { NextRequest, NextResponse } from 'next/server';

// In-memory store for demo (would be a database in production)
const deliveryStore: Map<string, any> = new Map();

// Initialize with some mock data
const initializeMockData = () => {
  const mockDeliveries = [
    {
      id: 'delivery_1',
      orderId: 'ORD-001',
      userId: 'user_1',
      type: 'shopping',
      status: 'on_the_way',
      estimatedDelivery: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
      driver: {
        id: 'driver_1',
        name: 'John Driver',
        phone: '+1234567890',
        vehicle: 'Toyota Camry',
        plate: 'ABC-123',
        rating: 4.8
      },
      currentLocation: {
        lat: 40.7128,
        lng: -74.0060,
        timestamp: new Date().toISOString()
      },
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
      trackingEvents: [
        {
          id: '1',
          status: 'ordered',
          title: 'Order Placed',
          description: 'Your order has been received',
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
          description: 'Your items are being prepared',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          completed: true
        },
        {
          id: '4',
          status: 'dispatched',
          title: 'Driver Assigned',
          description: 'Driver has picked up your order',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          completed: true
        },
        {
          id: '5',
          status: 'on_the_way',
          title: 'On the Way',
          description: 'Driver is on the way to you',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          completed: false
        },
        {
          id: '6',
          status: 'arriving',
          title: 'Arriving Soon',
          description: 'Driver is approaching your location',
          timestamp: new Date().toISOString(),
          completed: false
        },
        {
          id: '7',
          status: 'delivered',
          title: 'Delivered',
          description: 'Order has been delivered',
          timestamp: new Date().toISOString(),
          completed: false
        }
      ],
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
      updatedAt: new Date()
    }
  ];

  mockDeliveries.forEach(d => deliveryStore.set(d.id, d));
};

// Initialize mock data
initializeMockData();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if delivery exists in store
    if (deliveryStore.has(id)) {
      return NextResponse.json({
        success: true,
        data: deliveryStore.get(id)
      });
    }

    // If not found, return a new mock delivery for demo
    const mockDelivery = {
      id,
      orderId: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userId: 'user_1',
      type: 'shopping',
      status: 'on_the_way',
      estimatedDelivery: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
      driver: {
        id: `driver_${Math.random().toString(36).substr(2, 9)}`,
        name: 'John Driver',
        phone: '+1234567890',
        vehicle: 'Toyota Camry',
        plate: 'ABC-123',
        rating: 4.8
      },
      currentLocation: {
        lat: 40.7128 + (Math.random() * 0.01 - 0.005),
        lng: -74.0060 + (Math.random() * 0.01 - 0.005),
        timestamp: new Date().toISOString()
      },
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
      trackingEvents: [
        {
          id: '1',
          status: 'ordered',
          title: 'Order Placed',
          description: 'Your order has been received',
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
          description: 'Your items are being prepared',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          completed: true
        },
        {
          id: '4',
          status: 'dispatched',
          title: 'Driver Assigned',
          description: 'Driver has picked up your order',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          completed: true
        },
        {
          id: '5',
          status: 'on_the_way',
          title: 'On the Way',
          description: 'Driver is on the way to you',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          completed: false
        },
        {
          id: '6',
          status: 'arriving',
          title: 'Arriving Soon',
          description: 'Driver is approaching your location',
          timestamp: new Date().toISOString(),
          completed: false
        },
        {
          id: '7',
          status: 'delivered',
          title: 'Delivered',
          description: 'Order has been delivered',
          timestamp: new Date().toISOString(),
          completed: false
        }
      ],
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
      updatedAt: new Date()
    };

    return NextResponse.json({
      success: true,
      data: mockDelivery
    });
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracking data' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { latitude, longitude, status } = body;

    // Get existing delivery or create new one
    let delivery = deliveryStore.get(id);
    
    if (!delivery) {
      delivery = {
        id,
        orderId: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        userId: 'user_1',
        type: 'shopping',
        status: 'pending',
        currentLocation: {
          lat: latitude || 40.7128,
          lng: longitude || -74.0060,
          timestamp: new Date().toISOString()
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }

    // Update location if provided
    if (latitude !== undefined && longitude !== undefined) {
      delivery.currentLocation = {
        lat: latitude,
        lng: longitude,
        timestamp: new Date().toISOString()
      };
    }

    // Update status if provided
    if (status) {
      delivery.status = status;
    }

    delivery.updatedAt = new Date();

    // Store updated delivery
    deliveryStore.set(id, delivery);

    return NextResponse.json({
      success: true,
      message: 'Delivery updated successfully',
      data: delivery
    });
  } catch (error) {
    console.error('Error updating delivery:', error);
    return NextResponse.json(
      { error: 'Failed to update delivery' },
      { status: 500 }
    );
  }
}
