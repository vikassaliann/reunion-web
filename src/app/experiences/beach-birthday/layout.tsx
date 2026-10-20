import type { Metadata } from "next";
import { getKeywordSeo } from "@/data/keywordGuide";

const BASE_URL = "https://www.reunionglobal.in";
const CANONICAL = `${BASE_URL}/experiences/beach-birthday`;

const seo = getKeywordSeo("/experiences/beach-birthday");
const PAGE_TITLE = seo?.title ?? "Beach Birthday Celebration in Udupi | REUNION";
const PAGE_DESCRIPTION =
  seo?.description ??
  "Celebrate a birthday on the beach in Udupi — decorated beachside setup at Mattu Beach with dinner and cake. Packages for couples, families and groups.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/properties/experiances/candlelight/bdy/bd.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/properties/experiances/candlelight/bdy/bd.jpeg"],
  },
};

export default function BeachBirthdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
