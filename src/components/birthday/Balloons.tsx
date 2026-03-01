import { useState, useEffect } from "react";

const BALLOON_COLORS = [
  "hsl(330, 85%, 60%)", // pink
  "hsl(270, 60%, 55%)", // purple
  "hsl(45, 100%, 60%)", // gold
  "hsl(200, 80%, 60%)", // sky
  "hsl(15, 85%, 65%)",  // coral
  "hsl(160, 60%, 55%)", // mint
];

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

export const Balloons = ({ count = 20 }: { count?: number }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    setBalloons(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 8,
        size: 35 + Math.random() * 25,
      }))
    );
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-[-100px] animate-balloon-rise"
          style={{
            left: `${b.x}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <svg width={b.size} height={b.size * 1.4} viewBox="0 0 50 70">
            <defs>
              <radialGradient id={`grad-${b.id}`} cx="30%" cy="30%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor={b.color} stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <ellipse cx="25" cy="22" rx="20" ry="22" fill={`url(#grad-${b.id})`} />
            <ellipse cx="25" cy="22" rx="20" ry="22" fill={b.color} opacity="0.4" />
            <polygon points="22,43 25,48 28,43" fill={b.color} opacity="0.8" />
            <path d="M25,48 Q20,55 25,70" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="1" />
          </svg>
        </div>
      ))}
    </div>
  );
};
