'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {createClient} from '@/lib/supabase/client';
import Link from 'next/link';
export default function AuthPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [isSignUp,setIsSignUp]=useState(false);
    const [loading,setLoading]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const router=useRouter();
    const supabase=createClient();
    const handleAuth=async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try{
            if (isSignUp){
                const {error}=await supabase.auth.signUp({email,password,options:{data:{username:username||email.split('@')[0]},},});
                if (error) throw error;
                router.push('/expedition');
            } else{
                const {error} = await supabase.auth.signInWithPassword({email,password,});
                if (error) throw error;
                router.push('/expedition');
            }
        } catch (err:unknown){
            if (err instanceof Error){
                setErrorMsg(err.message);
            } else{
                setErrorMsg('An unexpected authentication error occurred.');
            }
        } finally{
            setLoading(false);
        }
    };
    return(
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-90"/>
            <div className="relative z-10 w-full max-w-md bg-slate-950/90 border-2 border-amber-500/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-serif text-amber-300 tracking-wider">{isSignUp ? 'New Expedition Roster':'Archivist Authentication'}</h1>
                    <p className="text-xs text-slate-400">{isSignUp ? 'Create credentials to save expedition progress':'Sign in to synchronize discovered secrets'}</p>
                </div>
                {errorMsg &&(
                    <div className="p-3 rounded bg-red-950/80 border border-red-500/50 text-red-300 text-xs text-center font-mono">{errorMsg}</div>
                )}
                <form onSubmit={handleAuth} className="space-y-4">{isSignUp &&(
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Archivist Call-sign</label>
                        <input type="text" required value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="e.g. Scholar_01" className="w-full px-4 py-2.5 bg-slate-900 border border-amber-500/30 rounded-lg text-amber-200 text-sm focus:outline-none focus:border-amber-400"/>
                    </div>
                )}
                <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="archivist@expedition.org" className="w-full px-4 py-2.5 bg-slate-900 border border-amber-500/30 rounded-lg text-amber-200 text-sm focus:outline-none focus:border-amber-400"/>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Access Key / Password</label>
                    <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="********" className="w-full px-4 py-2.5 bg-slate-900 border border-amber-500/30 rounded-lg text-amber-200 text-sm focus:outline-none focus:border-amber-400"/>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 mt-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-lg flex items-center justify-center">{loading ? 'Authenticating...':isSignUp ? 'Begin Journey':'Access Archives'}</button>
                </form>
                <div className="flex justify-between item-center text-xs pt-4 border-t border-slate-800">
                    <button onClick={()=> setIsSignUp(!isSignUp)} className="text-amber-400 hover:underline">{isSignUp ? 'Existing Archivist? Log in':'New to expedition? Register'}</button>
                    <Link href="/" className="text-slate-500 hover:text-slate-300">Return Home</Link>
                </div>
            </div>
        </main>
    );
}