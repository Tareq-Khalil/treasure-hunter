'use client';
import React, { useState, useEffect } from 'react';
import { STORY_NODES, CHARACTERS } from '@/lib/storyData';
import { AnimePortrait } from './AnimePortrait';
import { soundFx } from '@/lib/audio';
interface VisualNovelEngineProps {
    nodeId: string;
    onChoiceSelect: (nextNodeId: string, unlockClueId?: string, unlockLocationId?: string) => void;
}
export const VisualNovelEngine: React.FC<VisualNovelEngineProps> = ({ nodeId, onChoiceSelect }) => {
    const node = STORY_NODES[nodeId];
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    useEffect(() => {
        if(!node) return;
        setDisplayedText('');
        setIsTyping(true);
        let index = 0;
        const timer = setInterval(() => {
            if (index < node.text.length) {
                setDisplayedText(prev => prev + node.text.charAt(index));
                soundFx.playTypewriter();
                index++;
            } else {
                setIsTyping(false);
                clearInterval(timer);
            }
        }, 25);
        return () => clearInterval(timer);
    }, [nodeId, node]);
    if (!node) return null;
    const character = CHARACTERS[node.characterId];
    return (
        <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6 p-4">
            <div className="flex-shrink-0">
                <AnimePortrait characterId={node.characterId} expression={node.expression} />
            </div>
            <div className="flex-1 w-full bg-slate-950/90 border-2 border-amber-500/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative">
                <div
                    className="absolute -top-4 left-6 px-4 py-1 rounded-md font-serif text-sm font-bold shadow-lg border border-amber-400/50"
                    style={{ backgroundColor: character?.themeColor || '#d4af37', color: '#071018' }}
                >
                    {character?.name || 'System Notice'}
                </div>
                <p className="text-amber-100 font-serif text-lg leading-relaxed min-h-[5rem] pt-2">
                    {displayedText}
                    {isTyping && <span className="inline-block w-2 h-5 bg-amber-400 ml-1 animate-ping" />}
                </p>
                {!isTyping && node.choices && node.choices.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {node.choices.map((choice, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    soundFx.playClick();
                                    onChoiceSelect(choice.nextNodeId, choice.unlockClueId, choice.unlockLocationId);
                                }}
                                className="w-full text-left px-4 py-2.5 rounded-lg bg-slate-900/80 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 text-amber-200 hover:text-amber-300 font-medium transition-all duration-200 flex items-center justify-between group"
                            >
                                <span> {choice.text}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity"></span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};