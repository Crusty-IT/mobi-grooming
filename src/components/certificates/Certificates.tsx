"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

const HIDE_SCROLLBAR_STYLE = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const CERT_IMAGES = [
  "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certs/1.png",
  "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certs/2.png",
  "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certs/3.png",
  "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certs/4.png",
  "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certs/5.png",
  "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certs/6.png",
];

export default function CertificatesSection() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const resetView = useCallback(() => { setScale(1); setTx(0); setTy(0); }, []);
  const openAt = useCallback((i: number) => { setIdx(i); resetView(); setOpen(true); }, [resetView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") { setIdx((k) => (k + 1) % CERT_IMAGES.length); resetView(); }
      if (e.key === "ArrowLeft") { setIdx((k) => (k - 1 + CERT_IMAGES.length) % CERT_IMAGES.length); resetView(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, resetView]);

  const onWheel: React.WheelEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
    const dir = Math.sign(e.deltaY);
    setScale((s) => {
      const ns = Math.min(4, Math.max(1, s - dir * 0.2));
      if (ns === 1) resetView();
      return ns;
    });
  }, [resetView]);

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = useCallback((e) => {
    if (scale <= 1) return;
    setDragging(true);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, tx, ty };
  }, [scale, tx, ty]);

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!dragging) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    setTx(drag.current.tx + dx);
    setTy(drag.current.ty + dy);
  }, [dragging]);

  const endDrag: React.PointerEventHandler<HTMLDivElement> = useCallback(() => setDragging(false), []);

  const checkForScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const buffer = 1;
      setCanScrollLeft(el.scrollLeft > buffer);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - buffer);
    }
  }, []);

  const handleScroll = useCallback((direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkForScroll();
    el.addEventListener('scroll', checkForScroll);
    window.addEventListener('resize', checkForScroll);
    const timeoutId = setTimeout(checkForScroll, 100);
    return () => {
      el.removeEventListener('scroll', checkForScroll);
      window.removeEventListener('resize', checkForScroll);
      clearTimeout(timeoutId);
    };
  }, [checkForScroll]);

  return (
    <>
      <style>{HIDE_SCROLLBAR_STYLE}</style>
      <section id="certyfikaty" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nasze certyfikaty</h2>
            <p className="text-xl text-gray-600 mb-12">Profesjonalizm potwierdzony kwalifikacjami</p>

            <div className="relative">
              {canScrollLeft && (
                <button
                  onClick={() => handleScroll('left')}
                  className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Przewiń w lewo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m15 18-6-6 6-6"/></svg>
                </button>
              )}

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-pink-200">
                <div ref={scrollContainerRef} className="overflow-x-auto hide-scrollbar">
                  <div className="flex gap-6">
                    {CERT_IMAGES.map((src, i) => (
                      <button
                        key={i} onClick={() => openAt(i)}
                        className="shrink-0 bg-white rounded-2xl border border-pink-100 shadow-sm p-4 transition-transform hover:-translate-y-1"
                        title="Kliknij, aby powiększyć"
                      >
                        <img
                          src={src} alt={`Certyfikat ${i + 1}`} loading="lazy" draggable={false}
                          className="h-80 w-auto object-contain select-none"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-center text-gray-400 text-sm mt-6">
                  Kliknij na certyfikat, aby go powiększyć
                </p>
              </div>

              {canScrollRight && (
                <button
                  onClick={() => handleScroll('right')}
                  className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Przewiń w prawo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              )}
            </div>
          </div>

          {open && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onWheel={onWheel}>
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white/90 text-3xl px-3" aria-label="Zamknij">×</button>
              <div
                className={`relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-lg ${dragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-zoom-in"}`}
                onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerLeave={endDrag}
                style={{ touchAction: "none" }}
              >
                <img
                  src={CERT_IMAGES[idx]} alt={`Certyfikat ${idx + 1}`} draggable={false}
                  className="select-none pointer-events-none max-w-[90vw] max-h-[85vh] object-contain"
                  style={{
                    transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
                    transition: dragging ? "none" : "transform 150ms ease-out",
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}