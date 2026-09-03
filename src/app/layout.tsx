import type { Metadata } from 'next'
import './globals.css'
import { ContactProvider } from '@/components/ContactContext'
import { PartnerProvider } from '@/components/PartnerContext'

import GoldScrollShimmer from '@/components/GoldScrollShimmer'

// Staging environment noindex protection (Item 17)
const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || (!process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_NOINDEX !== 'true');

export const metadata: Metadata = {
  metadataBase: new URL('https://www.reunionglobal.in'),
  title: {
    default: 'REUNION | Luxury Villas, Cafés & Stays in Udupi',
    template: '%s | REUNION',
  },
  description: 'Premium beach villas, coastal cafés and city stays across Udupi, Karnataka — managed by REUNION near Malpe, Kapu & Mattu beaches. Explore our curated properties and start planning your stay.',
  keywords: ['luxury villas Udupi', 'best villas in Udupi', 'beach villa Udupi', 'Reunion Global', 'coastal stays Udupi', 'beach resort Udupi', 'beach house Kapu', 'Mattu Beach café', 'homestay in Udupi'],
  authors: [{ name: 'Reunion Global Private Ltd.' }],
  creator: 'Reunion Global Private Ltd.',
  publisher: 'Reunion Global Private Ltd.',
  icons: {
    icon: '/logoo.png',
    apple: '/logoo.png',
  },
  alternates: {
    canonical: 'https://www.reunionglobal.in',
  },
  robots: isProduction
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1, 'max-video-preview': -1 } }
    : { index: false, follow: false },
  openGraph: {
    title: 'REUNION | Quiet Luxury Properties — Coastal Karnataka',
    description: 'Creating Memories One Reunion at a time. Premium beach villas, coastal cafés, boutique hotels & city villas in Udupi, Karnataka — curated for those who gather in style.',
    url: 'https://www.reunionglobal.in',
    siteName: 'REUNION',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logoo.png',
        width: 1080,
        height: 1080,
        alt: 'Reunion Global — Quiet Luxury Properties in Coastal Karnataka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REUNION | Quiet Luxury Properties — Coastal Karnataka',
    description: 'Premium beach villas, coastal cafés & boutique hotels in Udupi, Karnataka — curated for those who gather in style.',
    images: ['/logoo.png'],
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
  logo: 'https://www.reunionglobal.in/logoo.png',
  description: 'Coastal Karnataka\'s most trusted luxury hospitality brand managing 17+ premium beach villas, coastal cafés, boutique hotels, and city villas across Udupi district.',
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
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        {/* Preload all hero slideshow images to prevent lag on transition */}
        <link rel="preload" as="image" href="/properties/homeslide/one.png" />
        <link rel="preload" as="image" href="/properties/homeslide/two.png" />
        <link rel="preload" as="image" href="/properties/homeslide/three.png" />
        <link rel="preload" as="image" href="/properties/homeslide/four.png" />
        <link rel="preload" as="image" href="/properties/homeslide/five.png" />
        <link rel="preload" as="image" href="/properties/homeslide/six.png" />
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
            {children}
          </PartnerProvider>
        </ContactProvider>
      </body>
    </html>
  )
}
