'use client';
import React, {useState,useRef} from 'react';
import {Volume2,VolumeX} from 'lucide-react';
export const AudioController: React.FC=()=>{
    const [isMuted,setIsMuted]=useState(true);
    const audioCtxRef=useRef<AudioContext|null>(null);
    const gainNodeRef=useRef<GainNode|null>(null);
    const startAmbientSound=()=>{
        if (audioCtxRef.current) return;
        const AudioCtx=window.AudioContext||(window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext;
        const ctx=new AudioCtx();
        audioCtxRef.current=ctx;
        const bufferSize=ctx.sampleRate*2;
        const noiseBuffer=ctx.createBuffer(1,bufferSize,ctx.sampleRate);
        const output=noiseBuffer.getChannelData(0);
        let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
        for (let i=0;i<bufferSize;i++){
            const white=Math.random()*2-1;
            b0=0.99886*b0+white*0.0555179;
            b1=0.99332*b1+white*0.0750759;
            b2=0.96900*b2+white*0.1538520;
            b3=0.86650*b3+white*0.3104856;
            b4=0.55000*b4+white*0.5329522;
            b5=-0.7616*b5+white*0.0168980;
            output[i]=b0+b1+b2+b3+b4+b5+b6+white*0.5362;
            output[i]*=0.05;
            b6=white*0.115926;
        }
        const whiteNoise=ctx.createBufferSource();
        whiteNoise.buffer=noiseBuffer;
        whiteNoise.loop=true;
        const filter=ctx.createBiquadFilter();
        filter.type='lowpass';
        filter.frequency.setValueAtTime(300,ctx.currentTime);
        const mainGain=ctx.createGain();
        mainGain.gain.setValueAtTime(0.05,ctx.currentTime);
        gainNodeRef.current=mainGain;
        whiteNoise.connect(filter);
        filter.connect(mainGain);
        mainGain.connect(ctx.destination);
        whiteNoise.start();
    };
    const toggleAudio=() => {
        if (isMuted){
            startAmbientSound();
            if (audioCtxRef.current && audioCtxRef.current.state === 'suspended'){
                audioCtxRef.current.resume();
            }
            if (gainNodeRef.current && audioCtxRef.current){
                gainNodeRef.current.gain.setValueAtTime(0.05,audioCtxRef.current.currentTime);
            }
            setIsMuted(false);
        }else{
            if (gainNodeRef.current && audioCtxRef.current){
                gainNodeRef.current.gain.setValueAtTime(0,audioCtxRef.current.currentTime);
            }
            setIsMuted(true);
        }
    };
    return(
        <button onClick={toggleAudio} title={isMuted ? "Enable Ambient" : "Mute Ambient Audio"} className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-nautical-950/80 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-nautical-950 transition-all shadow-xl backdrop-blur-md">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse"/>}
        </button>
    );
};