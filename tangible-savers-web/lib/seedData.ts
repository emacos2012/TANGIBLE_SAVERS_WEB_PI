// Seed Data Script for Tangibl Savers Firestore
// Run this script to populate your Firestore with sample data
// import { db } from '@/lib/firebase';
// import { collection, addDoc } from 'firebase/firestore';

export const seedEstates = async () => {
  const estates = [
    {
      name: 'Downtown Premium Estate',
      location: 'Downtown, Dar es Salaam',
      description: 'Modern estate with excellent amenities in the heart of the city',
      monthlyDues: 250,
      currency: 'Pi',
      totalUnits: 500,
      occupiedUnits: 350,
      amenities: ['Security', 'Gym', 'Swimming Pool', 'Community Center', 'Playground'],
    },
    {
      name: 'Upanga Green Heights',
      location: 'Upanga, Dar es Salaam',
      description: 'Eco-friendly residential area with green spaces',
      monthlyDues: 180,
      currency: 'Pi',
      totalUnits: 300,
      occupiedUnits: 240,
      amenities: ['Security', 'Parks', 'Walking Trails', 'Community Garden'],
    },
    {
      name: 'Oyster Bay Luxury',
      location: 'Oyster Bay, Dar es Salaam',
      description: 'Premium residential complex with waterfront access',
      monthlyDues: 450,
      currency: 'Pi',
      totalUnits: 200,
      occupiedUnits: 150,
      amenities: ['24/7 Security', 'Private Beach', 'Golf Course', 'Fine Dining'],
    },
  ];

  // Uncomment to seed data
  // for (const estate of estates) {
  //   await addDoc(collection(db, 'estates'), estate);
  // }
};

export const seedProducts = async () => {
  const products = [
    // Groceries
    {
      name: 'Fresh Vegetables Bundle',
      description: 'Organic vegetables - tomatoes, carrots, lettuce',
      price: 15,
      category: 'groceries',
      stock: 100,
      sellerId: 'seller_001',
    },
    {
      name: 'Rice (10kg)',
      description: 'Premium quality white rice',
      price: 25,
      category: 'groceries',
      stock: 50,
      sellerId: 'seller_002',
    },
    {
      name: 'Cooking Oil (5L)',
      description: 'Pure vegetable cooking oil',
      price: 18,
      category: 'groceries',
      stock: 75,
      sellerId: 'seller_003',
    },
    // Electronics
    {
      name: 'Wireless Headphones',
      description: 'Bluetooth headphones with noise cancellation',
      price: 120,
      category: 'electronics',
      stock: 30,
      sellerId: 'seller_004',
    },
    {
      name: 'Phone Charger',
      description: 'Universal USB-C fast charger',
      price: 25,
      category: 'electronics',
      stock: 200,
      sellerId: 'seller_005',
    },
    {
      name: 'LED Light Bulbs (Pack of 4)',
      description: 'Energy-efficient LED bulbs',
      price: 30,
      category: 'electronics',
      stock: 80,
      sellerId: 'seller_006',
    },
    // Home Goods
    {
      name: 'Bed Sheets Set',
      description: 'Cotton bed sheets - Queen size',
      price: 45,
      category: 'home_goods',
      stock: 40,
      sellerId: 'seller_007',
    },
    {
      name: 'Kitchen Knife Set',
      description: 'Professional 6-piece knife set',
      price: 65,
      category: 'home_goods',
      stock: 25,
      sellerId: 'seller_008',
    },
    {
      name: 'Cushion Pillows (Pack of 2)',
      description: 'Comfortable decorative pillows',
      price: 35,
      category: 'home_goods',
      stock: 60,
      sellerId: 'seller_009',
    },
  ];

  // Uncomment to seed data
  // for (const product of products) {
  //   await addDoc(collection(db, 'products'), product);
  // }
};

// Run these functions after importing and initializing Firebase
// seedEstates();
// seedProducts();
