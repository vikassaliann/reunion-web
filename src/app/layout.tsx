import type { Metadata } from 'next'
import './globals.css'
import { ContactProvider } from '@/components/ContactContext'
import { PartnerProvider } from '@/components/PartnerContext'
import { EnquiryProvider } from '@/components/EnquiryContext'

import GoldScrollShimmer from '@/components/GoldScrollShimmer'

// Staging environment noindex protection (Item 17)
const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || (!process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_NOINDEX !== 'true');

const HOME_TITLE = 'Discover REUNION in Udupi | Luxury Villas, Café & Events';
const HOME_DESCRIPTION =
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
    icon: [{ url: '/reunion-src-logo.jpeg', type: 'image/jpeg', sizes: 'any' }],
    apple: '/reunion-src-logo.jpeg',
    shortcut: '/reunion-src-logo.jpeg',
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

// Organization JSON-LD Schema (Item 7)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Reunion Global Private Ltd.',
  alternateName: 'REUNION',
  url: 'https://www.reunionglobal.in',
  logo: 'https://www.reunionglobal.in/reunion-src-logo.jpeg',
  description: HOME_DESCRIPTION,
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
    telephone: '+91-9980208289',
    contactType: 'reservations',
    availableLanguage: ['English', 'Kannada', 'Hindi'],
  },
  sameAs: [
    'https://www.instagram.com/reunionteam19',
    'https://www.youtube.com/@reunionteam19',
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
        <link rel="preload" as="image" href="/properties/reunion-seren/hero.png" />
        <link rel="preload" as="image" href="/properties/krshna/krthumb.png" />
        <link rel="preload" as="image" href="/properties/charm-villa/charmthub.png" />
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="relative bg-[#060606] text-white overflow-x-hidden">
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
