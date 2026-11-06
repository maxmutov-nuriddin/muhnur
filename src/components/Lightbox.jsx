import { useEffect, useRef, useState } from "react";
import { LIGHTBOX_EVENT } from "../lib/lightboxBus.js";

/**
 * Buklangan varaqdagi ishni to'liq o'lchamda ko'rsatadi.
 * Ochiq paytda strelka tugmalari kitobni emas, rasmlarni almashtiradi.
 */
export default function Lightbox() {
  const [view, setView] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const handleOpen = (e) => setView(e.detail);
    addEventListener(LIGHTBOX_EVENT, handleOpen);
    return () => removeEventListener(LIGHTBOX_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!view) return undefined;
    closeRef.current?.focus();
    const total = view.images.length;
    const handleKey = (e) => {
      const moves = { ArrowRight: 1, ArrowLeft: -1 };
      if (e.key === "Escape") setView(null);
      else if (moves[e.key]) setView((v) => ({ ...v, index: (v.index + moves[e.key] + total) % total }));
      else return;
      // Kitobning o'z strelka boshqaruviga yetib bormasin.
      e.stopPropagation();
      e.preventDefault();
    };
    addEventListener("keydown", handleKey, true);
    return () => removeEventListener("keydown", handleKey, true);
  }, [view]);

  if (!view) return null;

  const { title, images, index } = view;
  const image = images[index];
  const hasMany = images.length > 1;
  const step = (delta) => (e) => {
    e.stopPropagation();
    setView((v) => ({ ...v, index: (v.index + delta + images.length) % images.length }));
  };

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={title} onClick={() => setView(null)}>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        <img key={image.src} src={image.src} alt={`${title}, ${index + 1}-ish`} width={image.w} height={image.h} />
        <figcaption>
          <b>{title}</b>
          <span>
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>
      {hasMany && (
        <>
          <button type="button" className="lb-nav lb-prev" aria-label="Oldingi" onClick={step(-1)}>
            ←
          </button>
          <button type="button" className="lb-nav lb-next" aria-label="Keyingi" onClick={step(1)}>
            →
          </button>
        </>
      )}
      <button ref={closeRef} type="button" className="lb-close" aria-label="Yopish" onClick={() => setView(null)}>
        ×
      </button>
    </div>
  );
}
