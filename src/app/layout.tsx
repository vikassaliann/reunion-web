import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { ContactProvider } from '@/components/ContactContext'
import { PartnerProvider } from '@/components/PartnerContext'
import { EnquiryProvider } from '@/components/EnquiryContext'

import GoldScrollShimmer from '@/components/GoldScrollShimmer'
import { getKeywordSeo } from '@/data/keywordGuide'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Staging environment noindex protection (Item 17)
const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || (!process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_NOINDEX !== 'true');

const homeSeo = getKeywordSeo('/');
const HOME_TITLE = homeSeo?.title ?? 'REUNION | Luxury Villas in Udupi & Beach Stays, Karnataka';
const HOME_DESCRIPTION =
  homeSeo?.description ??
  'Luxury beach and city villas, a beachfront café, candlelight dinners and a wedding venue in Udupi, Karnataka. Book your stay with REUNION.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.reunionglobal.in'),
  title: {
    default: HOME_TITLE,
    template: '%s | REUNION',
  },
  description: HOME_DESCRIPTION,
  keywords: ['luxury villas Udupi', 'best villas in Udupi', 'beach villa Udupi', 'Reunion Global', 'coastal stays Udupi', 'beach resort Udupi', 'beach house Kapu', 'Mattu Beach café', 'candlelight dinner Udupi', 'beach wedding venue Udupi', 'homestay in Udupi'],
  authors: [{ name: 'Reunion Global Private Ltd.' }],
  creator: 'Reunion Global Private Ltd.',
  publisher: 'Reunion Global Private Ltd.',
  icons: {
    // Solid black background (no alpha) so Google SERP does not paint a white disc
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon-48.png?v=2', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96.png?v=2', type: 'image/png', sizes: '96x96' },
      { url: '/android-chrome-192.png?v=2', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico?v=2',
  },
  alternates: {
    canonical: 'https://www.reunionglobal.in',
  },
  robots: isProduction
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1, 'max-video-preview': -1 } }
    : { index: false, follow: false },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://www.reunionglobal.in',
    siteName: 'REUNION',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/reunion-src-logo.jpeg',
        width: 512,
        height: 512,
        alt: 'Discover REUNION in Udupi — Luxury Villas, Café & Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['/reunion-src-logo.jpeg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } : {}),
    },
  },
}

// Organization JSON-LD — Developer Brief task 1
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'REUNION',
  legalName: 'Reunion Global Private Ltd.',
  alternateName: 'Reunion Global',
  url: 'https://www.reunionglobal.in',
  logo: 'https://www.reunionglobal.in/reunion-logo-black.png',
  description: HOME_DESCRIPTION,
  telephone: '+91-99802-08289',
  foundingDate: '2020',
  founder: {
    '@type': 'Person',
    name: 'Mrs. Kshama Kadamba',
    jobTitle: 'Managing Director & CEO',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Udupi',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-99802-08289',
    contactType: 'reservations',
    availableLanguage: ['English', 'Kannada', 'Hindi'],
  },
  sameAs: [
    'https://www.instagram.com/reunionteam19',
    'https://www.youtube.com/@reunionteam19',
    'https://www.facebook.com/share/1HEff1Dir3/',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600&family=Raleway:wght@300;400;500;600&family=Jost:wght@300;400;500;600&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        {/* Preload home hero slideshow images */}
        <link rel="preload" as="image" href="/properties/ocean-manor/herooo.png" />
        <link rel="preload" as="image" href="/properties/ocean-royal/royalthumb.png" />
        <link rel="preload" as="image" href="/properties/reunion-serene/hero.png" />
        <link rel="preload" as="image" href="/properties/krshna/krthumb.png" />
        <link rel="preload" as="image" href="/properties/charm-villa/charmthub.png" />
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="relative bg-[#060606] text-white overflow-x-hidden">
        {GTM_ID ? (
          <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
        ) : null}
        {GA_ID && !GTM_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>
          </>
        ) : null}
        <GoldScrollShimmer />
        <ContactProvider>
          <PartnerProvider>
            <EnquiryProvider>
              {children}
            </EnquiryProvider>
          </PartnerProvider>
        </ContactProvider>
      </body>
    </html>
  )
}
