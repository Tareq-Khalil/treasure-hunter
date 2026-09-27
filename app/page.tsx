"use client";
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cinzel, Zen_Maru_Gothic } from 'next/font/google';
import { Lara, Sieg, Roxy} from "./characters";
import "./home.css";
const title = Cinzel({ subsets: ["latin"], weight: ["900"], variable: "--font-title" });
const body = Zen_Maru_Gothic({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-body" });
const rnd = (i: number, s: number) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return +(x - Math.floor(x)).toFixed(3);
};
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const WAVE = "M0 60 Q 100 10 200 60 T 400 60 T 600 60 T 800 60 T 1000 60 T 1200 60 T 1400 60 T 1600 60 V200 H0Z";
export default function Home() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const moonX = useTransform(sx, (v) => v * -18);
  const moonY = useTransform(sy, (v) => v * -12);
  const shipX = useTransform(sx, (v) => v * 26);
  const kanjiX = useTransform(sx, (v) => v * 40);
  const charX = useTransform(sx, (v) => v * -16);
  const art = { girl: undefined as string | undefined, boy: undefined as string | undefined, fox: undefined as string | undefined };
  return(
    <main 
      className={`th ${title.variable} ${body.variable}`}
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth -0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="th-layer" aria-hidden>
        <div className="th-rays" />
        {range(70).map((i) => (
          <span key={i} className="th-star" style={{ left: `${rnd(i, 1) * 100}%`, top: `${rnd(i, 2) * 60}%`, width: 1 + rnd(i, 3) * 2.5, height: 1 + rnd(i, 3) * 2.5, ["--d" as string]: `${2 + rnd(i, 4) * 4}s`, ["--l" as string]: `${-rnd(i, 5) * 6}s` }} />
        ))}
        {range(3).map((i) => (
          <span key={i} className="th-shoot" style={{ left: `${40 + i * 22}%`, top: `${4 + i * 9}%`, ["--l" as string]: `${i * 2.4}s` }} />
        ))}
        <motion.div className="th-moon" style={{ x: moonX, y: moonY }} />
        {range(5).map((i) => (
          <span key={i} className="th-cloud" style={{ top: `${10 + i * 11}%`, width: 160 + rnd(i, 6) * 200, ["--d" as string]: `${60 + i * 15}s`, ["--l" as string]: `${-i * 14}s` }} />
        ))}
        <svg className="th-compass" viewBox="0 0 200 200" fill="none" stroke="#ffd36e" strokeWidth="0.8">
          <circle cx="100" cy="100" r="96" /><circle cx="100" cy="100" r="78" strokeDasharray="2 5" /><circle cx="100" cy="100" r="40" />
          <path d="M100 4 L112 100 L100 196 L88 100Z" fill="rgba(255,143,177,.35)" />
          <path d="M4 100 L100 88 L196 100 L100 112Z" fill="rgba(127,231,255,.25)" />
          {range(24).map((i) => <line key={i} x1="100" y1="6" x2="100" y2={i % 6 === 0 ? 20 : 12} transform={`rotate(${i * 15} 100 100)`} />)}
        </svg>
        <motion.div className="th-kanji" style={{ x: kanjiX }}>宝</motion.div>
      </div>
      {range(24).map((i) => (
        <span key={i} className="th-petal" aria-hidden style={{ left: `${rnd(i, 7) * 100}%`, ["--d" as string]: `${8 + rnd(i, 8) * 8}s`, ["--l" as string]: `${-rnd(i, 9) * 14}s` }} />
      ))}
      {range(18).map((i) => (
        <span key={i} className="th-spark" aria-hidden style={{ left: `${rnd(i, 10) * 100}%`, top: `${30 + rnd(i, 11) * 55}%`, ["--d" as string]: `${3 + rnd(i, 12) * 4}s`, ["--l" as string]: `${-rnd(i, 13) * 5}s` }} />
      ))}
      {[["8%", "24%"], ["78%", "48%"], ["55%", "68%"]].map(([l, t], i) => (
        <span key={i} className="th-lantern" aria-hidden style={{ left: l, top: t, ["--d" as string]: `${5 + i}s`, ["--l" as string]: `${-i * 2}s` }} />
      ))}
      <motion.svg className="th-ship" aria-hidden viewBox="0 0 200 180" style={{ x: shipX }} animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M100 8 V120" stroke="#0a0e2e" strokeWidth="4" />
        <path d="M100 14 Q160 50 100 100Z" fill="#ffe9f1" /><path d="M96 24 Q50 55 96 100Z" fill="#ffb3cb" />
        <path d="M20 120 H180 Q160 160 120 164 H80 Q40 160 20 120Z" fill="#0a0e2e" stroke="#ffd36e" strokeWidth="2" />
        <path d="M100 8 L128 16 L100 24Z" fill="#d1495b" />
      </motion.svg>
      <motion.div className="th-char th-girl" style={{ x: charX }} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, type:"spring", stiffness: 70 }}>
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
          <motion.div className="th-bubble" initial={{ scale: 0 }} animate={{ scale: [0, 1, 1, 0] }}transition={{ delay: 2.4, duration: 5, repeat: Infinity, repeatDelay: 4 }}>Ready for the hunt?!</motion.div>
          <Lara src={art.girl} />
        </motion.div>
      </motion.div>
      <motion.div className="th-char th-boy" style={{ x: charX }} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, type: "spring", stiffness: 70}}>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
          <Sieg src={art.boy} />
        </motion.div>
      </motion.div>
      <motion.div className="th-char th-fox" animate={{ y: [0, -22, 0], x: [0, 18, 0], rotate: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <Roxy src={art.fox} />
      </motion.div>
      <div className="th-sea" aria-hidden>
        {[["#3a2f8f", 0.55, "26s"], ["#1e3a8a", 0.75, "18s"], ["#0a1240", 1, "12s"]].map(([c, o, d], i) => (
          <svg key={i} className="th-wave" viewBox="0 0 1600 200" preserveAspectRatio="none" style={{ ["--d" as string]: d, opacity: o as number, translate: `0 ${i * 14}px` }}>
            <path d={WAVE} fill={c as string} />
          </svg>
        ))}
      </div>
      <div className="th-content">
        <motion.span className="th-badge" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>宝探し · An Expedition Archive</motion.span>
        <motion.h1 className="th-title" initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.1, ease: "easeOut" }}>
          Treasure<br />Hunter
        </motion.h1>
        <motion.p className="th-tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}>
          &ldquo;The treasure was never buried.&rdquo;
        </motion.p>
        <motion.div className="th-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
          <Link href="/expedition" className="th-btn">Start New Expedition</Link>
          <Link href="/auth" className="th-btn alt">Sign In &amp; Sync Progress</Link>
        </motion.div>
        <div className="th-feats">
          <div className="th-feat"><b>Follow the clues</b>Every chapter hides a secret.</div>
          <div className="th-feat"><b>Unbury the truth</b>Collect what the archive forgot.</div>
          <div className="th-feat"><b>Keep your progress</b>Sign in to sync across devices.</div>
        </div>
      </div>
    </main>
  );
}
