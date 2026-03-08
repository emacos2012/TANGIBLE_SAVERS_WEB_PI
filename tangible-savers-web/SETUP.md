# Tangible Savers - Pi Network E-Commerce Platform

A comprehensive web application built with Next.js for managing housing, shopping, logistics, and payments using the Pi Network cryptocurrency. Perfect for deployment on Raspberry Pi.

## Features

### 1. **Pi SDK Authentication**
- Secure login with Pi Network credentials
- Sync with Firebase Authentication
- User profile management with Estate Location and Saved Assets
- 3-way handshake payment security

### 2. **Housing & Estates Module**
- Grid-style dashboard with property management
- Pay monthly estate dues via Pi
- Link users to specific estate documents
- Property viewing and maintenance requests

### 3. **Shopping Mall Module**
- Categorized marketplace (Groceries, Electronics, Home Goods)
- Dynamic shopping cart system
- Automatic Pi price calculations
- Payment integration for checkout

### 4. **Logistics & Delivery Module**
- Order tracking (Pending → In Transit → Delivered)
- Automatic delivery task creation on payment
- Request Mover service for relocation
- Driver assignment and delivery status updates

### 5. **Payment Security**
- 3-way handshake:
  1. Mobile app initiates Pi Payment
  2. Node.js Backend approves via Pi Developer API
  3. Firebase Cloud Function releases goods on completion
- Firestore transaction logging

## Technology Stack

- **Frontend**: Next.js 16+ with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth + Pi SDK
- **Database**: Firestore
- **Payments**: Pi Network SDK
- **Deployment**: Static export for Raspberry Pi

## Color Palette

- **Housing**: Deep Navy (#1A237E)
- **Savers/Payments**: Gold (#FFD700)
- **Success**: Green (#4CAF50)
- **Error**: Red (#F44336)

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Firebase Project
- Pi Network Developer Account
- Raspberry Pi (for deployment)

### 1. Environment Variables

Create `.env.local`:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Pi Network Configuration
NEXT_PUBLIC_PI_API_KEY=your_pi_sdk_key
NEXT_PUBLIC_PI_WALLET_ADDRESS=your_wallet_address
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Install Dependencies

```bash
cd tangible-savers-web
npm install
```

### 3. Firebase Setup

1. Create a Firebase project on [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Anonymous Sign-in)
3. Create Firestore Database in production mode
4. Create the following collections:

**Collections Structure**:
- users/ - User profiles with Pi UID sync
- estates/ - Property listings and estate information
- products/ - Shopping mall products
- orders/ - User orders and purchases
- payments/ - Payment transaction logs
- deliveryTasks/ - Order delivery tracking
- moverRequests/ - Relocation service requests

### 4. Seed Data (Optional)

Use the provided seed data script to populate Firestore with sample estates and products.

### 5. Development Server

```bash
npm run dev
```

Access at `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
```

This generates a static `out/` directory ready for Raspberry Pi deployment.

## Deployment to Raspberry Pi

### Method 1: Using HTTP Server

```bash
# On your Raspberry Pi
sudo apt-get install npm
npm install -g http-server

# Copy the out/ folder to your Pi
scp -r out/ pi@raspberrypi:/home/pi/tangible-savers

# Start the server
cd /home/pi/tangible-savers/out
http-server -p 8080
```

### Method 2: Using Nginx

```bash
# Install Nginx on Pi
sudo apt-get install nginx

# Copy files to Nginx directory
sudo cp -r out/* /var/www/html/

# Start Nginx
sudo systemctl start nginx
```

### Method 3: Using PM2 + Node Server

```bash
npm install -g pm2

# Start with PM2
pm2 start server.js --name tangible-savers
```

## File Structure

```
tangible-savers-web/
├── app/
│   ├── page.tsx                 # Home page with login
│   ├── layout.tsx               # Root layout with providers
│   ├── globals.css              # Tailwind styles
│   ├── housing/                 # Housing & Estates module
│   ├── mall/                    # Shopping module
│   ├── logistics/               # Logistics & Delivery module
│   └── profile/                 # User profile management
├── lib/
│   ├── firebase.ts              # Firebase config
│   ├── types.ts                 # TypeScript types
│   ├── authContext.tsx          # Auth provider
│   ├── piAuth.ts                # Pi authentication logic
│   ├── piPayments.ts            # Payment logic
│   └── seedData.ts              # Firestore seed data
├── components/
│   └── BottomTabNavigation.tsx  # Bottom navigation bar
└── public/
```

## Key Features Implemented

✅ Pi Network SDK Integration
✅ Firebase Authentication & Firestore
✅ Housing & Estates Management
✅ Shopping Cart & Product Catalog
✅ Delivery Tracking System
✅ Mover Request Service
✅ Payment Processing (3-way handshake)
✅ User Profile Management
✅ Professional UI/UX with Navy & Gold theme
✅ Bottom Tab Navigation
✅ Dark Mode Support
✅ Responsive Design

## Security Considerations

1. Firebase Security Rules configured
2. Pi SDK payments use 3-way handshake
3. User data encrypted in Firestore
4. CORS enabled for backend APIs
5. Environment variables for sensitive data

## Support

For support and documentation, visit the official repository or contact the development team.

---

**Last Updated**: February 25, 2026
**Version**: 1.0.0
