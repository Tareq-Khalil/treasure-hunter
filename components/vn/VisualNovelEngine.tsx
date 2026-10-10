'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { STORY_NODES, CHARACTERS } from '@/lib/storyData';
import {DialogueNode} from '@/types/game';
import { AnimePortrait } from './AnimePortrait';
import { soundFx } from '@/lib/audio';
interface VisualNovelEngineProps {
    nodeId: string;
    onChoiceSelect: (nextNodeId: string, unlockClueId?: string, unlockLocationId?: string) => void;
}
const delayAfter = (ch:string) => ('.!?'.includes(ch) ? 230 : ',;:' .includes(ch) ? 110:24);
function DialogueSlip({node, onChoiceSelect}:{node:DialogueNode; onChoiceSelect:VisualNovelEngineProps['onChoiceSelect']}){
    const character=CHARACTERS[node.characterId];
    const [shown,setShown] = useState(0);
    const done= shown >=node.text.length;
    useEffect(()=>{
        if (done) return;
        const prev = shown > 0 ? node.text.charAt(shown-1):'';
        const timer = setTimeout(()=>{
            if (node.text.charAt(shown).trim()) soundFx.playTypewriter();
            setShown(shown+1);
        }, delayAfter(prev));
        return () => clearTimeout(timer);
    },[shown,done,node.text]);
    const hasChoices = !!node.choices && node.choices.length > 0;
    return(
        <div className="xp-slip-lift xp-lift">
            <div className="xp-slip" onClick={()=>setShown(node.text.length)}>
                <div className="xp-who">
                    <span className="xp-name">{character?.name ?? 'Note'}</span>
                    {character && <span className="xp-role">{character.role}</span>}
                </div>
                <p className="xp-line" aria-hidden>
                    {node.text.slice(0,shown)}
                    {!done && <span className="xp-caret"/>}
                </p>
                <p className="sr-only" aria-live="polite">{done ? node.text : ''}</p>
                {done && hasChoices &&(
                    <ul className="xp-choices">
                        {node.choices!.map((choice,idx)=>(
                            <li key={idx}>
                                <button type="button" className="xp-choice" onClick={()=>{soundFx.playClick(); onChoiceSelect(choice.nextNodeId, choice.unlockClueId, choice.unlockLocationId);}}>
                                    {choice.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                {done && !hasChoices && !node.triggerPuzzle && (
                    <div className="xp-end">
                        <span>That&rsquo;s the last pageof the log.</span>
                        <Link href="/" className="xp-back">Back to the title page</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
export const VisualNovelEngine: React.FC<VisualNovelEngineProps> = ({ nodeId, onChoiceSelect }) => {
    const node = STORY_NODES[nodeId];
    if (!node) return null;
    return(
        <section className="xp-scene" aria-label="Story">
            <AnimePortrait key={`p-${nodeId}`} characterId={node.characterId} expression={node.expression}/>
            <DialogueSlip key={nodeId} node={node} onChoiceSelect={onChoiceSelect}/>
        </section>
    );
};