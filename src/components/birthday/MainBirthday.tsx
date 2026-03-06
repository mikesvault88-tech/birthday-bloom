import { useState, useEffect } from "react";
import { BIRTHDAY_NAME } from "@/config/birthday";
import { useConfetti } from "./Confetti";
import { Balloons } from "./Balloons";
import { Sparkles } from "./Sparkles";
import { PhotoGallery } from "./PhotoGallery";
import { HeartProgression } from "./HeartProgression";
import { KineticText } from "./KineticText";
import { TypeWriter } from "./TypeWriter";
import { useSoundManager } from "./SoundManager";
import { CakeCutting } from "./CakeCutting";
import { HeartTree } from "./HeartTree";

export const MainBirthday = () => {
  const [visible, setVisible] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [emojis, setEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const { fireConfetti, fireCannon } = useConfetti();
  const { playReveal, playPop, playBoom, setBgVolume } = useSoundManager();

  useEffect(() => {
    setBgVolume(0.4); // Raise volume for the celebration
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => {
      setHeroRevealed(true);
      playBoom();
    }, 600);
    setTimeout(() => {
      setShowName(true);
      playReveal();
    }, 1200);
    setTimeout(() => setShowEmojis(true), 1800);
    setTimeout(() => {
      fireCannon();
      playBoom();
    }, 2000);
  }, [playReveal, playBoom, setBgVolume, fireCannon]);

  const addEmoji = () => {
    playPop();
    const emojiList = ["🎉", "🥳", "💖", "⭐", "🎈", "🎊", "🎁", "🎂", "✨", "💫"];
    const newEmoji = {
      id: Date.now(),
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      x: 20 + Math.random() * 60,
    };
    setEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => setEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id)), 2000);
  };

  return (
    <div
      className={`min-h-screen transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{
        background: "linear-gradient(135deg, hsl(280, 60%, 8%) 0%, hsl(300, 40%, 15%) 30%, hsl(330, 50%, 12%) 60%, hsl(270, 50%, 10%) 100%)",
      }}
    >
      <Balloons count={10} />
      <Sparkles count={12} />

      {emojis.map((e) => (
        <div
          key={e.id}
          className="fixed z-50 text-4xl pointer-events-none"
          style={{ left: `${e.x}%`, bottom: "20%", animation: "emoji-float 2s ease-out forwards" }}
        >
          {e.emoji}
        </div>
      ))}

      {/* Hero Section — staggered reveal */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Full merged heart */}
        <div className={`transition-all duration-1000 ${heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex justify-center mb-4">
            <HeartProgression stage={4} />
          </div>
          <div className="text-7xl md:text-8xl mb-6 animate-cake-glow hover:scale-110 transition-transform cursor-pointer" onClick={addEmoji}>🎂</div>
        </div>

        <h1 className={`font-display text-4xl md:text-7xl lg:text-8xl font-black mb-4 transition-all duration-1000 delay-300 ${heroRevealed ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <span className="bg-gradient-to-r from-[hsl(330,85%,65%)] via-[hsl(45,100%,75%)] to-[hsl(200,80%,70%)] bg-clip-text text-transparent animate-gradient-shift drop-shadow-[0_4px_25px_rgba(255,255,255,0.4)]">
            <TypeWriter text="Happy Birthday" speed={90} delay={500} cursor={false} />
          </span>
        </h1>

        <h2 className={`font-display text-6xl md:text-9xl lg:text-[10rem] font-black text-foreground animate-glow-pulse transition-all duration-1000 ${showName ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <TypeWriter text={`${BIRTHDAY_NAME}!`} speed={120} delay={1200} cursor={false} />
        </h2>

        <div className={`text-4xl md:text-5xl mt-8 space-x-3 transition-all duration-700 ${showEmojis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span>🎈</span><span>🎉</span><span>🎊</span><span>🎁</span><span>🥳</span>
        </div>
      </section>

      {/* Cake Cutting Celebration */}
      <CakeCutting />

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Message Card */}
      <section className="relative z-20 flex justify-center px-4 pb-20">
        <div
          className="max-w-2xl w-full rounded-3xl p-8 md:p-12 backdrop-blur-lg border border-[hsl(330,85%,60%,0.2)] shadow-2xl hover:border-[hsl(330,85%,60%,0.4)] transition-colors duration-500 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(280, 40%, 15%, 0.8), hsl(330, 40%, 12%, 0.8))",
            boxShadow: "0 0 60px hsl(330, 85%, 60%, 0.15), 0 0 120px hsl(270, 60%, 55%, 0.1)",
          }}
        >
          <div className="text-5xl text-center mb-6 animate-bounce">💌</div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[hsl(330,85%,70%)] to-[hsl(45,100%,70%)] bg-clip-text text-transparent drop-shadow-sm">
            <TypeWriter text="A Birthday Message for You" speed={50} cursor={false} />
          </h3>
          <div className="space-y-4 text-center text-lg md:text-xl text-foreground/90 leading-relaxed max-w-full break-words">
            <p><TypeWriter text={`Dear ${BIRTHDAY_NAME},`} speed={45} delay={1500} cursor={false} /></p>
            <p className="min-h-[4rem] sm:min-h-[3rem]"><TypeWriter text="On this special day, I want you to know how truly amazing you are. Your presence lights up every room, and your smile makes the world a brighter place. 🌟" speed={40} delay={3000} cursor={false} /></p>
            <p className="min-h-[4rem] sm:min-h-[3rem]"><TypeWriter text="May this year bring you everything your heart desires — endless laughter, beautiful moments, and dreams come true. ✨" speed={40} delay={8500} cursor={false} /></p>
            <p className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-[hsl(330,85%,60%)] to-[hsl(45,100%,60%)] bg-clip-text text-transparent pt-4 min-h-[3rem]">
              <TypeWriter text="Happy Birthday! 🎉" speed={60} delay={12500} cursor={true} />
            </p>
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section className="relative z-20 px-4 pb-20">
        <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[hsl(200,80%,60%)] to-[hsl(270,60%,55%)] bg-clip-text text-transparent">
          Birthday Wishes ✨
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { emoji: "🌟", wish: "May your dreams take flight and reach the stars!" },
            { emoji: "💖", wish: "Wishing you a year filled with love and happiness!" },
            { emoji: "🎁", wish: "May life surprise you with the most wonderful gifts!" },
            { emoji: "🌈", wish: "Here's to colorful days and magical moments ahead!" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 backdrop-blur-md border border-[hsl(270,60%,55%,0.2)] hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, hsl(280, 40%, 15%, 0.6), hsl(270, 40%, 12%, 0.6))",
              }}
              onClick={addEmoji}
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <p className="text-foreground/90 text-lg">{item.wish}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive buttons */}
      <section className="relative z-20 flex flex-wrap justify-center gap-4 px-4 pb-10">
        <button
          onClick={() => { fireCannon(); addEmoji(); }}
          className="px-8 py-4 rounded-full text-lg font-bold text-white transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: "linear-gradient(135deg, hsl(330, 85%, 55%), hsl(270, 60%, 50%))", boxShadow: "0 0 30px hsl(330, 85%, 55%, 0.4)" }}
        >
          🎊 Confetti Cannon!
        </button>
        <button
          onClick={() => { fireConfetti(); addEmoji(); }}
          className="px-8 py-4 rounded-full text-lg font-bold text-white transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: "linear-gradient(135deg, hsl(45, 100%, 50%), hsl(15, 85%, 55%))", boxShadow: "0 0 30px hsl(45, 100%, 50%, 0.4)" }}
        >
          🎈 Pop Celebration!
        </button>
        <button
          onClick={() => { for (let i = 0; i < 5; i++) setTimeout(addEmoji, i * 200); }}
          className="px-8 py-4 rounded-full text-lg font-bold text-white transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: "linear-gradient(135deg, hsl(200, 80%, 50%), hsl(160, 60%, 45%))", boxShadow: "0 0 30px hsl(200, 80%, 50%, 0.4)" }}
        >
          💫 Send Love!
        </button>
      </section>

      {/* Grand Finale / Heart Tree Section */}
      <section className="relative z-20 flex justify-center px-4 pb-20 pt-10">
        <div className="w-full flex justify-center">
          <HeartTree delay={500} />
        </div>
      </section>

      <footer className="relative z-20 text-center py-12 pb-24 text-muted-foreground bg-gradient-to-t from-black/40 to-transparent">
        <p className="text-xl md:text-2xl drop-shadow-md">
          Made with ❤️ for <span className="font-display font-bold text-foreground text-2xl md:text-3xl bg-gradient-to-r from-[hsl(330,85%,70%)] to-[hsl(45,100%,70%)] bg-clip-text text-transparent">{BIRTHDAY_NAME}</span>
        </p>
        <div className="text-4xl mt-6 space-x-3 drop-shadow-lg">
          <span className="animate-bounce inline-block" style={{ animationDelay: "0ms" }}>🎂</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: "150ms" }}>🎈</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: "300ms" }}>💖</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: "450ms" }}>🎈</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: "600ms" }}>🎂</span>
        </div>
      </footer>
    </div>
  );
};
