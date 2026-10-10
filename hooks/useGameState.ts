'use client' ;
import { useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { GameState } from '@/types/game';
import { STORY_NODES, LOCATIONS, PUZZLE_COUNT} from '@/lib/storyData';
import { createClient } from '@/lib/supabase/client';
const INITIAL_STATE: GameState = {
    unlockedLocations: ['abandoned_dock'],
    unlockedClues: [],
    solvedPuzzles: [],
    currentNodeId: 'prologue_start',
    currentLocationId: 'abandoned_dock',
    dialogueHistory: []
};
const addUnique = (list:string[], item?:string)=>
    item && !list.includes(item) ? [...list, item] : list;
const locationForNode = (nodeId:string, fallback:string)=>
    LOCATIONS.find(l => l.startNodeId === nodeId)?.id ?? fallback;
export function useGameState() {
    const supabase = useMemo(() =>createClient(),[]);
    const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
    const stateRef = useRef<GameState>(INITIAL_STATE);
    const [loading, setLoading] = useState(true);
    const [cloudSynced, setCloudSynced] = useState(false);
    const persist = useCallback(async(state:GameState)=>{
        if (!supabase) return;
        try{
            const{data:{user}}=await supabase.auth.getUser();
            if (!user) return;
            await supabase.from('expedition_progress').upsert({
                user_id:user.id,
                unlocked_locations: state.unlockedLocations,
                unlocked_clues: state.unlockedClues,
                solved_puzzles:state.solvedPuzzles,
                current_node: state.currentNodeId,
                completion_percentage: Math.min(100,Math.round((state.solvedPuzzles.length/PUZZLE_COUNT)*100))
            }, {onConflict:'user_id'});
        } catch {}
    }, [supabase]);
    useEffect(() => {
        async function loadProgress() {
            if (!supabase) {
                setLoading(false);
                return;
            }
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data } = await supabase
                      .from('expedition_progress')
                      .select('*')
                      .eq('user_id', user.id)
                      .maybeSingle();
                    if (data) {
                        const prev= stateRef.current;
                        const unlockedLocations:string[] = data.unlocked_locations || prev.unlockedLocations;
                        const next: GameState={
                            ...prev,
                            unlockedLocations,
                            unlockedClues: data.unlocked_clues || prev.unlockedClues,
                            solvedPuzzles: data.solved_puzzles || prev.solvedPuzzles,
                            currentNodeId: data.current_node || prev.currentNodeId,
                            currentLocationId: unlockedLocations[unlockedLocations.length-1]|| prev.currentLocationId
                        };
                        stateRef.current= next;
                        setGameState(next);
                    }
                    setCloudSynced(true);
                }
            } catch {}
            setLoading(false);
        }
        loadProgress();
    }, [supabase]);
    const commit = useCallback((patch:Partial<GameState>)=>{
        const next = { ...stateRef.current, ...patch};
        stateRef.current=next;
        setGameState(next);
        void persist(next);
    },[persist]);
    const advanceDialogue = useCallback((nextNodeId: string, unlockClueId?: string, unlockLocationId?: string) => {
        const s = stateRef.current;
        const current = STORY_NODES[s.currentNodeId];
        commit({
            currentNodeId:nextNodeId,
            currentLocationId:locationForNode(nextNodeId, s.currentLocationId),
            unlockedClues:addUnique(s.unlockedClues, unlockClueId),
            unlockedLocations:addUnique(s.unlockedLocations, unlockLocationId),
            dialogueHistory:current 
                ? [...s.dialogueHistory, {character:current.characterId, text:current.text}]
                : s.dialogueHistory
        });
    }, [commit]);
    const solvePuzzle=useCallback((
        puzzleId:string,
        nextNodeId:string,
        unlockClueId?:string,
        unlockLocationId?:string
    )=>{
        const s =stateRef.current;
        const current = STORY_NODES[s.currentNodeId];
        commit({
            solvedPuzzles:addUnique(s.solvedPuzzles, puzzleId),
            currentNodeId:nextNodeId,
            currentLocationId:locationForNode(nextNodeId,s.currentLocationId),
            unlockedClues:addUnique(s.unlockedClues, unlockClueId),
            unlockedLocations:addUnique(s.unlockedLocations, unlockLocationId),
            dialogueHistory:current
                ? [...s.dialogueHistory,{character:current.characterId,text:current.text}]
                : s.dialogueHistory
        });
    }, [commit]);
    const selectLocation = useCallback((locationId: string) => {
        const target = LOCATIONS.find(l => l.id === locationId);
        if(target && stateRef.current.unlockedLocations.includes(locationId)){
            commit({
                currentLocationId: locationId,
                currentNodeId: target.startNodeId
            });
        }
    }, [commit]);
    return { gameState, loading, cloudSynced, advanceDialogue, solvePuzzle, selectLocation };
}