'use client' ;
import { useState, useEffect} from 'react';
import { GameState } from '@/types/game';
import { STORY_NODES, LOCATIONS} from '@/lib/storyData';
import { createClient } from '@/lib/supabase/client';
const INITIAL_STATE: GameState = {
    unlockedLocations: ['abandoned_dock'],
    unlockedClues: [],
    solvedPuzzles: [],
    currentNodeId: 'prologue_start',
    currentLocationId: 'abandoned_dock',
    dialogueHistory: []

};
export function useGameState() {
    const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    useEffect(() => {
        async function loadProgress() {
            const { data: { user } } = await supabase.auth.getUser();
            if(user) {
                const { data } = await supabase
                  .from('expedition_progress')
                  .select('*')
                  .eq('user_id', user.id)
                  .single();
                if (data) {
                    setGameState(prev => ({
                        ...prev,
                        unlockedLocations: data.unlocked_locations || prev.unlockedLocations,
                        unlockedClues: data.unlocked_clues || prev.unlockedClues,
                        solvedPuzzles: data.solved_puzzles || prev.solvedPuzzles,
                        currentNodeId: data.current_node || prev.currentNodeId
                    }));
                }
                
            }
            setLoading(false);
        }
        loadProgress();
    
    }, []);
    const saveProgress = async (newState: Partial<GameState>) => {
        const updated = { ...gameState, ...newState };
        setGameState(updated);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('expedition_progress').upsert({
                user_id: user.id,
                unlocked_locations: updated.unlockedLocations,
                unlocked_clues: updated.unlockedClues,
                solved_puzzles: updated.solvedPuzzles,
                current_node: updated.currentNodeId,
                completion_percentage: Math.min(100, Math.round((updated.solvedPuzzles.length/3) * 100))
            });
        }
    };
    const advanceDialogue = (nextNodeId: string, unlockClueId?: string, unlockLocationId?: string) => {
        const updatedClues = unlockClueId && !gameState.unlockedClues.includes(unlockClueId)
        ? [...gameState.unlockedClues, unlockClueId]
        : gameState.unlockedClues;
        const updatedLocations = unlockLocationId && !gameState.unlockedLocations.includes(unlockLocationId)
        ? [...gameState.unlockedLocations, unlockLocationId]
        : gameState.unlockedLocations;
        const currentNode = STORY_NODES[gameState.currentNodeId];
        const newHistory = currentNode
          ? [...gameState.dialogueHistory, { character: currentNode.characterId, text: currentNode.text}]
          : gameState.dialogueHistory;
          saveProgress({
            currentNodeId: nextNodeId,
            unlockedClues: updatedClues,
            unlockedLocations: updatedLocations,
            dialogueHistory: newHistory
          });
    };
    const selectLocation = (locationId: string) => {
        const targetLoc = LOCATIONS.find(l => l.id === locationId);
        if(targetLoc && gameState.unlockedLocations.includes(locationId)){
            saveProgress({
                currentLocationId: locationId,
                currentNodeId: targetLoc.startNodeId
            });
        }
    };
    return { gameState, loading, advanceDialogue, selectLocation, saveProgress };
}