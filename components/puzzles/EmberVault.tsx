'use client';
import React, { useState, useRef, useEffect } from 'react';
import { soundFx } from '@/lib/audio';
interface EmberVaultProps {
    onSolve: () => void;
}
const KEY='7419';
export const EmberVault: React.FC<EmberVaultProps> = ({ onSolve }) => {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'ERROR' | 'SUCCESS'>('IDLE');
    const timer = useRef<number | undefined>(undefined);
    const press = (digit: string) => {
        if (status !== 'IDLE'||code.length >=4) return;
        soundFx.playVaultClick();
        const next=code+digit;
        setCode(next);
        if (next.length<4) return;
        if (next ===KEY) {
            setStatus('SUCCESS');
            soundFx.playSuccess();
            timer.current = window.setTimeout(onSolve, 1500);
        } else {
            setStatus('ERROR');
            timer.current=window.setTimeout(() => {
                setCode('');
                setStatus('IDLE');
            }, 1000);
        }
    };
    const clear = ()=>{
        if (status !== 'IDLE') return;
        soundFx.playVaultClick();
        setCode('');
    };
    return (
        <div className="xp-bench">
            <h3 className="xp-bench-h">The black stone</h3>
            <p className="xp-bench-p">Four keys, set into the rock face.</p>
            <div className="xp-vault xp-lift" data-state={status.toLowerCase()}>
                <div className="xp-vdixp" role="status" aria-live="polite" aria-label={`Entered ${code.length} of 4 digits`}>
                    {code.padEnd(4, '·')}
                </div>
                <div className="xp-keys">
                    {['1','2','3','4','5','6','7','8','9'].map((n) => (
                    <button key={n} type="button" className="xp-key" disabled={status !== 'IDLE'} onClick={() => press(n)}>{n}</button>
                    ))}
                    <button type="button" className="xp-key small" disabled={status !=='IDLE'} onClick={clear}>clear</button>
                    <button type="button" className="xp-key" disabled={status !== 'IDLE'} onClick={()=>press('0')}>0</button>
                </div>
            </div>
        </div>
    );
};