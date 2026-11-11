"use client";

import { useEffect, useState } from "react";

type PropertyStyleGalleryProps = {
  images: string[];
  label: string;
  className?: string;
};

export default function PropertyStyleGallery({
  images,
  label,
  className = "",
}: PropertyStyleGalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images?.length) return null;

  const gridSlots = images.slice(0, 5);
  const extraPhotoCount = Math.max(0, images.length - 5);

  const openLightbox = (idx: number) => {
    setSelectedImageIdx(idx);
    setLightboxOpen(true);
  };

  const lightboxPrev = () =>
    setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length);
  const lightboxNext = () =>
    setSelectedImageIdx((prev) => (prev + 1) % images.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, images.length]);

  return (
    <div className={`mb-14 md:mb-16 ${className}`}>
      {images.length === 1 ? (
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="w-full aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden bg-[#0a0a0a] ring-1 ring-white/10"
        >
          <img
            src={images[0]}
            alt={`${label} — photo 1`}
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
          />
        </button>
      ) : (
        <>
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2.5 h-[min(68vh,640px)] rounded-xl overflow-hidden">
            {gridSlots.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => openLightbox(i)}
                className={`relative overflow-hidden bg-[#0a0a0a] group ring-1 ring-white/5 ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  src={src}
                  alt={`${label} — photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {i === 4 && extraPhotoCount > 0 && (
                  <span className="absolute inset-0 bg-black/55 flex items-center justify-center font-futura text-sm tracking-[0.25em] uppercase text-white">
                    +{extraPhotoCount} photos
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="md:hidden space-y-3">
            <button
              type="button"
              onClick={() => openLightbox(selectedImageIdx)}
              className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#0a0a0a] ring-1 ring-white/10"
            >
              <img
                src={images[selectedImageIdx]}
                alt={`${label} — photo ${selectedImageIdx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
            <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setSelectedImageIdx(i)}
                  className={`flex-none w-20 h-20 rounded-md overflow-hidden ring-2 transition-all ${
                    selectedImageIdx === i ? "ring-[#C9A84C]" : "ring-transparent opacity-60"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {images.length > 1 && (
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="mt-4 hidden md:inline-flex items-center gap-2 font-futura text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-[#C9A84C] transition-colors"
        >
          View all {images.length} photos
        </button>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} photo gallery`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <p className="font-futura text-[10px] tracking-[0.3em] text-white/60 uppercase">
              {selectedImageIdx + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="font-futura text-[10px] tracking-[0.3em] uppercase text-white/70 hover:text-white px-3 py-2"
            >
              Close
            </button>
          </div>
          <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 py-6">
            <button
              type="button"
              onClick={lightboxPrev}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/20 text-white/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <img
              src={images[selectedImageIdx]}
              alt={`${label} — photo ${selectedImageIdx + 1}`}
              className="max-h-[min(75vh,900px)] max-w-full object-contain"
            />
            <button
              type="button"
              onClick={lightboxNext}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/20 text-white/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
