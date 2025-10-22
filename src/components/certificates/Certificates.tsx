"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CertificatesSection() {
    // Najprościej: trzymaj pliki w public/ i użyj ścieżek typu:
    // const images = ["/pictures/certificates/1.png", "/pictures/certificates/2.png", "/pictures/certificates/3.png", "/pictures/certificates/4.png"];

    // Jeśli chcesz z GitHuba – użyj RAW:
    const images = [
        "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certificates/1.png",
        "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certificates/1.png",
        "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certificates/1.png",
        "https://raw.githubusercontent.com/Crusty-IT/mobi-grooming/main/public/pictures/certificates/1.png",
    ];

    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);
    const [scale, setScale] = useState(1);
    const [tx, setTx] = useState(0);
    const [ty, setTy] = useState(0);
    const [dragging, setDragging] = useState(false);
    const drag = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

    const resetView = () => { setScale(1); setTx(0); setTy(0); };
    const openAt = (i: number) => { setIdx(i); resetView(); setOpen(true); };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowRight") { setIdx((k) => (k + 1) % images.length); resetView(); }
            if (e.key === "ArrowLeft")  { setIdx((k) => (k - 1 + images.length) % images.length); resetView(); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, images.length]);

    const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        const dir = Math.sign(e.deltaY);
        setScale((s) => {
            const ns = Math.min(4, Math.max(1, s - dir * 0.2));
            if (ns === 1) resetView();
            return ns;
        });
    };

    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (scale <= 1) return;
        setDragging(true);
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        drag.current = { x: e.clientX, y: e.clientY, tx, ty };
    };
    const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragging) return;
        const dx = e.clientX - drag.current.x;
        const dy = e.clientY - drag.current.y;
        setTx(drag.current.tx + dx);
        setTy(drag.current.ty + dy);
    };
    const endDrag: React.PointerEventHandler<HTMLDivElement> = () => setDragging(false);

    return (
        <section id="certyfikaty" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nasze certyfikaty</h2>
                    <p className="text-xl text-gray-600 mb-12">Profesjonalizm potwierdzony kwalifikacjami</p>

                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12 lg:p-16 border border-pink-200">
                        <div className="overflow-x-auto">
                            <div className="flex gap-6">
                                {images.map((src, i) => (
                                    <button
                                        key={i}
                                        onClick={() => openAt(i)}
                                        className="shrink-0 bg-white rounded-2xl border border-pink-100 shadow-sm p-4"
                                        title="Kliknij, aby powiększyć"
                                    >
                                        <img
                                            src={src}
                                            alt={`Certyfikat ${i + 1}`}
                                            loading="lazy"
                                            draggable={false}
                                            className="h-80 w-auto object-contain select-none"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="text-center text-gray-400 text-sm mt-6">Kliknij na certyfikat, aby go powiększyć.</p>
                    </div>

                    {open && (
                        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onWheel={onWheel}>
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-4 right-4 text-white/90 text-3xl px-3"
                                aria-label="Zamknij"
                            >
                                ×
                            </button>

                            <div
                                className={`relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-lg ${dragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-zoom-in"}`}
                                onPointerDown={onPointerDown}
                                onPointerMove={onPointerMove}
                                onPointerUp={endDrag}
                                onPointerLeave={endDrag}
                                style={{ touchAction: "none" }}
                            >
                                <img
                                    src={images[idx]}
                                    alt={`Certyfikat ${idx + 1}`}
                                    draggable={false}
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
            </div>
        </section>
    );
}