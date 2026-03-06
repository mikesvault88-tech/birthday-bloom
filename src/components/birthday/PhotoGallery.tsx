import { useState, useEffect, useRef } from "react";
import { PHOTO_ASSETS } from "@/config/birthday";
import photo1Default from "@/assets/photo-1.jpg";
import photo2Default from "@/assets/photo-2.jpg";
import photo3Default from "@/assets/photo-3.jpg";

const photos = [
  { src: PHOTO_ASSETS.photo1 || photo1Default, fallback: photo1Default, caption: "Beautiful moments together 💖", key: "p1" },
  { src: PHOTO_ASSETS.photo2 || photo2Default, fallback: photo2Default, caption: "Memories that last forever ✨", key: "p2" },
  { src: PHOTO_ASSETS.photo3 || photo3Default, fallback: photo3Default, caption: "Smiles that light up the world 🌟", key: "p3" },
].filter(p => p.src !== null);

export const PhotoGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [lightbox]);

  if (photos.length === 0) return null;

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative z-20 px-4 py-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-shift">
          Precious Moments 📸
        </h3>

        {/* Featured photo */}
        <div className="max-w-2xl mx-auto mb-8">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/20 cursor-pointer group"
            onClick={() => setLightbox(activeIndex)}
            style={{
              boxShadow: "0 0 60px hsl(var(--primary) / 0.2), 0 0 120px hsl(var(--secondary) / 0.1)",
            }}
          >
            {photos.map((photo, i) => (
              <div
                key={i}
                className="w-full transition-all duration-1000"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  position: i === activeIndex ? "relative" : "absolute",
                  top: 0, left: 0,
                  transform: i === activeIndex ? "scale(1)" : "scale(1.08)",
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = photo.fallback;
                  }}
                  className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.8) 0%, transparent 50%)" }}
                />
                <p className="absolute bottom-4 left-0 right-0 text-center font-display text-lg md:text-xl text-foreground/90 italic"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
                >
                  {photo.caption}
                </p>
              </div>
            ))}
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ boxShadow: "inset 0 0 40px hsl(var(--primary) / 0.15)" }}
            />
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mb-8">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-primary scale-130 shadow-[0_0_15px_hsl(var(--primary)/0.5)]" : "bg-muted"
                }`}
              style={{ transform: i === activeIndex ? "scale(1.3)" : "scale(1)" }}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 border-2 group/thumb ${i === activeIndex ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : "border-transparent"
                }`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = photo.fallback;
                }}
                className="w-full h-24 md:h-32 object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl animate-fade-in cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-[90vw] animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].caption}
              onError={(e) => {
                (e.target as HTMLImageElement).src = photos[lightbox].fallback;
              }}
              className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              style={{ boxShadow: "0 0 80px hsl(var(--primary) / 0.3)" }}
            />
            <p className="text-center mt-4 font-display text-xl text-foreground/90 italic">
              {photos[lightbox].caption}
            </p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground text-xl hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              ✕
            </button>
            {/* Nav arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground text-xl hover:bg-primary/50 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}
            >
              ‹
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground text-xl hover:bg-primary/50 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
};
