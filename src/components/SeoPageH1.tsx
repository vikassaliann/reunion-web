import type { ReactNode } from "react";

type Props = {
  /** Guide/report H1 — one per page for crawlers and assistive tech */
  seoHeading: string;
  visualClassName?: string;
  children: ReactNode;
};

/** Visible hero unchanged; semantic H1 carries keyword copy from the SEO guide. */
export default function SeoPageH1({ seoHeading, visualClassName = "", children }: Props) {
  return (
    <>
      <h1 className="sr-only">{seoHeading}</h1>
      <p className={visualClassName} aria-hidden="true">
        {children}
      </p>
    </>
  );
}
