'use client';
import React from "react";
import { LOCATIONS } from "@/lib/storyData";
import { soundFx } from "@/lib/audio";
import { Lock, MapPin } from "lucide-react";
interface ArchipelagoMapProps {
    unlockedLocations: string[];
    currentLocationId: string;
    onSelectLocation: (id: string) => void;
}
export const ArchipelagoMap: React.FC<ArchipelagoMapProps> = ({
    unlockedLocations,
    currentLocationId,
    onSelectLocation,
}) => {
    return (
        <div className="relative w-full max-w-4xl mx-auto h-80 md:h-96 rounded-2xl bg-slate-950 border-2 border-amber-500/40 shadow-2xl overflow-hidden nautical-vignette p-4">
            <div className="absolute top-4 right-4 opacity-20 pointer-events-none font-serif text-[10px] text-amber-300 text-center">
                <div className="w-16 h-16 rounded-full border border-amber-400 flex items-center justify center">
                    N
                </div>
            </div>
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-amber-400">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"/>
            </svg>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                    d="M 180 250 L 380 130 L 620 200" 
                    fill="none"
                    stroke="rgba(212, 175, 55,0.3"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                />
            </svg>
            {LOCATIONS.map((location) => {
                const isUnlocked = unlockedLocations.includes(location.id);
                const isSelected = currentLocationId === location.id;
                return (
                    <div
                        key={location.id}
                        style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%`}}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                        <button
                            disabled={!isUnlocked}
                            onClick={() => {
                                soundFx.playClick();
                                onSelectLocation(location.id);
                            }}
                            className={`group relative flex flex-col items-center transition-transform duration-300 ${
                                isUnlocked ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-60'
                            }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                    isSelected
                                    ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-[0_0_20px_rgba(250,204, 21,0.8)] animate-pulse'
                                    :isUnlocked
                                    ? 'bg-slate-900 border-amber-500/70 text-amber-400 hover:border-amber-300'
                                    : 'bg-slate-950 border-slate-700 text-slate-600'
                                }`}
                            >
                                {isUnlocked ? <MapPin size={18} /> : <Lock size={16} />}
                            </div>
                            <div className="absolute top-12 whitespace-nowrap bg-slate-950/90 border-amber-500/30 backdrop-blur-md px-3 py-1 rounded-md text-center shadow-lg pointer-events-none">
                                <p className="text-xs font-serif font-bold text-amber-300">{location.name}</p>
                                <p className="text-[10px] text-slate-400">{location.subtitle}</p>
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};