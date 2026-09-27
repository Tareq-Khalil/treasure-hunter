'use client';
import React,{useState} from 'react';
import {soundFx} from '@/lib/audio';
interface CipherDecoderProps{
    onSolve:()=>void;
}
export const CipherDecoder:React.FC<CipherDecoderProps>=({onSolve})=>{
    const[rotation,setRotation]=useState(0);
    const[inputCode,setInputCode]=useState('');
    const[error,setError]=useState(false);
    const rotateWheel=()=>{
        soundFx.playClick();
        setRotation(prev=>(prev+45)%360);
    };
    const handleVerify=()=>{
        if (inputCode==='7419'){
            soundFx.playSuccess();
            onSolve();
        }else{
            setError(true);
            setTimeout(()=> setError(false), 1000);
        }
    };
    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto bg-nautical-950/90 border border-gold-500/30 p-6 rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="text-center">
                <h3 className="text-xl font-serif text-gold-300">Shirone Astrolabe Cipher Decoder</h3>
                <p className="text-xs text-parchment/60">Rotate the ancient dial ring to read transposed rune numerical offsets.</p>
            </div>
            <div className="relative w-48 h-48 rounded-full border-4 border-gold-500/50 flex items-center justify-center bg-nautical-900 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <div onClick={rotateWheel} style={{transform:`rotate(${rotation}deg)`}} className="w-40 h-40 rounded-full border-2 border-dashed border-gold-400 flex items-center justify-center cursor-pointer transition-transform duration-500 bg-nautical-950">
                    <span className="text-xs font-mono text-gold-300 tracking-widest font-bold">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-gold-400 text-lg font-bold">▲</span>
                </div>
            </div>
            <div className="w-full space-y-3">
                <input type="text" maxLength={4} value={inputCode} onChange={e => setInputCode(e.target.value)} placeholder="ENTER CODE" className={`w-full text-center py-2.5 bg-nautical-900 border ${error ? 'border-red-500 animate-shake' : 'border-gold-500/40'} rounded-lg text-gold-300 font-mono tracking-widest text-lg focus:outline-none focus:border-gold-400`}/>
                <button onClick={handleVerify} className="w-full py-2.5 bg-gold-500 hover:bg-gold-400 text-nautical-950 font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-md">Decrypt Cipher Key</button>
            </div>
        </div>
    );
};