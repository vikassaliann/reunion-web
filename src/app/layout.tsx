import type { Metadata } from 'next'
import './globals.css'
import { ContactProvider } from '@/components/ContactContext'
import { PartnerProvider } from '@/components/PartnerContext'

import GoldScrollShimmer from '@/components/GoldScrollShimmer'

export const metadata: Metadata = {
  metadataBase: new URL('https://reunionglobal.in'),
  title: 'REUNION | Quiet Luxury Properties',
  description: 'Creating Memories One Reunion at a time. Premium beach stays, coastal cafés, boutique hotels & city villas — curated for those who gather in style.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'REUNION | Quiet Luxury Properties',
    description: 'Creating Memories One Reunion at a time. Premium beach stays, coastal cafés, boutique hotels & city villas — curated for those who gather in style.',
    siteName: 'REUNION',
    type: 'website',
    images: [
      {
        url: '/icon.png',
        width: 1080,
        height: 1080,
        alt: 'Reunion Logo',
      },
    ],
  },
}

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
