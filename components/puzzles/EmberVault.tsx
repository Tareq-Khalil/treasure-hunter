'use client';
import React, { useState } from 'react';
import { soundFx } from '@/lib/audio';
interface EmberVaultProps {
    onSolve: () => void;
}
export const EmberVault: React.FC<EmberVaultProps> = ({ onSolve }) => {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'ERROR' | 'SUCCESS'>('IDLE');
    const handleKeyPress = (num: string) => {
        soundFx.playVaultClick();
        if (code.length < 4) {
            const newCode = code + num;
            setCode(newCode);
            if (newCode.length === 4) {
                if (newCode === '7419') {
                    setStatus('SUCCESS');
                    soundFx.playSuccess();
                    setTimeout(onSolve, 1500);
                } else {
                    setStatus('ERROR');
                    setTimeout(() => {
                        setCode('');
                        setStatus('IDLE');
                    }, 1000);
                }
            }
        }
    };
    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto p-6 bg-nautical-950 border-2 border-gold-600/50 rounded-2xl shadow-2xl shadow-black/50">
            <div className="text-center">
                <h3 className="text-lg font-serif text-gold-400">Ember Monolith Keypad</h3>
                <p className="text-[11px] text-parchment/60">Enter the 4-digit cipher combination</p>
            </div>
            <div className={`w-full h-12 rounded-lg bg-nautical-900 border flex items-center justify-center font-mono text-2xl tracking-widest ${
                status === 'ERROR' ? 'border-red-500 text-red-500' : status === 'SUCCESS' ? 'border-emerald-500 text-emerald-400' : 'border-gold-500/40 text-gold-300'}`}>
                {code.padEnd(4, '•')}
            </div>
            <div className="grid grid-cols-3 gap-3 w-full">
                {['1','2','3','4','5','6','7','8','9'].map(num => (
                    <button
                        key={num}
                        onClick={() => handleKeyPress(num)}
                        className="h-12 rounded-lg bg-nautical-900 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 font-mono text-lg font-bold transition-all active:scale-95 flex items-center justify-center shadow">
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};