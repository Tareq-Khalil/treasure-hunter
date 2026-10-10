'use client';
import React from 'react';
import Image from 'next/image';
import {CHARACTERS} from '@/lib/storyData';
import {CharacterId} from '@/types/game';
interface AnimePortraitProps{
    characterId:CharacterId;
    expression?:'neutral'|'shocked'|'determined'|'pensive';
}
export const AnimePortrait:React.FC<AnimePortraitProps>=({characterId, expression='neutral'})=>{
    const char=CHARACTERS[characterId];
    if (!char) return null;
    return(
        <div className="xp-sprite" data-expression={expression}>
            <Image src={char.portraitUrl} alt={char.name} fill priority sizes="(max-width:700px) 48vw, 260px" className="xp-sprite-img"/>
        </div>
    )
}