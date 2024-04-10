"use client";

import { useEffect } from "react";

export const TrustPilotSection = () => {
  useEffect(() => {
    const trustbox = document.getElementById("trustbox");
    (window as any)?.Trustpilot?.loadFromElement(trustbox);
  }, []);

  return (
    <div className="py-[30px]">
      {/* TrustBox widget - Micro Review Count */}
      <div
        id="trustbox"
        className="trustpilot-widget"
        data-locale="en-AU"
        data-template-id="5419b6a8b0d04a076446a9ad"
        data-businessunit-id="649e6c60d8dcf9c6bb7d415b"
        data-style-height="36px"
        data-style-width="100%"
        data-theme="light"
        data-min-review-count="10"
        data-without-reviews-preferred-string-id="1"
        data-style-alignment="center"
      >
        <a
          href="https://au.trustpilot.com/review/surewill.com.au"
          target="_blank"
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
      {/* End TrustBox widget */}
    </div>
  );
};
