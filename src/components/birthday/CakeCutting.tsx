import { useState, useEffect, useCallback, useMemo, CSSProperties } from "react";
import { Cake as CakeIcon, Flame, Heart, Sparkles } from "lucide-react";
import { BIRTHDAY_NAME } from "../../config/birthday";
import { useConfetti } from "./Confetti";
import { useSoundManager } from "./SoundManager";
import { KineticText } from "./KineticText";

type Phase =
  | "select"
  | "blow-intro"
  | "blowing"
  | "wish"
  | "knife-enter"
  | "cutting"
  | "burst"
  | "quotes";

/* ── Cake designs ── */
const CAKE_OPTIONS = [
  {
    id: "chocolate",
    name: "Chocolate Dream",
    layers: ["hsl(15,60%,30%)", "hsl(15,50%,40%)", "hsl(20,40%,50%)"],
    frosting: "hsl(30,70%,70%)",
    accent: "hsl(45,100%,60%)",
    emoji: "🍫",
    image: "/assets/birthday/cake-maroon.png", // Using the maroon theme for chocolate
  },
  {
    id: "strawberry",
    name: "Strawberry Bliss",
    layers: ["hsl(340,60%,55%)", "hsl(330,55%,65%)", "hsl(340,50%,75%)"],
    frosting: "hsl(350,80%,88%)",
    accent: "hsl(0,80%,60%)",
    emoji: "🍓",
    image: "/assets/birthday/cake-pink.png",
  },
  {
    id: "royal",
    name: "Royal Velvet",
    layers: ["hsl(270,50%,35%)", "hsl(280,45%,50%)", "hsl(290,40%,60%)"],
    frosting: "hsl(45,100%,75%)",
    accent: "hsl(45,100%,60%)",
    emoji: "👑",
    image: "/assets/birthday/birthday-gold.png",
  },
  {
    id: "nature",
    name: "Floral Garden",
    layers: ["hsl(120,40%,30%)", "hsl(100,30%,40%)", "hsl(140,40%,50%)"],
    frosting: "hsl(80,50%,80%)",
    accent: "hsl(330,85%,65%)",
    emoji: "🌸",
    image: "/assets/birthday/cake-green.png",
  },
];

type CakeOption = (typeof CAKE_OPTIONS)[number];

