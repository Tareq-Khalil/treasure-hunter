'use client';
import React, { useState, useEffect } from 'react';
import { CLUES } from '@/lib/storyData';
import { soundFx } from '@/lib/audio';
interface ExpeditionCodexProps {
    unlockedClues: string[];
    solved: number;
    total: number;
}
const TILTS = ['-0.6deg','0.5deg','-0.3deg','0.7deg'];
export const ExpeditionCodex: React.FC<ExpeditionCodexProps> = ({unlockedClues,solved,total}) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(()=>{
        if (!isOpen) return;
        const onKey=(e:KeyboardEvent)=>{
            if(e.key == 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen]);
    const toggle=()=>{
        soundFx.playClick();
        setIsOpen((o)=>!o);
    }
    return (
        <>
            <button
                type="button"
                className='xp-nbtn'
                aria-expanded={isOpen}
                aria-controls='xp=notbook'
                onClick={toggle}>
               Notebook
            </button>
            {isOpen && <div className="xp-scrim" onClick={()=>setIsOpen(false)} aria-hidden/>}
            <aside id="xp-notebook" className="xp-nb" data-open={isOpen} aria-label="Notebook" aria-hidden={!isOpen}>
                <div className="xp-nb-top">
                    <h2>Noteook</h2>
                    <button type="button" className="xp-nb-close" onClick={()=> setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>close</button>
                </div>
                <p className="xp-tally">
                    <span> Puzzles solved</span>
                    {Array.from({length:total},(_,i)=>(
                        <span key={i} className={`xp-box${i < solved ? 'done' : ''}`} aria-hidden/>
                    ))}
                    <span className="sr-only">{solved} of {total}</span>
                </p>
                {unlockedClues.length === 0 ?(
                    <p className="xp-empty">Nothing written down yet.</p>
                ):(
                    unlockedClues.map((clueId,i)=>{
                        const clue = CLUES[clueId];
                        if (!clue) return null;
                        return (
                            <article key={clue.id} className="xp-ent" style={{['--tilt'as string]:TILTS[i%TILTS.length]}}>
                                <h3>{clue.title}</h3>
                                <p>{clue.description}</p>
                                <small>{clue.foundAt}</small>
                            </article>
                        );
                    })
                )}
            </aside>
        </>
    );
};