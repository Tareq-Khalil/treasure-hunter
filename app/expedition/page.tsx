'use client';
import './expedition.css'
import { useGameState } from '@/hooks/useGameState';
import { VisualNovelEngine } from '@/components/vn/VisualNovelEngine';
import { ArchipelagoMap } from '@/components/map/ArchipelagoMap';
import { UVJournal } from '@/components/puzzles/UVJournal';
import { CipherDecoder } from '@/components/puzzles/CipherDecoder';
import { EmberVault } from '@/components/puzzles/EmberVault';
import { ExpeditionCodex } from '@/components/codex/ExpeditionCodex';
import { STORY_NODES, PUZZLE_COUNT} from '@/lib/storyData';
export default function ExpeditionPage() {
    const { gameState, loading, cloudSynced, advanceDialogue, selectLocation, solvePuzzle } = useGameState();
    const currentNode = STORY_NODES[gameState.currentNodeId];
    const puzzle = currentNode?.triggerPuzzle;
    if (loading) {
        return (
            <main className="xp">
                <p className="xp-loading" role="status">Loading your saved progress&hellip;</p>
            </main>
        );
    }
    return (
        <main className="xp">
            <div className="xp-in">
                <header className="xp-head">
                    <div>
                        <h1 className="xp-title">Treasure Hunter</h1>
                        <p className="xp-note">The treasure was never buried.</p>
                    </div>
                    <div className="xp-head-r">
                    <span
                        className={`xp-stamp${cloudSynced? '' : 'guest'}`}
                        title={cloudSynced ? 'Your progress is saved to your account' : 'Sign in from the title page to keep your progress.'}>
                        {cloudSynced ? 'Saved to your account' : 'Playing as a guest'}
                    </span>
                    <ExpeditionCodex
                        unlockedClues={gameState.unlockedClues}
                        solved={Math.min(PUZZLE_COUNT, gameState.solvedPuzzles.length)}
                        total={PUZZLE_COUNT}
                    />
                    </div>
                </header>
                {!puzzle && (
                    <ArchipelagoMap 
                        unlockedLocations={gameState.unlockedLocations}
                        currentLocationId={gameState.currentLocationId}
                        onSelectLocation={selectLocation}
                    />
                )}
                <VisualNovelEngine nodeId={gameState.currentNodeId} onChoiceSelect={advanceDialogue}/>
                {puzzle === 'uv_journal' && (
                    <UVJournal onSolve={()=>solvePuzzle('uv_journal','prologue_journal_revealed','dock_journal_clue')}/>
                )}
                {puzzle==='cipher'&&(
                    <CipherDecoder onSolve={()=>solvePuzzle('cipher','observatory_solved','cipher_solution_clue','sunken_vault')}/>
                )}
                {puzzle==='vault'&&(
                    <EmberVault onSolve={()=>solvePuzzle('vault','vault_unlocked')}/>
                )}
            </div>
        </main>
    );
}