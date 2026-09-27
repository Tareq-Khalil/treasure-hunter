'use client';
import { useGameState } from '@/hooks/useGameState';
import { VisualNovelEngine } from '@/components/vn/VisualNovelEngine';
import { ArchipelagoMap } from '@/components/map/ArchipelagoMap';
import { UVJournal } from '@/components/puzzles/UVJournal';
import { CipherDecoder } from '@/components/puzzles/CipherDecoder';
import { EmberVault } from '@/components/puzzles/EmberVault';
import { ExpeditionCodex } from '@/components/codex/ExpeditionCodex';
import { NightSky } from '@/components/ui/NightSky';
import { STORY_NODES } from '@/lib/storyData';
export default function ExpeditionPage() {
    const { gameState, loading, cloudSynced, advanceDialogue, selectLocation, saveProgress } = useGameState();
    const currentNode = STORY_NODES[gameState.currentNodeId];
    if (loading) {
        return (
            <main className="sky-bg min-h-screen flex items-center justify-center">
                <NightSky count={30} />
                <p className="relative z-10 text-gold-300/80 font-serif tracking-widest text-sm animate-pulse">
                    Unrolling the expedition archive&hellip;
                </p>
            </main>
        );
    }
    return (
        <main className="sky-bg min-h-screen text-parchment relative overflow-hidden flex flex-col justify-between font-sans">
            <NightSky count={45} />
            <header className="relative z-10 p-6 flex justify-between items-center border-b border-gold-500/20 bg-nautical-950/50 backdrop-blur-md">
                <div>
                    <h1 className="text-xl font-serif text-gold-300 tracking-wider">
                        Treasure Hunter
                    </h1>
                    <p className="text-xs text-parchment/60 italic">
                        &quot;The treasure was never buried.&quot;
                    </p>
                </div>
                <span
                    className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        cloudSynced
                            ? 'text-emerald-300 border-emerald-500/40 bg-emerald-950/40'
                            : 'text-parchment/50 border-gold-500/20 bg-nautical-950/40'
                    }`}
                    title={cloudSynced ? 'Progress is syncing to your account' : 'Playing locally on this device'}>
                    {cloudSynced ? 'Synced' : 'Local'}
                </span>
            </header>
            <ExpeditionCodex
                unlockedClues={gameState.unlockedClues}
                completionPercentage={Math.min(
                    100,
                    Math.round((gameState.solvedPuzzles.length /3) * 100)
                )}/>
                <div className="relative z-10 my-auto py-8 px-4 w-full">
                    {!currentNode?.triggerPuzzle && (
                        <div className="mb-8">
                            <ArchipelagoMap
                                unlockedLocations={gameState.unlockedLocations}
                                currentLocationId={gameState.currentLocationId}
                                onSelectLocation={selectLocation}/>
                                </div>
                    )}
                    {currentNode?.triggerPuzzle === 'uv_journal' && (
                        <UVJournal
                            onSolve={() => {
                                saveProgress({
                                    solvedPuzzles: [...gameState.solvedPuzzles, 'uv_journal'],
                                });
                                advanceDialogue(
                                    'prologue_journal_revealed',
                                    'dock_journal_clue'
                                );
                            }}/>
                    )}
                    {currentNode?.triggerPuzzle === 'cipher' && (
                        <CipherDecoder
                            onSolve={() => {
                                saveProgress({
                                    solvedPuzzles: [...gameState.solvedPuzzles, 'cipher'],
                                });
                                advanceDialogue(
                                    'observatory_solved',
                                    'cipher_solution_clue',
                                    'sunken_vault'
                                );
                            }}/>
                    )}
                    {currentNode?.triggerPuzzle === 'vault' && (
                        <EmberVault
                            onSolve={() => {
                                saveProgress({
                                    solvedPuzzles: [...gameState.solvedPuzzles, 'vault'],
                                });
                                advanceDialogue('vault_unlocked');
                            }}/>
                    )}
                    {!currentNode?.triggerPuzzle && (
                        <VisualNovelEngine
                            nodeId={gameState.currentNodeId}
                            onChoiceSelect={advanceDialogue}/>
                    )}
                </div>
        </main>
    );
}