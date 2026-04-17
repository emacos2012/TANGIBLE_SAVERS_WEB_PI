import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true, // Required for static export / Firebase Hosting
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    // Expose Firebase env vars to client-side (prefixed with NEXT_PUBLIC_)
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
  },

  // Move typedRoutes out of experimental
  typedRoutes: true,

  // Tell Turbopack we acknowledge it and to work with our path alias
  turbopack: {
    resolveAlias: {
      '@': './',
    },
  },

  // TrailingSlash disabled for cleaner URLs
  trailingSlash: false,
};

export default nextConfig;