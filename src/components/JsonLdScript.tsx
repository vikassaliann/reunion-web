/** Inject JSON-LD without UI changes. */
export default function JsonLdScript({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
