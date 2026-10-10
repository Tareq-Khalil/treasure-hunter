import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {Cinzel,Inter,IM_Fell_English,La_Belle_Aurore,Reenie_Beanie} from 'next/font/google';
import './globals.css';
import {AudioController} from "@/components/ui/AudioController";
const cinzel=Cinzel({
  subsets:['latin'],
  variable:'--font-cinzel',
  display:'swap',
});
const inter=Inter({
  subsets:['latin'],
  variable:'--font-inter',
  display:'swap',
});
const fell=IM_Fell_English({
  subsets:['latin'],
  weight:'400',
  style:['normal','italic'],
  variable:'--font-fell',
  display:'swap',
});
const aurore=La_Belle_Aurore({
  subsets:['latin'],
  weight:'400',
  variable:'--font-aurore',
  display:'swap',
});
const pencil=Reenie_Beanie({
  subsets:['latin'],
  weight:'400',
  variable:'--font-pencil',
  display:'swap',
});
export const metadata:Metadata={
  title:'Treasure Hunter',
  description:'A prototype for a short treasure-hunting story with puzzles: read the logbook, crack the star dial, open the vault.',
};
export default function RootLayout({
  children,
}:{
  children:ReactNode;
}){
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${fell.variable} ${aurore.variable} ${pencil.variable}`}>
      <body className="font-sans min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
        {children}
        <AudioController />
      </body>
    </html>
  );
}