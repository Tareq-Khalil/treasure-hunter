'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { soundFx } from '@/lib/audio';
interface UVJournalProps {
    onSolve: () => void;
}
const BEAM=125;
const STEP=28;
function Entry(){
    return(
        <div className="xp-entry">
            <h4>14th October, 1892</h4>
            <p>
                Lowest tide I have seen on this coast. We buried the crates above the waterline and by morning the sea had combed the beach flat, not a mark left. Pell wants to dig again. I will not  If it is anywhere it is up, above the reef, where the astrolabe keeps its own counsel.
            </p>
        </div>
    );
}
export const UVJournal: React.FC<UVJournalProps> = ({ onSolve}) => {
    const pageRef=useRef<HTMLDivElement>(null);
    const secretRef=useRef<HTMLDivElement>(null);
    const[pos, setPos] = useState({ x: 170, y: 120});
    const [found,setFound] =useState(false);
    const [hint,setHint]=useState(false);
    useEffect(()=>{
        const t=setTimeout(()=>setHint(true),16000);
        return()=>clearTimeout(t);
    },[]);
    const aim =useCallback((x:number,y:number)=>{
        const page = pageRef.current;
        if(!page) return;
        const box=page.getBoundingClientRect();
        const cx = Math.max(0,Math.min(box.width,x));
        const cy = Math.max(0,Math.min(box.height,y));
        setPos({x:cx,y:cy});
        if (found) return;
        const note=secretRef.current;
        if (!note) return;
        const r = note.getBoundingClientRect();
        const noteX = r.left + r.width/2-box.left;
        const noteY = r.top + r.height/2-box.top;
        if (Math.hypot(cx-noteX,cy-noteY)<BEAM*0.55){
            setFound(true);
            soundFx.playSuccess();
        }
    },[found]);
    const fromPointer = (e:React.PointerEvent<HTMLDivElement>)=>{
        const box = e.currentTarget.getBoundingClientRect();
        aim(e.clientX - box.left,e.clientY-box.top);
    };
    const onKeyDown=(e:React.KeyboardEvent<HTMLDivElement>)=>{
        const move: Record<string,[number,number]>={
            ArrowLeft:[-STEP,0],ArrowRight:[STEP,0], ArrowUp:[0,-STEP], ArrowDown:[0,STEP],
        };
        const d=move[e.key];
        if (!d) return;
        e.preventDefault();
        aim(pos.x+d[0],pos.y+d[1]);
    };
    return (
        <div className="xp-bench">
            <h3 className="xp-bench-h">The captain&rsquo;s logbook</h3>
            <p className="xp-bench-p">Move the lamp over the page. Drag a finger on a phone, or use the arrow keys.</p>
            <div className="xp-page-lift xp-lift">
                <div
                    ref={pageRef}
                    className="xp-page"
                    role="group"
                    tabIndex={0}
                    aria-label="Logbook page lit by a UV lamp. Move the lamp with the arrow keys."
                    onPointerDown={fromPointer}
                    onPointerMove={fromPointer}
                    onKeyDown={onKeyDown}
                    style={{['-xx' as string]: `${pos.x}px`,['--y' as string]:`${pos.y}px`}}>
                    <Entry/>
                    <span className="xp-stain" aria-hidden/>
                    <span className="xp-blot" aria-hidden/>
                    <div className="xp-dim" aria-hidden/>
                    <div className="xp-uvlayer" aria-hidden>
                        <Entry />
                        <div ref={secretRef} className="xp-secret">
                            <svg viewBox="0 0 40 40" fill="none" stroke="#c9ecff" strokeWidth="1.6" strokeLinecap="round">
                                <path d="M20 4 V36 M8 15 H32"/>
                                <circle cx="20" cy="4" r="2.2" fill="#c9ecff"/>
                                <circle cx="20" cy="36" r="2.2" fill="#c9ecff"/>
                                <circle cx="8" cy="15" r="2.2" fill="#c9ecff"/>
                                <circle cx="32" cy="15" r="2.2" fill="#c9ecff"/>
                                <circle cx="20" cy="15" r="3" fill="#c9ecff"/>
                            </svg>
                            <span>18° N, under the Swan</span>
                        </div>
                    </div>
                    <div className="xp-haze" aria-hidden/>
                    <span className="xp-torch" aria-hidden/>
                </div>
            </div>
            {found ? (
                <div className="xp-found" role="status">
                    <p>A line in the margin, written in something that only glows.</p>
                    <button type="button" className="xp-btn" onClick={()=>{
                        soundFx.playClick();
                        onSolve();
                    }}>Copy it into the notebook</button>
                </div>
              ):(
                hint && <p className="xp-hint" role="status">Check the empty parts of the page, the margins.</p>
              )}
        </div>
    );
};