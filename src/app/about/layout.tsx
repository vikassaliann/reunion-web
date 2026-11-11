import type { Metadata } from "next";
import { getKeywordSeo } from "@/data/keywordGuide";

const BASE_URL = "https://www.reunionglobal.in";

const seo = getKeywordSeo("/about");
const PAGE_TITLE = seo?.title ?? "About REUNION (Reunion Global) | Hospitality, Udupi";
const PAGE_DESCRIPTION =
  seo?.description ??
  "REUNION is a hospitality management company in Udupi, Karnataka, trusted by 30+ property owners. Meet the team behind our beach villas, café and city stays.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/about`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080, alt: "About Reunion Global — Hospitality Management in Udupi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logoo.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
