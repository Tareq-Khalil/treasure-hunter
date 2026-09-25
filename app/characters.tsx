'use client';
const ink="#0a0e2e",skin="#ffe0cc",gold="#ffd36e";
type Custom={src?:string;alt?:string};
function Eyes({iris,y=112}:{iris:string;y?:number}){
    return(
        <g className="th-eyes">
            {[82,118].map((x)=>(
                <g key={x}>
                    <ellipse cx={x} cy={y} rx="10" ry="13" fill="#fff" stroke={ink} strokeWidth="1.5"/>
                    <ellipse cx={x} cy={y+1} rx="7" ry="10" fill={iris}/>
                    <ellipse cx={x} cy={y+2} rx="3.5" ry="5.5" fill={ink}/>
                    <circle cx={x-3} cy={y-4} r="3" fill="#fff"/>
                    <circle cx={x+3} cy={y+5} r="1.5" fill="#fff"/>
                </g>
            ))}
        </g>
    );
}
function Face({iris}:{iris:string}){
    return(
        <>
            <ellipse cx="100" cy="108" rx="44" ry="42" fill={skin} stroke={ink} strokeWidth="2"/>
            <Eyes iris={iris}/>
            <ellipse cx="68" cy="130" rx="8" ry="4.5" fill="#ff8fb1" opacity=".55"/>
            <ellipse cx="132" cy="130" rx="8" ry="4.5" fill="#ff8fb1" opacity=".55"/>
            <path d="M93 134 Q100 142 107 134" stroke="#c2456b" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        </>
    );
}
function Body({coat,skirt}:{coat:string;skirt:string}){
    return(
        <>
            <path d="M70 168 Q48 210 60 244" stroke={coat} strokeWidth="15" strokeLinecap="round" fill="none"/>
            <path d="M70 152 H130 L142 250 H58Z" fill={coat} stroke={ink} strokeWidth="2"/>
            <path d="M100 152 V250" stroke={gold} strokeWidth="3"/>
            <circle cx="100" cy="190" r="5" fill={gold}/>
            <path d="M58 240 H142 L158 284 H42Z" fill={skirt} stroke={ink} strokeWidth="2"/>
            <rect x="72" y="282" width="16" height="14" rx="4" fill={skin}/>
            <rect x="112" y="282" width="16" height="14" rx="4" fill={skin}/>
            <g className="th-arm">
                <path d="M130 170 Q166 150 172 114" stroke={coat} strokeWidth="15" strokeLinecap="round" fill="none"/>
                <circle cx="172" cy="108" r="10" fill={skin} stroke={ink} strokeWidth="1.5"/>
            </g>
        </>
    );
}
export function Lara({src,alt}:Custom){
    if (src) return <img className="th-char-img" src={src} alt={alt ?? ""}/>;
    return(
        <svg viewBox="0 0 200 300" className="th-char-svg" role="img" aria-label="Anime treasure hunter girl waving">
            <g className="th-sway">
                <path d="M56 100 Q6 150 28 262 Q52 206 64 140Z" fill="#ff8fb1" stroke={ink} strokeWidth="2" />
                <path d="M144 100 Q194 150 172 262 Q148 206 136 140Z" fill="#ff8fb1" stroke={ink} strokeWidth="2"/>
            </g>
            <Body coat="#16276b" skirt="#e0709a"/>
            <Face iris="#7fe7ff"/>
            <path d="M55 102 Q58 56 100 54 Q142 56 145 102 Q128 78 116 98 Q104 70 92 98 Q78 76 55 102Z" fill="#ff8fb1" stroke={ink} strokeWidth="2"/>
            <ellipse cx="100" cy="62" rx="60" ry="12" fill="#8a5a2b" stroke={ink} strokeWidth="2"/>
            <path d="M66 62 Q70 26 100 24 Q130 26 134 62Z" fill="#a8703a" stroke={ink} strokeWidth="2"/>
            <rect x="67" y="50" width="66" height="8" fill={gold}/>
            <circle cx="100" cy="40" r="7" fill="#ff8fb1" stroke={ink} strokeWidth="1.5"/>
        </svg>
    );
}
export function Sieg({ src, alt }: Custom) {
    if (src) return <img className="th-char-img" src={src} alt={alt ?? ""} />;
    return (
        <svg viewBox="0 0 200 300" className="th-char-svg" role="img" aria-label="Anime explorer boy waving">
            <Body coat="#7a2f5f" skirt="#2a2a7a" />
            <path d="M78 150 Q100 176 122 150 L128 168 Q100 190 72 168Z" fill="#d1495b" stroke={ink} strokeWidth="2" className="th-sway"/>
            <Face iris="#ffb347" />
            <path d="M54 104 Q50 50 84 40 L92 22 L104 42 L124 26 L126 48 Q152 56 146 104 Q132 72 116 90 Q102 66 90 90 Q74 70 54 104Z" fill="#3b4cca" stroke={ink} strokeWidth="2" />
            <rect x="58" y="60" width="84" height="12" rx="6" fill="#8a5a2b" stroke={ink} strokeWidth="2" />
            <circle cx="80" cy="66" r="12" fill={gold} stroke={ink} strokeWidth="2" /><circle cx="80" cy="66" r="6" fill="#7fe7ff" />
            <circle cx="120" cy="66" r="12" fill={gold} stroke={ink} strokeWidth="2" /><circle cx="120" cy="66" r="6" fill="#7fe7ff" />
        </svg>
    );
}
export function Roxy({ src, alt }: Custom) {
    if (src) return <img className="th-char-img" src={src} alt={alt ?? ""} />;
    return (
        <svg viewBox="0 0 160 160" className="th-char-svg" role="img" aria-label="Fox spirit holding a gold coin">
            <g className="th-sway"><path d="M116 110 Q170 100 150 40 Q130 70 106 90Z" fill="#ff9a4d" stroke={ink} strokeWidth="2" /><path d="M150 40 Q140 56 134 62 Q146 58 150 40Z" fill="#fff" /></g>
            <path d="M44 62 L40 22 L70 46Z" fill="#ff9a4d" stroke={ink} strokeWidth="2" />
            <path d="M116 62 L120 22 L90 46Z" fill="#ff9a4d" stroke={ink} strokeWidth="2" />
            <ellipse cx="80" cy="102" rx="38" ry="30" fill="#fff3e0" stroke={ink} strokeWidth="2" />
            <ellipse cx="80" cy="76" rx="42" ry="34" fill="#ff9a4d" stroke={ink} strokeWidth="2" />
            <path d="M44 84 Q80 118 116 84 Q100 100 80 100 Q60 100 44 84Z" fill="#fff3e0" />
            <g className="th-eyes">{[64, 96].map((x) => (<g key={x}><ellipse cx={x} cy="76" rx="8" ry="10" fill={ink} /><circle cx={x - 2.5} cy="72" r="3" fill="#fff" /><circle cx={x + 2.5} cy="80" r="1.5" fill="#fff" /></g>))}</g>
            <path d="M78 90 Q80 95 84 90" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
            <g className="th-coin"><circle cx="80" cy="16" r="12" fill={gold} stroke="#b8862b" strokeWidth="2" /><path d="M80 9 V23 M75 12 H84 Q86 16 84 16 H76 Q74 16 76 20 H85" stroke="#b8862b" strokeWidth="1.5" fill="none" /></g>
            </svg>
    );
}