"use client";

import Script from "next/script";

const PiScriptLoader: React.FC = () => {
  return (
    <Script
      src="https://sdk.minepi.com/pi-sdk.js"
      strategy="afterInteractive"
      onReady={() => {
        (window as unknown as { __PI_SDK_READY__?: boolean }).__PI_SDK_READY__ = true;
      }}
    />
  );
};

export default PiScriptLoader;
