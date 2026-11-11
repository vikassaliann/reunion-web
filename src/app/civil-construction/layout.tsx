import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

const PAGE_TITLE = "Nemmadi Constructions | Building Your Dreams, Udupi";
const PAGE_DESCRIPTION =
  "Nemmadi Constructions in Ambalpady, Udupi — residential and commercial construction, interior design, and real estate. Timely delivery, transparency, and Vastu-compliant builds.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/civil-construction` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/civil-construction`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/properties/const/p1.png", width: 1200, height: 630 }],
  },
};

export default function CivilConstructionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
