'use client';
import React from "react";
import { LOCATIONS } from "@/lib/storyData";
import { soundFx } from "@/lib/audio";
interface ArchipelagoMapProps {
    unlockedLocations: string[];
    currentLocationId: string;
    onSelectLocation: (id: string) => void;
}
const W = 800;
const H = 480;
const LABEL_SIDE: Record<string, 'above' | 'below'> = {
    abandoned_dock: 'below',
    observatory: 'below',
    sunken_vault: 'below',
};
const rnd = (i: number, s: number) => {
    const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
    return x - Math.floor(x);
};
const WAVES = Array.from({ length: 70 }, (_, i) => ({ x: 40 + rnd(i, 1) * 710, y: 44 + rnd(i, 2) * 400 }))
    .filter(({ x, y }) =>
        !(x > 105 && x < 280 && y > 295 && y < 395) &&
        !(x > 325 && x < 445 && y > 130 && y < 225) &&
        !(x > 545 && x < 790 && y > 215 && y < 365) &&
        !(x > 620 && y < 140) &&
        !(x < 330 && y < 100))
    .slice(0, 30);
const CLIFF = [[572,276],[582,262],[596,254],[610,250],[626,246],[642,240],[658,238],[674,240],[690,250],[704,262],[722,268],[740,278]];
const pos = (id: string) => {
    const loc = LOCATIONS.find((l) => l.id === id);
    return loc ? { x: (loc.coordinates.x / 100) * W, y: (loc.coordinates.y / 100) * H } : { x: 0, y: 0 };
};
function Mark({ state }: { state: 'locked' | 'open' | 'here' }) {
    return (
        <svg className="xp-mark" viewBox="0 0 34 34" aria-hidden>
            {state === 'locked' ? (
                <>
                    <circle cx="17" cy="17" r="13" fill="none" stroke="#6f776a" strokeWidth="1.8" strokeDasharray="2 5" strokeLinecap="round" />
                    <text x="17" y="24" textAnchor="middle" fontSize="20" fill="#6f776a" style={{ fontFamily: 'var(--f-pencil)' }}>?</text>
                </>
            ) : (
                <>
                    <path d="M9 9 L25 25 M25 8 L9 26" stroke="#23282b" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                    {state === 'here' && (
                        <path d="M17 2.5 C27 2 32.5 10 31 18 C29.5 28 21 32.5 13 30.5 C5 28.5 1.5 20 4 12 C6 6 12 3 19 3 C24 3 28.5 5 29.5 8.5" fill="none" stroke="#5a3e8c" strokeWidth="2.3" strokeLinecap="round" />
                    )}
                </>
            )}
        </svg>
    );
}
export const ArchipelagoMap: React.FC<ArchipelagoMapProps> = ({
    unlockedLocations,
    currentLocationId,
    onSelectLocation,
}) => {
    const here = pos(currentLocationId);
    const dock = pos('abandoned_dock');
    const tower = pos('observatory');
    const vault = pos('sunken_vault');
    const towerOpen = unlockedLocations.includes('observatory');
    const vaultOpen = unlockedLocations.includes('sunken_vault');
    const legOne = `M${dock.x} ${dock.y} C 262 300, 300 220, ${tower.x} ${tower.y}`;
    const legTwo = `M${tower.x} ${tower.y} C 470 150, 560 200, ${vault.x} ${vault.y}`;
    return (
        <div className="xp-chart-scroll">
            <div className="xp-chart-lift xp-lift">
                <span className="xp-tape a" aria-hidden />
                <span className="xp-tape b" aria-hidden />
                <div className="xp-chart">
                    <svg className="xp-chart-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Hand-drawn chart of the Asura shoals with three marked places">
                        <defs>
                            <filter id="xp-wobble" x="-2%" y="-2%" width="104%" height="104%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="n" />
                                <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
                            </filter>
                        </defs>
                        <g filter="url(#xp-wobble)" fill="none" stroke="#23282b">
                            {/* border and graticule: 40 units = 1 degree of latitude */}
                            <rect x="9" y="9" width="782" height="462" strokeWidth="2.2" />
                            <rect x="15" y="15" width="770" height="450" strokeWidth="0.8" />
                            {Array.from({ length: 10 }, (_, k) => (
                                <line key={`h${k}`} x1="15" x2="785" y1={48 + k * 40} y2={48 + k * 40} strokeWidth="0.5" opacity="0.22" />
                            ))}
                            {Array.from({ length: 9 }, (_, k) => (
                                <line key={`v${k}`} y1="15" y2="465" x1={80 + k * 80} x2={80 + k * 80} strokeWidth="0.5" opacity="0.22" />
                            ))}
                        </g>
                        {Array.from({ length: 10 }, (_, k) => (
                            <text key={`t${k}`} x="22" y={52 + k * 40} fontSize="12" fontStyle="italic" fill="#4d5356" style={{ fontFamily: 'var(--f-print)' }}>
                                {21 - k}°
                            </text>
                        ))}
                        <g fill="#a9bdbb" opacity="0.7" filter="url(#xp-wobble)">
                            <path d="M96 352 C104 304 150 288 176 296 C204 280 246 288 258 322 C282 330 292 356 270 384 C240 402 186 404 160 396 C120 400 90 382 96 352Z" />
                            <path d="M324 184 C328 140 370 126 396 132 C432 126 452 150 444 190 C436 218 396 228 366 224 C336 220 322 208 324 184Z" />
                            <path d="M540 304 C546 262 580 236 618 232 C644 214 690 218 722 244 C762 252 792 280 796 318 C772 358 712 366 664 362 C612 370 548 350 540 304Z" />
                        </g>
                        <g stroke="#4d5356" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round">
                            {WAVES.map((w, i) => (
                                <path key={i} d={`M${w.x.toFixed(0)} ${w.y.toFixed(0)} q4 -4 8 0 t8 0`} />
                            ))}
                        </g>
                        <g fill="#e7e1c2" stroke="#23282b" strokeWidth="1.7" strokeLinejoin="round" filter="url(#xp-wobble)">
                            <path d="M120 352 C128 322 150 312 172 318 C190 300 222 306 232 330 C250 336 262 352 248 366 C228 380 190 378 168 372 C140 376 118 368 120 352Z" />
                            <path d="M345 182 C350 160 370 150 392 154 C414 150 430 166 424 186 C418 200 392 206 370 202 C354 200 344 194 345 182Z" />
                            <path d="M560 300 C566 270 590 252 618 250 C640 236 676 240 700 262 C730 270 760 290 770 318 C750 344 700 350 660 346 C620 352 574 336 560 300Z" />
                        </g>
                        <g stroke="#23282b" strokeWidth="1.2" fill="none" strokeLinecap="round" filter="url(#xp-wobble)">
                            {CLIFF.map(([x, y], i) => <path key={i} d={`M${x} ${y} l-3 -9`} />)}
                            <path d="M402 178 L406 152 L416 152 L420 178" fill="#e7e1c2" />
                            <circle cx="411" cy="146" r="6" />
                            <path d="M405 146 H417 M411 140 V152" strokeWidth="0.8" />
                            <path d="M196 344 v14 M204 344 v14 M212 344 v14 M196 346 H212" />
                        </g>
                        <path d={legOne} fill="none" stroke={towerOpen ? '#5a3e8c' : '#6f776a'} strokeWidth={towerOpen ? 2.4 : 1.4} strokeDasharray={towerOpen ? '9 7' : '2 7'} strokeLinecap="round" opacity={towerOpen ? 0.9 : 0.55} />
                        <path d={legTwo} fill="none" stroke={vaultOpen ? '#5a3e8c' : '#6f776a'} strokeWidth={vaultOpen ? 2.4 : 1.4} strokeDasharray={vaultOpen ? '9 7' : '2 7'} strokeLinecap="round" opacity={vaultOpen ? 0.9 : 0.55} />
                        <g transform="translate(704 84)" filter="url(#xp-wobble)" stroke="#23282b" strokeWidth="1.2" fill="none">
                            <circle r="30" />
                            <circle r="22" strokeDasharray="2 4" />
                            <path d="M0 -44 L7 -7 L44 0 L7 7 L0 44 L-7 7 L-44 0 L-7 -7Z" fill="#e7e1c2" />
                            <path d="M0 -44 L0 0 L-7 -7Z" fill="#23282b" />
                            <text x="0" y="-50" textAnchor="middle" fontSize="19" fill="#23282b" stroke="none" style={{ fontFamily: 'var(--f-print)' }}>N</text>
                        </g>
                        <text x="66" y="62" fontSize="24" fontStyle="italic" fill="#23282b" style={{ fontFamily: 'var(--f-print)' }}>The Asura Shoals</text>
                        <text x="68" y="84" fontSize="21" fill="#5a3e8c" style={{ fontFamily: 'var(--f-pencil)' }}>copied from the 1892 survey, depths unchecked</text>
                        <g className="xp-ship" style={{ transform: `translate(${here.x - 52}px, ${here.y + 12}px)` }}>
                            <g stroke="#23282b" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
                                <path d="M-15 0 H15 Q11 9 0 10 H-7 Q-13 8 -15 0Z" fill="#c9c3a4" />
                                <path d="M0 0 V-28" fill="none" />
                                <path d="M2 -26 Q17 -13 2 -3Z" fill="#f2efe0" />
                                <path d="M-2 -23 Q-13 -13 -2 -5Z" fill="#f2efe0" />
                            </g>
                        </g>
                    </svg>
                    {LOCATIONS.map((location) => {
                        const isUnlocked = unlockedLocations.includes(location.id);
                        const isHere = currentLocationId === location.id;
                        const side = LABEL_SIDE[location.id] ?? 'below';
                        return (
                            <button
                                key={location.id}
                                type="button"
                                disabled={!isUnlocked}
                                aria-label={isUnlocked ? `${location.name}, ${location.subtitle}` : 'A place you have not charted yet'}
                                aria-current={isHere ? 'location' : undefined}
                                className={`xp-loc${isUnlocked ? '' : ' locked'}`}
                                style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
                                onClick={() => {
                                    soundFx.playClick();
                                    onSelectLocation(location.id);
                                }}>
                                <Mark state={!isUnlocked ? 'locked' : isHere ? 'here' : 'open'} />
                                <span className={`xp-lab ${side}`}>
                                    {isUnlocked ? (
                                        <>
                                            <b>{location.name}</b>
                                            <i>{location.subtitle}</i>
                                        </>
                                    ) : (
                                        <i>not charted yet</i>
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};