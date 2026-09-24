'use client';
import React, { useState, useRef } from 'react';
import { soundFx } from '@/lib/audio';
interface UVJournalProps {
    onSolve: () => void;
}
export const UVJournal: React.FC<UVJournalProps> = ({ onSolve}) => {
    const[mousePos, setMousePos] = useState({ x: -200, y: -200});
    const[foundSecret, setFoundSecret] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
        if (x > 220 && x < 420 && y > 180 && y < 280 && !foundSecret) {
            setFoundSecret(true);
            soundFx.playSuccess();
        }

    };
    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-serif text-amber-300">
                    UV Light Journal Inspector
                </h3>
                <p className="text-xs text-slate-400">
                    Drag your cursor light across the parchment page to reveal hidden phosphor ink notes.
                </p>
            </div>
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="relative w-full h-80 rounded-xl overflow-hidden cursor-crosshair border-2 border-amber-600/40 shadow-2xl bg-[#f1e6d0]"
              >
                <div className="absolute inset-0 p-8 text-amber-950 font-serif leading-relaxed opacity-80 select-none">
                    <p className="font-bold text-lg border-b border-amber-900/20 pb-2 mb-4">
                        Logbook - October 1892
                    </p>
                    <p>
                        The tide was unusually low tonight. The crew buried the crates by the shore, but the tides swept the sands clean.
                    </p>
                    <p className="mt-4">
                        Search high above the reef. The astrolabe knows what the tide conceals.
                    </p>
                </div>
                <div 
                className="absolute inset-0 p-8 text-cyan-300 font-mono bg-slate-950/95 select-none pointer-events-none"
                style={{
                    maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                }}
                >
                    <p className="font-bold text-lg opacity-20 text-slate-500">
                        Logbook - October 1892
                    </p>
                    <div className="absolute top-28 left-48 p-4 border border-cyan-400/60 rounded bg-cyan-950/40 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                        <p className="text-sm font-bold text-cyan-300 animate-pulse">
                            ★ SECRET REVEALED ★
                        </p>
                        <p className="text-xs text-cyan-200 mt-1">
                            Astrolabe coordinates aligned to 18° N Cygnus constellation.
                        </p>
                    </div>
                </div>
              </div>
              {foundSecret && (
                <button
                    onClick={() => {
                        soundFx.playClick();
                        onSolve();
                    }}
                    className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all shadow-lg animate-bounce">
                        Record Clue into Codex ➔
                    </button>
              )}
        </div>
    );
};