/* ── Spark particles ── */
const CutSparks = ({ count }: { count: number }) => {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (360 / count) * i + Math.random() * 20 - 10,
        distance: 40 + Math.random() * 60,
        size: 3 + Math.random() * 4,
        duration: 0.6 + Math.random() * 0.4,
        hue: [330, 45, 270, 200][i % 4],
      })),
    [count]
  );
  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: `hsl(${s.hue}, 85%, 65%)`,
            boxShadow: `0 0 8px hsl(${s.hue}, 85%, 65%), 0 0 16px hsl(${s.hue}, 85%, 65%, 0.5)`,
            animation: `cut-spark ${s.duration}s ease-out forwards`,
            "--spark-x": `${Math.cos((s.angle * Math.PI) / 180) * s.distance}px`,
            "--spark-y": `${Math.sin((s.angle * Math.PI) / 180) * s.distance}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
};

/* ── Burst particles ── */
const BurstParticles = ({ count }: { count: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (360 / count) * i,
        distance: 80 + Math.random() * 120,
        size: 4 + Math.random() * 6,
        duration: 1 + Math.random() * 0.8,
        delay: Math.random() * 0.3,
        hue: [330, 45, 270, 200, 15, 160][i % 6],
      })),
    [count]
  );
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue}, 85 %, 65 %)`,
            boxShadow: `0 0 12px hsl(${p.hue}, 85 %, 65 %), 0 0 24px hsl(${p.hue}, 85 %, 65 %, 0.4)`,
            animation: `cut - spark ${p.duration}s ease - out ${p.delay}s forwards`,
            "--spark-x": `${Math.cos((p.angle * Math.PI) / 180) * p.distance} px`,
            "--spark-y": `${Math.sin((p.angle * Math.PI) / 180) * p.distance} px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
};

/* ── SVG Cake (Legendary Premium Version) ── */
const CakeSVG = ({ cake, split, candlesLit }: { cake: CakeOption; split: boolean; candlesLit: boolean }) => (
  <svg viewBox="0 0 200 200" className="w-56 sm:w-64 md:w-80 mx-auto" style={{ filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5))" }}>
    <defs>
      <filter id="glassBlur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
      <filter id="candleGlow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="layerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.2" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
        <stop offset="100%" stopColor="black" stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="cakeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Table Shadow */}
    <ellipse cx="100" cy="185" rx="90" ry="12" fill="black" opacity="0.2" />
    <ellipse cx="100" cy="185" rx="70" ry="8" fill="url(#cakeGlow)" />

    {/* Bottom Layer */}
    <g style={{ transform: split ? "translateX(-12px) rotate(-3deg)" : "translateX(0) rotate(0)", transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
      <rect x="20" y="110" width="80" height="65" rx="10" fill={cake.layers[0]} />
      <rect x="20" y="110" width="80" height="65" rx="10" fill="url(#layerGrad)" />
      {/* Decorative frosting */}
      <path d="M20,110 Q60,125 100,110 L100,125 Q60,140 20,125 Z" fill={cake.frosting} filter="url(#glassBlur)" opacity="0.9" />
    </g>
    <g style={{ transform: split ? "translateX(12px) rotate(3deg)" : "translateX(0) rotate(0)", transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
      <rect x="100" y="110" width="80" height="65" rx="10" fill={cake.layers[0]} />
      <rect x="100" y="110" width="80" height="65" rx="10" fill="url(#layerGrad)" />
      <path d="M100,110 Q140,125 180,110 L180,125 Q140,140 100,125 Z" fill={cake.frosting} filter="url(#glassBlur)" opacity="0.9" />
    </g>

    {/* Middle Layer */}
    <g style={{ transform: split ? "translateX(-8px) rotate(-2deg)" : "translateX(0) rotate(0)", transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
      <rect x="35" y="65" width="65" height="55" rx="8" fill={cake.layers[1]} />
      <rect x="35" y="65" width="65" height="55" rx="8" fill="url(#layerGrad)" />
      <path d="M35,65 Q67,80 100,65 L100,80 Q67,95 35,80 Z" fill={cake.frosting} opacity="0.8" />
    </g>
    <g style={{ transform: split ? "translateX(8px) rotate(2deg)" : "translateX(0) rotate(0)", transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
      <rect x="100" y="65" width="65" height="55" rx="8" fill={cake.layers[1]} />
      <rect x="100" y="65" width="65" height="55" rx="8" fill="url(#layerGrad)" />
      <path d="M100,65 Q133,80 165,65 L165,80 Q133,95 100,80 Z" fill={cake.frosting} opacity="0.8" />
    </g>

    {/* Top Layer */}
    <g style={{ transform: split ? "translateX(-4px)" : "translateX(0)", transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
      <rect x="50" y="30" width="50" height="45" rx="8" fill={cake.layers[2]} />
      <rect x="50" y="30" width="50" height="45" rx="8" fill="url(#layerGrad)" />
      <ellipse cx="75" cy="35" rx="25" ry="8" fill="white" opacity="0.3" filter="url(#glassBlur)" />
    </g>
    <g style={{ transform: split ? "translateX(4px)" : "translateX(0)", transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
      <rect x="100" y="30" width="50" height="45" rx="8" fill={cake.layers[2]} />
      <rect x="100" y="30" width="50" height="45" rx="8" fill="url(#layerGrad)" />
      <ellipse cx="125" cy="35" rx="25" ry="8" fill="white" opacity="0.3" filter="url(#glassBlur)" />
    </g>

    {/* Candles */}
    {[75, 100, 125].map((cx, i) => (
      <g key={i}>
        <rect x={cx - 2} y="5" width="4" height="28" rx="2" fill={`hsl(${i * 40 + 200}, 80%, 65%)`} />
        {candlesLit ? (
          <g className="animate-flame-premium" filter="url(#candleGlow)">
            <ellipse cx={cx} cy="-2" rx="6" ry="12" fill={cake.accent} style={{ filter: "blur(1px)" }} />
            <ellipse cx={cx} cy="-1" rx="3" ry="7" fill="white" />
            <circle cx={cx} cy="-2" r="15" fill={cake.accent} opacity="0.15" className="animate-pulse" />
          </g>
        ) : (
          <g style={{ animation: `smoke-rise 2s ease-out ${i * 0.1}s forwards` }}>
            <circle cx={cx} cy="5" r="2" fill="white" opacity="0.3" />
          </g>
        )}
      </g>
    ))}

    {/* Final Reveal Polish */}
    {split && (
      <rect x="98" y="25" width="4" height="150" fill={cake.accent} opacity="0.8"
        style={{ animation: "golden-reveal 1.5s ease-out both", filter: "blur(5px)" }} />
    )}
  </svg>
);

/* ── SVG Knife ── */
const KnifeSVG = ({ phase }: { phase: Phase }) => {
  const animClass =
    phase === "knife-enter" ? "animate-knife-enter" :
      phase === "cutting" ? "animate-knife-cut" : "";

  return (
    <div className={`absolute left-1/2 -translate-x-1/2 z-10 ${animClass}`}
      style={{ top: phase === "select" ? "-150px" : undefined, willChange: "transform" }}>
      <svg viewBox="0 0 30 120" className="w-8 sm:w-10 md:w-12" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}>
        <rect x="10" y="0" width="10" height="40" rx="4" fill="hsl(30, 40%, 30%)" />
        <rect x="12" y="5" width="6" height="12" rx="2" fill="hsl(30, 30%, 45%)" opacity="0.6" />
        <rect x="6" y="38" width="18" height="5" rx="2" fill="hsl(0, 0%, 70%)" />
        <polygon points="10,43 20,43 18,115 12,115" fill="hsl(0, 0%, 80%)" />
        <polygon points="12,43 17,43 16,115 13,115" fill="hsl(0, 0%, 90%)" opacity="0.5" />
        <rect x="13" y="43" width="4" height="72" rx="2" fill="white" opacity="0.15"
          style={{ animation: "knife-gleam 2s ease-in-out infinite" }} />
        <polygon points="12,115 18,115 15,120" fill="hsl(0, 0%, 75%)" />
      </svg>
    </div>
  );
};

/* ── Cake Selection Card ── */
const CakeCard = ({ cake, index, onSelect }: { cake: CakeOption; index: number; onSelect: () => void; key?: string }) => (
  <button
    onClick={onSelect}
    className="group relative flex flex-col items-center gap-3 p-2 rounded-2xl border border-border/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40 overflow-hidden"
    style={{
      background: "linear-gradient(135deg, hsl(var(--card) / 0.9), hsl(var(--card) / 0.6))",
      animation: `cake-select-pop 0.6s ease-out ${index * 0.15}s both`,
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      width: "160px",
    }}
  >
    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
      <img
        src={cake.image}
        alt={cake.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
      <div className="absolute bottom-2 right-2 text-2xl drop-shadow-lg">
        {cake.emoji}
      </div>
    </div>

    <div className="px-2 pb-3 text-center">
      <span className="font-display text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors">
        {cake.name}
      </span>
      <div className="flex gap-1 justify-center mt-2">
        {cake.layers.map((l, idx) => (
          <div key={idx} className="w-2 h-2 rounded-full" style={{ backgroundColor: l }} />
        ))}
      </div>
    </div>

    {/* Hover Glow */}
    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

/* ── Quote sequence ── */
/**
 * Cinematic Quotes for the Celebration Phase
 * These appear one after another after the cake is cut.
 */
const quotes = [
  { text: `To ${BIRTHDAY_NAME}...`, animation: "zoom-in" as const },
  { text: "My Favorite Person", animation: "pop-out" as const },
  { text: "The One Who Makes Everything Better", animation: "stagger-up" as const },
  { text: "Happy Birthday!", animation: "typewriter-burst" as const },
  { text: `Stay Awesome, ${BIRTHDAY_NAME} !`, animation: "float" as const },
];

/* ══════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════ */
export const CakeCutting = () => {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedCake, setSelectedCake] = useState<CakeOption | null>(null);
  const [candlesLit, setCandlesLit] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(-1);
  const { fireCannon } = useConfetti();
  const { playBoom, playReveal, playPop, playWhoosh } = useSoundManager();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const sparkCount = isMobile ? 10 : 18;
  const burstCount = isMobile ? 12 : 20;

  /* ── Select a cake ── */
  const handleSelectCake = useCallback((cake: CakeOption) => {
    setSelectedCake(cake);
    playPop();
    setPhase("blow-intro");
  }, [playPop]);

  /* ── Blow out candles ── */
  const handleBlow = useCallback(() => {
    if (phase !== "blow-intro") return;
    setPhase("blowing");
    playWhoosh();
    setCandlesLit(false);

    // Wish moment
    setTimeout(() => {
      setPhase("wish");
      playReveal();
    }, 1200);

    // Transition to knife
    setTimeout(() => {
      setPhase("knife-enter");
    }, 4500);

    // Cutting
    setTimeout(() => {
      setPhase("cutting");
      playBoom();
    }, 5500);

    // Burst
    setTimeout(() => {
      setPhase("burst");
      fireCannon();
      playReveal();
    }, 6300);

    // Quotes
    setTimeout(() => {
      setPhase("quotes");
      setQuoteIndex(0);
    }, 7800);
  }, [phase, fireCannon, playBoom, playReveal, playWhoosh]);

  /* ── Advance quotes ── */
  useEffect(() => {
    if (phase !== "quotes" || quoteIndex < 0 || quoteIndex >= quotes.length) return;
    const t = setTimeout(() => {
      if (quoteIndex < quotes.length - 1) setQuoteIndex((i) => i + 1);
    }, 3500);
    return () => clearTimeout(t);
  }, [phase, quoteIndex]);

  const isOverlayActive = phase !== "select";
  const showCakeScene = phase !== "select";
  const cake = selectedCake || CAKE_OPTIONS[0];

  return (
    <>
      {/* ── Full-screen cinematic overlay ── */}
      {isOverlayActive && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center animate-overlay-in"
          style={{ background: "hsl(280, 60%, 5%, 0.85)" }}
        >
          <div className="relative w-full max-w-lg px-4 flex flex-col items-center">

            {/* ── Blow-intro: cake with lit candles + blow button ── */}
            {(phase === "blow-intro" || phase === "blowing") && (
              <div className="flex flex-col items-center gap-6">
                <p className="font-display text-xl sm:text-2xl text-foreground/90 text-center animate-wish-glow">
                  ✨ Make a wish and blow out the candles ✨
                </p>
                <div className="animate-cake-glow">
                  <CakeSVG cake={cake} split={false} candlesLit={candlesLit} />
                </div>
                {phase === "blow-intro" && (
                  <button
                    onClick={handleBlow}
                    className="px-8 py-4 rounded-full text-lg font-bold text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--birthday-sky)), hsl(var(--birthday-purple)))",
                      boxShadow: "0 0 30px hsl(var(--birthday-sky) / 0.4), 0 0 60px hsl(var(--birthday-purple) / 0.2)",
                    }}
                  >
                    🌬️ Blow the Candles!
                  </button>
                )}
              </div>
            )}

            {/* ── Wish moment ── */}
            {phase === "wish" && (
              <div className="flex flex-col items-center gap-8">
                <div className="animate-cake-glow">
                  <CakeSVG cake={cake} split={false} candlesLit={false} />
                </div>
                <div className="animate-wish-glow text-center">
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--birthday-gold))] via-[hsl(var(--birthday-pink))] to-[hsl(var(--birthday-gold))] bg-clip-text text-transparent">
                    🌟 Your wish has been made 🌟
                  </p>
                  <p className="text-muted-foreground text-base sm:text-lg mt-3">May it come true this year...</p>
                </div>
              </div>
            )}

            {/* ── Knife + cutting + burst ── */}
            {(phase === "knife-enter" || phase === "cutting" || phase === "burst") && (
              <div className={`relative ${phase === "cutting" ? "animate-screen-shake" : ""} `} style={{ perspective: "800px" }}>
                {(phase === "knife-enter" || phase === "cutting") && <KnifeSVG phase={phase} />}
                {phase === "cutting" && <CutSparks count={sparkCount} />}
                {phase === "burst" && <BurstParticles count={burstCount} />}
                <div className="animate-cake-glow">
                  <CakeSVG cake={cake} split={phase === "burst"} candlesLit={false} />
                </div>
              </div>
            )}

            {/* ── Quote storyline ── */}
            {phase === "quotes" && (
              <div className="flex flex-col items-center gap-8">
                <div className="animate-cake-glow">
                  <CakeSVG cake={cake} split={true} candlesLit={false} />
                </div>
                {quoteIndex >= 0 && (
                  <div className="text-center min-h-[80px]">
                    {quotes.map((q, i) => (
                      <div
                        key={i}
                        className={`transition - opacity duration - 700 ${i === quoteIndex ? "opacity-100" : "opacity-0 absolute inset-x-0"} `}
                      >
                        {i === quoteIndex && (
                          <p className={`text - lg sm: text - xl md: text - 2xl font - display font - bold px - 4 ${i === quotes.length - 1
                            ? "bg-gradient-to-r from-[hsl(var(--birthday-pink))] via-[hsl(var(--birthday-gold))] to-[hsl(var(--birthday-sky))] bg-clip-text text-transparent animate-glow-pulse"
                            : "text-foreground/90"
                            } `}>
                            <KineticText text={q.text} animation={q.animation} delay={200} />
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Close / skip button ── */}
            {(phase === "quotes" && quoteIndex >= quotes.length - 1) && (
              <button
                onClick={() => setPhase("select")}
                className="mt-8 px-6 py-3 rounded-full text-sm font-semibold text-muted-foreground border border-border/40 hover:bg-card/50 transition-all duration-300"
              >
                ✕ Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Inline section: cake selection ── */}
      <section className="relative z-20 py-16 sm:py-20 md:py-24 px-4 overflow-hidden">
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[hsl(var(--birthday-gold))] to-[hsl(var(--birthday-pink))] bg-clip-text text-transparent">
          🎂 Choose Your Cake
        </h3>
        <p className="text-muted-foreground text-center mb-8 sm:mb-12 text-sm sm:text-base">
          Pick your favorite to begin the celebration
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-xl mx-auto">
          {CAKE_OPTIONS.map((c, i) => (
            <CakeCard key={c.id} cake={c} index={i} onSelect={() => handleSelectCake(c)} />
          ))}
        </div>
      </section>
    </>
  );
};
