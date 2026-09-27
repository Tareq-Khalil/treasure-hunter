'use client';
const rnd=(i:number,s:number)=>{
    const x =Math.sin(i*127.1+s*311.7)*43758.5453;
    return +(x-Math.floor(x)).toFixed(3);
};
export function NightSky({count=40}:{count?:number}){
    return(
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({length:count},(_,i)=>(
                <span key={i} className="sky-star" style={{
                    left:`${rnd(i,1)*100}%`,
                    top:`${rnd(i,2)*100}%`,
                    width:1+rnd(i,3)*2,
                    height:1+rnd(i,3)*2,
                    ["--d" as string]:`${2+rnd(i,4)*4}s`,
                    ["--l" as string]:`${-rnd(i,5)*6}s`,
                }}/>
            ))}
            <div className="absolute inset-0 nautical-vignette"/>
        </div>
    );
}