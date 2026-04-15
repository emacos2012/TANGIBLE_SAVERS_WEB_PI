'use client';

import Link from 'next/link';

interface Deal {
  id: number;
  provider: string;
  title: string;
  discount: string;
  description: string;
  code: string;
}

const transportationDeals: Deal[] = [
  {
    id: 1,
    provider: 'Ride Share Co.',
    title: '20% Off Rides',
    discount: '20% OFF',
    description: 'First 5 rides with code SAVE20',
    code: 'SAVE20'
  },
  {
    id: 2,
    provider: 'Fuel Station',
    title: 'Gas Discount Card',
    discount: '$0.50/gal',
    description: 'Member discount on all fuel purchases',
    code: 'FUEL50'
  },
  {
    id: 3,
    provider: 'Car Rental Plus',
    title: 'Weekend Rental',
    discount: '30% OFF',
    description: 'Weekend car rental discounts',
    code: 'WEEKEND30'
  },
  {
    id: 4,
    provider: 'Transit Pass',
    title: 'Monthly Pass Deal',
    discount: '25% OFF',
    description: 'Public transportation monthly pass',
    code: 'TRANSIT25'
  },
  {
    id: 5,
    provider: 'Parking Plus',
    title: 'Parking Deals',
    discount: '40% OFF',
    description: 'Monthly parking pass savings',
    code: 'PARK40'
  },
  {
    id: 6,
    provider: 'Auto Services',
    title: 'Oil Change Special',
    discount: 'BUY 1 GET 1',
    description: 'Oil change coupon package',
    code: 'OIL2FOR1'
  }
];

export default function Transportation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
            💚 Tangible Savers
          </Link>
          <span className="text-gray-600 dark:text-gray-400">/</span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">🚗 Transportation</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Transportation Deals</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Save on rides, fuel, rentals, parking, and automotive services
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
          {transportationDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
            >
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-white">
                <div className="text-3xl font-bold mb-2">{deal.discount}</div>
                <div className="font-semibold">{deal.title}</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{deal.provider}</h3>
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
      <section className="bg-green-600 dark:bg-green-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-4">
            Save on Your Commute Today!
          </h2>
          <p className="text-green-100 dark:text-green-200 mb-6">
            Browse more categories and find deals that match your lifestyle
          </p>
          <Link href="/">
            <button className="bg-white text-green-600 hover:bg-gray-100 font-bold px-6 py-3 rounded transition">
              Explore More Deals
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
