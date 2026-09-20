import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#16130F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { RouteFocus } from "@/components/layout/route-focus";
import { RevealOrchestrator } from "@/components/layout/reveal";
import { CartProvider } from "@/lib/commerce/cart-context";
import { CurrencyProvider } from "@/lib/commerce/currency-context";
import type { CurrencyCode } from "@/lib/commerce/currency-context";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { cookies } from "next/headers";

import { ConsentBanner } from "@/components/marketing/consent-banner";
import { AnalyticsQA } from "@/components/marketing/analytics-qa";
import { UtmTracker } from "@/lib/analytics/utm";
import Script from "next/script";
import React from "react";

import { Poppins, Inter, JetBrains_Mono } from "next/font/google";

/* Display voice. Friendly, rounded, bold for the Perfect Keto feel. */
const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

/* Interface voice. Clean and readable. */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Data voice. Prices, quantities. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://10minutereset.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The 10-Minute Reset",
    template: "%s | The 10-Minute Reset",
  },
  description: "Everyday tension recovery routines for busy professionals.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "The 10-Minute Reset",
    description: "Everyday tension recovery routines for busy professionals.",
    siteName: "The 10-Minute Reset",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 10-Minute Reset",
    description: "Everyday tension recovery routines for busy professionals.",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The 10-Minute Reset",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`, // Placeholder
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The 10-Minute Reset",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialCurrency = cookieStore.get("preferred_currency")?.value as CurrencyCode | undefined;

  return (
    <html lang="en" className="js">
      <head>
        {/* Reveal targets start hidden only while scripting can bring
            them back. Without JS this rule restores the final state. */}
        <noscript>
          <style>{`html.js [data-reveal],html.js [data-wipe],html.js [data-wipe]>*,html.js [data-reveal-children],html.js [data-reveal-children]>*{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {/* Analytics Base Scripts */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            // We do NOT call fbq('init') here. We wait for consent.
            if (typeof window !== 'undefined' && localStorage.getItem('agy_consent') === 'granted') {
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || ''}');
              fbq('track', 'PageView');
            }
          `}
        </Script>
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              if (typeof window !== 'undefined' && localStorage.getItem('agy_consent') === 'granted') {
                ttq.load('${process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || ''}');
                ttq.page();
              }
            }(window, document, 'ttq');
          `}
        </Script>
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable} bg-surface text-text-primary font-sans antialiased`}
      >
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <React.Suspense fallback={null}>
          <UtmTracker />
        </React.Suspense>
        
        <CurrencyProvider initialCurrency={initialCurrency}>
          <CartProvider>
            <SkipLink />
            <RouteFocus />
            <RevealOrchestrator />
            <div className="min-h-dvh flex flex-col relative w-full overflow-x-hidden">
              <Header />
              <main id="main-content" tabIndex={-1} className="flex-1 outline-none w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </div>
            <CartDrawer />
          </CartProvider>
        </CurrencyProvider>
        
        <ConsentBanner />
        <AnalyticsQA />
      </body>
    </html>
  );
}
