import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";
const PAGE_TITLE = "Experiences in Udupi | Coastal Celebrations | REUNION";
const PAGE_DESCRIPTION =
  "Candlelight dinners on Mattu Beach, beach birthdays, wellness and curated coastal experiences in Udupi, hosted by REUNION.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/experiences` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/experiences`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080, alt: "REUNION Experiences" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logoo.png"],
  },
};

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
