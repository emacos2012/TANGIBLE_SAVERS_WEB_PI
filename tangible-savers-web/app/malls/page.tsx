'use client';

import Link from 'next/link';

interface Deal {
  id: number;
  mall: string;
  title: string;
  discount: string;
  description: string;
  code: string;
}

const mallDeals: Deal[] = [
  {
    id: 1,
    mall: 'Downtown Mall',
    title: 'Weekend Special',
    discount: '30% OFF',
    description: 'All participating stores weekend promotion',
    code: 'DT30'
  },
  {
    id: 2,
    mall: 'Riverside Plaza',
    title: 'Grand Opening Sale',
    discount: '40% OFF',
    description: 'New stores opening - special discounts',
    code: 'GRAND40'
  },
  {
    id: 3,
    mall: 'Central Station',
    title: 'Loyalty Rewards',
    discount: 'EXTRA 15%',
    description: 'Members get additional 15% discount',
    code: 'LOYAL15'
  },
  {
    id: 4,
    mall: 'Sunset Pavilion',
    title: 'Family Day Deal',
    discount: '25% OFF',
    description: 'Family day promotion on selected stores',
    code: 'FAMILY25'
  },
  {
    id: 5,
    mall: 'Star Center',
    title: 'Movie & Shop',
    discount: 'FREE MOVIE',
    description: 'Spend $50, get free movie ticket',
    code: 'MOVIEFREE'
  },
  {
    id: 6,
    mall: 'Infinity Plaza',
    title: 'Midnight Sale',
    discount: '50% OFF',
    description: 'Exclusive midnight sale event',
    code: 'MIDNIGHT50'
  }
];

export default function Malls() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
            💚 Tangible Savers
          </Link>
          <span className="text-gray-600 dark:text-gray-400">/</span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">🏬 Malls</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mall Deals & Events</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Find the best promotions and special events happening at your favorite malls
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
          {mallDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
            >
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 text-white">
                <div className="text-3xl font-bold mb-2">{deal.discount}</div>
                <div className="font-semibold">{deal.title}</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{deal.mall}</h3>
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
      <section className="bg-purple-600 dark:bg-purple-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-4">
            Plan Your Mall Visit Smart!
          </h2>
          <p className="text-purple-100 dark:text-purple-200 mb-6">
            Check upcoming mall events and maximize your savings
          </p>
          <Link href="/">
            <button className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-6 py-3 rounded transition">
              Explore More Deals
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
