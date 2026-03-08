"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

interface PiContextType {
  piUser: any;
  authenticate: () => Promise<any>;
  isLoaded: boolean;
  error: string | null;
}

const PiContext = createContext<PiContextType | null>(null);

export const PiProvider = ({ children }: { children: React.ReactNode }) => {
  const [piUser, setPiUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure Pi SDK is loaded via script tag in layout.tsx first
    if (typeof window === 'undefined') {
      return;
    }

    const initPi = () => {
      // Check for either the global flag or the Pi object
      if ((window as any).__PI_SDK_READY__ || (window as any).Pi) {
        try {
          (window as any).Pi.init({ version: "1.5", sandbox: true }); 
          setIsLoaded(true);
          setError(null);
        } catch (err) {
          console.error("Failed to initialize Pi SDK", err);
          setError("Failed to initialize Pi SDK");
        }
      } else {
        // Don't set error yet - just warn and retry
        console.warn('Pi SDK not loaded yet. Retrying...');
        // Retry after 1 second
        setTimeout(initPi, 1000);
      }
    };

    // Give the script a moment to load first
    const timeoutId = setTimeout(initPi, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const authenticate = async () => {
    if (!isLoaded) {
      throw new Error('Pi SDK not loaded. Ensure the script is in your HTML.');
    }

    try {
      const scopes = ['payments', 'username'];
      const auth = await (window as any).Pi.authenticate(scopes, onIncompletePaymentFound);
      setPiUser(auth.user);
      setError(null);
      return auth;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Pi Auth failed", err);
      setError(errorMessage);
      throw err;
    }
  };

  const onIncompletePaymentFound = (payment: any) => {
    // Handle logic for incomplete payments found on ledger
    console.log("Incomplete payment found:", payment);
  };

  return (
    <PiContext.Provider value={{ piUser, authenticate, isLoaded, error }}>
      {children}
    </PiContext.Provider>
  );
};

export const usePi = () => {
  const context = useContext(PiContext);
  if (!context) {
    throw new Error('usePi must be used within PiProvider');
  }
  return context;
};
