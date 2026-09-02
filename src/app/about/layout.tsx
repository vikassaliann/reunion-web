import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

export const metadata: Metadata = {
  title: 'REUNION - About Us | Hospitality Management Company in Udupi',
  description: 'REUNION is a hospitality management company in Udupi, Karnataka, trusted by 30+ property owners. Meet the team behind our beach villas, café and city stays.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: 'About REUNION | Hospitality Management Company in Udupi',
    description: 'REUNION is a hospitality management company in Udupi, Karnataka, trusted by 30+ property owners. Meet the team behind our beach villas, café and city stays.',
    url: `${BASE_URL}/about`,
    siteName: 'REUNION',
    type: 'website',
    images: [{ url: '/icon.png', width: 1080, height: 1080, alt: 'About Reunion Global — Hospitality Management in Udupi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About REUNION | Hospitality Management Company in Udupi',
    description: 'REUNION is a hospitality management company in Udupi, Karnataka, trusted by 30+ property owners.',
    images: ['/icon.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
