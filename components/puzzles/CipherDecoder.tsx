'use client';
import React,{useState,useEffect} from 'react';
import {soundFx} from '@/lib/audio';
import { X } from 'lucide-react';
interface CipherDecoderProps{
    onSolve:()=>void;
}
const SLOTS: { name: string; digits: string; points: [number, number][]; lines: [number, number][] }[] = [
    { name: 'the Swan',    digits: '7419', points: [[20,4],[20,36],[8,15],[32,15],[20,15]], lines: [[0,4],[4,1],[2,4],[4,3]] },
    { name: 'the Lyre',    digits: '2860', points: [[8,10],[22,8],[14,22],[28,24],[18,34]], lines: [[0,1],[1,3],[3,2],[2,0],[2,4]] },
    { name: 'the Queen',   digits: '5307', points: [[4,28],[12,10],[20,24],[28,8],[36,26]], lines: [[0,1],[1,2],[2,3],[3,4]] },
    { name: 'the Plough',  digits: '9142', points: [[4,12],[12,14],[20,18],[28,22],[36,14],[34,30],[24,30]], lines: [[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[6,3]] },
    { name: 'the Hunter',  digits: '1685', points: [[12,4],[28,6],[16,20],[20,20],[24,20],[10,36],[30,36]], lines: [[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]] },
    { name: 'the Eagle',   digits: '3724', points: [[20,6],[20,18],[10,20],[30,20],[20,34]], lines: [[0,1],[2,1],[1,3],[1,4]] },
    { name: 'the Dolphin', digits: '8051', points: [[10,12],[18,10],[20,18],[12,20],[28,26]], lines: [[0,1],[1,2],[2,3],[3,0],[2,4]] },
    { name: 'the Arrow',   digits: '6498', points: [[6,30],[34,10],[26,12],[32,18]], lines: [[0,1],[1,2],[1,3]] },
];
const KEY = '7419';
export const CipherDecoder:React.FC<CipherDecoderProps>=({onSolve})=>{
    const [step, setStep] = useState(3);
    const [code, setCode] = useState('');
    const [wrong,setWrong] = useState(false);
    const top = (((-step) % SLOTS.length) + SLOTS.length) %SLOTS.length;
    const reading = SLOTS[top].digits.split('').join(' ');
    useEffect(()=>{
        if (!wrong) return;
        const t= setTimeout(()=>setWrong(false),1400);
        return () => clearTimeout(t);
    },[wrong]);
    const turn = (dir:1|-1)=>{
        soundFx.playClick();
        setStep((s)=>s+dir);
    };
    const submit = (e:React.FormEvent)=>{
        e.preventDefault();
        if (code === KEY){
            soundFx.playSuccess();
            onSolve();
        }else{
            setWrong(true);
        }
    };
    return (
        <div className="xp-bench">
            <h3 className="xp-bench-h">Shirone Astrolabe Cipher Decoder</h3>
            <p className="xp-bench-p">Turn the ring, read the slot, type the four numbers.</p>
            <div className="xp-dial-wrap">
                <svg className="xp-dial" viewBox="0 0 200 200" role="img" aria-label={`Stone dial with eight constellations. Under the marker: ${SLOTS[top].name}.`}>
                    <defs>
                        <radialGradient id="xp-stone" cx="40%" cy="35%" r="75%">
                            <stop offset="0" stopColor="#8a9084"/>
                            <stop offset="1" stopColor="#59605a"/>
                        </radialGradient>
                    </defs>
                    <circle cx="100" cy="100" r="98" fill="url(#xp-stone)" stroke="#2a2f2b" strokeWidth="2"/>
                    <g className="xp-ring" style={{ transform:`rotate{${step * 45}deg`}}>
                        <circle cx="100" cy="100" r="73" fill="none" stroke="#2a2f2b" strokeWidth="1.4"/>
                        <circle cx="100" cy="100" r="30" fill="#4b524c" stroke="#2a2f2b" strokeWidth="1.4"/>
                        {SLOTS.map((s,i)=>(
                            <g key={s.name} transform={`rotate(${i*45} 100 100)`}>
                                <line x1="100" y1="27" x2="100" y2="12" stroke="#2a2f2b" strokeWidth="1" opacity="0.5" transform="rotate(22.5 100 100)"/>
                                <g transform="translate(82 34) scale(0.9)" stroke="#20241f" strokeWidth="1.3" strokeLinecap="round" fill="none">
                                    {s.lines.map(([a,b],k)=>(
                                        <path key={k} d={`M${s.points[a][0]} ${s.points[a][1]} L${s.points[b][0]} ${s.points[b][1]}`}/>
                                    ))}
                                    {s.points.map(([x,y],k)=>(
                                        <circle key={k} cx={x} cy={y} r="2" fill="#20241f" stroke="none"/>
                                    ))}
                                </g>
                                <text x="100" y="21" textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#1c201c" style={{fontFamily:'var(--f-print)'}}>
                                    {s.name}
                                </text>
                            </g>
                        ))}
                    </g>
                    <path d="M92 0 L108 0 L100 11Z" fill="#5a3e8c" stroke="2c1d4a" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                <div className="xp-slot" role="status" aria-live="polite" aria-label={`The slot reads ${SLOTS[top].digits.split('').join(' ')}`}>
                    {reading}
                </div>
                <div className="xp-turns">
                    <button type="button" className="xp-btn quiet" onClick={()=> turn(-1)}>Turn left</button>
                    <button type="button" className="xp-btn quiet" onClick={()=> turn(1)}>Turn right</button>
                </div>
                <form className="xp-codeform" onSubmit={submit}>
                    <label className="sr-only" htmlFor="xp-code">Four-digit code</label>
                    <input id="xp-code" className={`xp-input${wrong ? ' bad': ''}`} inputMode="numeric" autoComplete="off" maxLength={4} value={code} placeholder="0000" onChange={(e)=> setCode(e.target.value.replace(/\D/g, '').slice(0,4))}/>
                    <button type="submit" className="xp-btn">Try this code</button>
                </form>
                <p className="xp-err" role="status">{wrong ?'Nothing moved. Check what the slot says under the Swan.':''}</p>
            </div>
        </div>
    );
};