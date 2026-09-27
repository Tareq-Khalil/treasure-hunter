'use client';
import React, { useState } from 'react';
import { CLUES } from '@/lib/storyData';
import { soundFx } from '@/lib/audio';
interface ExpeditionCodexProps {
    unlockedClues: string[];
    completionPercentage: number;
}
export const ExpeditionCodex: React.FC<ExpeditionCodexProps> = ({
    unlockedClues,
    completionPercentage,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
              onClick={() => {
                soundFx.playClick();
                setIsOpen(!isOpen)
              }}
              className="fixed top-6 right-6 z-50 px-4 py-2.5 bg-nautical-950 border border-gold-400/60 rounded-full text-gold-300 font-serif text-xs font-bold uppercase tracking-widest shadow-2xl hover:bg-gold-500 hover:text-nautical-950 transition-all flex items-center gap-2">
                    Expedition Codex
              </button>
              <div
                className={`fixed top-0 right-0 h-full w-80 bg-nautical-950/95 border border-gold-500/40 backdrop-blur-xl z-40 p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className="text-xl font-serif text-gold-300 border-b border-gold-500/30 pb-3 mb-6">
                    Archival Codex
                </h2>
                <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-xs font-mono text-parchment/70">
                        <span>Secrets Uncovered</span>
                        <span className="text-gold-400 font-bold">
                            {completionPercentage}%
                        </span>
                    </div>
                    <div className="w-full bg-nautical-900 rounded-full h-2 border border-nautical-700 overflow-hidden">
                        <div 
                            className="bg-gold-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${completionPercentage}%` }}
                            />
                    </div>
                </div>
                <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                    <h3 className="text-xs uppercase tracking-widest font-mono text-gold-400/80">
                         Recovered Clues
                    </h3>
                    {unlockedClues.length === 0 ? (
                        <p className="text-xs text-parchment/40 italic">
                            No clues uncovered yet. Explore locations and inspect artifacts.
                        </p>
                    ) : (
                        unlockedClues.map((clueId) => {
                            const clue = CLUES[clueId];
                            if (!clue) return null;
                            return (
                                <div
                                    key={clue.id}
                                    className="p-3 bg-nautical-900/70 border border-gold-500/20 rounded-lg space-y-1">
                                    <p className="text-xs font-bold text-gold-300">
                                        {clue.title}
                                    </p>
                                    <p className="text-[11px] text-parchment/70 leading-snug">
                                        {clue.description}
                                    </p>
                                    <p className="text-[9px] text-gold-500/70 font-mono uppercase">
                                        Source: {clue.foundAt}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};