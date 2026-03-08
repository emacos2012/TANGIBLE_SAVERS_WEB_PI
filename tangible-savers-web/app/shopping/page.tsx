'use client';

import Link from 'next/link';

interface Deal {
  id: number;
  store: string;
  title: string;
  discount: string;
  description: string;
  code: string;
}

const shoppingDeals: Deal[] = [
  {
    id: 1,
    store: 'Fashion Hub',
    title: 'Clothing Clearance',
    discount: '50% OFF',
    description: 'All summer collection items on sale',
    code: 'SUMMER50'
  },
  {
    id: 2,
    store: 'Electronics Plus',
    title: 'Tech Electronics',
    discount: '25% OFF',
    description: 'Laptops, phones, and accessories',
    code: 'TECH25'
  },
  {
    id: 3,
    store: 'Shoes & More',
    title: 'Footwear Sale',
    discount: '40% OFF',
    description: 'Brand name shoes and sneakers',
    code: 'SHOES40'
  },
  {
    id: 4,
    store: 'Home Décor',
    title: 'Home Makeover',
    discount: '30% OFF',
    description: 'Furniture and home decoration items',
    code: 'HOME30'
  },
  {
    id: 5,
    store: 'Beauty Haven',
    title: 'Beauty Products',
    discount: 'BUY 2 GET 1',
    description: 'Cosmetics, skincare, and haircare',
    code: 'BEAUTY3'
  },
  {
    id: 6,
    store: 'Sports Gear',
    title: 'Athletic Wear',
    discount: '35% OFF',
    description: 'Sports equipment and activewear',
    code: 'SPORTS35'
  }
];

export default function Shopping() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
            💚 Tangible Savers
          </Link>
          <span className="text-gray-600 dark:text-gray-400">/</span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">🛍️ Shopping</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shopping Deals</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Discover amazing discounts on clothing, electronics, shoes, home goods, beauty, and sports
          </p>
          <Link href="/">
            <button className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded transition">
              ← Back to Home
            </button>
          </Link>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shoppingDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
            >
              <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-6 text-white">
                <div className="text-3xl font-bold mb-2">{deal.discount}</div>
                <div className="font-semibold">{deal.title}</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{deal.store}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{deal.description}</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Promo Code:</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">{deal.code}</p>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition mb-2">
                  Copy Code
                </button>
                <button className="w-full border-2 border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 font-medium py-2 rounded transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-pink-600 dark:bg-pink-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-4">
            Shop Smarter, Save More!
          </h2>
          <p className="text-pink-100 dark:text-pink-200 mb-6">
            Explore all shopping categories and get instant savings
          </p>
          <Link href="/">
            <button className="bg-white text-pink-600 hover:bg-gray-100 font-bold px-6 py-3 rounded transition">
              Explore More Deals
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
