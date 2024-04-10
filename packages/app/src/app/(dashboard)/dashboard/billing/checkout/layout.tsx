import { ReactNode } from "react";
import Script from "next/script";
import { env } from "@/env.mjs";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <>{children}</>
      <Script
        id="trustPilotTag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
          a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];
          f.parentNode.insertBefore(a,f)})(window,document,'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
          tp('register', "${env.NEXT_PUBLIC_TRUST_PILOT_KEY}");`,
        }}
      />
      <Script
        id="trustPilotWidgetTag"
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
      />
    </>
  );
}
