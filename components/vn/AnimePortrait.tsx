'use client';
import React from 'react';
import Image from 'next/image';
import {CHARACTERS} from '@/lib/storyData';
import {CharacterId} from '@/types/game';
interface AnimePortraitProps{
    characterId:CharacterId;
    expression?:'neutral'|'shocked'|'determined'|'pensive';
}
export const AnimePortrait:React.FC<AnimePortraitProps>=({characterId, expression})=>{
    const char=CHARACTERS[characterId];
    if (!char) return null;
    return(
        <div className="relative w-64 h-96 transition-all duration-500 transform hover: scale-105">
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 animate-pulse" style={{backgroundColor:char.themeColor}}/>
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gold-400/50 bg-gradient-to-b from-nautical-900/90 to-nautical-950/95 shadow-2xl shadow-black/50">
                <div className="absolute inset-0 bottom-9">
                    <Image src={char.portraitUrl} alt={char.name} fill className="object-contain object-bottom drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"/>
                </div>
                {expression&&(
                <div className="absolute top-3 right-3 bg-slate-950/80 border border-gold-400/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest text-gold-300">
                    {expression}
                </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-nautical-950/85 backdrop-blur-sm border-t border-gold-500/20 py-1.5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">{char.role}</p>
                </div>
            </div>
        </div>
    )
}