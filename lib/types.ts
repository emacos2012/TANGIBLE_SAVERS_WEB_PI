// User Types
export type UserRole = 'user' | 'admin';

export interface User {
  uid: string;
  email: string;
  username: string;
  piUid?: string;
  role?: UserRole;
  estateLocation?: string;
  savedAssets?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Estate Types
export interface Estate {
  id: string;
  name: string;
  location: string;
  description: string;
  monthlyDues: number;
  currency: string; // "Pi"
  totalUnits: number;
  occupiedUnits: number;
  amenities: string[];
  image?: string;
}

export interface Property {
  id: string;
  estateId: string;
  userId: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  size: number; // in sqft
  rentalPrice: number;
  salePrice: number;
  status: 'rent' | 'sale' | 'occupied';
  image?: string;
}

// Shopping Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in Pi
  category: 'groceries' | 'electronics' | 'home_goods';
  image?: string;
  stock: number;
  sellerId: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  currency: string; // "Pi"
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Logistics Types
export interface DeliveryTask {
  id: string;
  orderId: string;
  userId: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: 'pending' | 'in_transit' | 'delivered';
  driverId?: string;
  estimatedDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoverRequest {
  id: string;
  userId: string;
  fromAddress: string;
  toAddress: string;
  movingDate: Date;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  moverId?: string;
  quote?: number;
  createdAt: Date;
}

// Payment Types
export interface PiPayment {
  id: string;
  userId: string;
  amount: number;
  orderId?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  piTransactionId?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Authentication Context
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginWithPi: () => Promise<void>;
  loginWithAdmin: (apiKey: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Wallet Types
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

// Savings Types
export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  createdAt: Date;
}

export interface SavingsPlan {
  id: string;
  userId: string;
  name: string;
  monthlyContribution: number;
  interestRate: number;
  duration: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

// Investment Types
export interface Investment {
  id: string;
  userId: string;
  name: string;
  type: 'stocks' | 'bonds' | 'crypto' | 'real_estate';
  amount: number;
  expectedReturn: number;
  currentValue: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'sold';
  purchasedAt: Date;
}

// Chatbot Types
export interface ChatbotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: ChatbotMessage[];
}

// Delivery Tracking Types
export interface Location {
  lat: number;
  lng: number;
  timestamp: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  rating: number;
  photoUrl?: string;
}

export interface TrackingEvent {
  id: string;
  status: 'ordered' | 'confirmed' | 'preparing' | 'dispatched' | 'on_the_way' | 'arriving' | 'delivered';
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface DeliveryTracking {
  id: string;
  orderId: string;
  userId: string;
  type: 'food' | 'shopping' | 'logistics' | 'transport';
  status: 'pending' | 'confirmed' | 'preparing' | 'dispatched' | 'on_the_way' | 'arriving' | 'delivered';
  estimatedDelivery: string;
  driver?: Driver;
  currentLocation: Location;
  pickup: {
    address: string;
    lat?: number;
    lng?: number;
    time: string;
  };
  dropoff: {
    address: string;
    lat?: number;
    lng?: number;
    estimatedTime: string;
  };
  trackingEvents: TrackingEvent[];
  createdAt: Date;
  updatedAt: Date;
}

