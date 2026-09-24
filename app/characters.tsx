'use client';
const ink="#0a0e2e",skin="#ffe0cc",gold="#ffd363";
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
            <ellipse cx="100" cy="100" rx="44" ry="42" fill={skin} stroke={ink} strokeWidth="2"/>
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
            <path d="M58 240 H142 L158 284 H42Z" fill={skirt} stroke={ink}strokeWidth="2"/>
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
            <circle cx="100" cy="40" r="7" fill="ff8fb1" stroke={ink} strokeWidth="1.5"/>
        </svg>
    );
}