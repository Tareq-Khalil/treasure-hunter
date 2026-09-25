'use client';
import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import { VisualNovelEngine } from '@/components/vn/VisualNovelEngine';
import { ArchipelagoMap } from '@/components/map/ArchipelagoMap';
import { UVJournal } from '@/components/puzzles/UVJournal';
import { CipherDecoder } from '@/components/puzzles/CipherDecoder';
import { EmberVault } from '@/components/puzzles/EmberVault';
import { ExpeditionCodex } from '@/components/codex/ExpeditionCodex';
import { STORY_NODES } from '@/lib/storyData';
export default function ExpeditionPage() {
    const { gameState, advanceDialogue, selectLocation, saveProgress } = useGameState();
    const currentNode = STORY_NODES[gameState.currentNodeId];
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-90 pointer-events-none" />
            <header className="relative z-10 p-6 flex justify-between items-center border-b border-amber-500/20 bg-slate-950/60 backdrop-blur-md">
                <div>
                    <h1 className="text-xl font-serif text-amber-300 tracking-wider">
                        Treasure Hunter
                    </h1>
                    <p className="text-xs text-slate-400 italic">
                        "The treasure was never buried."
                    </p>
                </div>
            </header>
            <ExpeditionCodex
                unlockedClues={gameState.unlockedClues}
                completionPercentage={Math.min(
                    100,
                    Math.round((gameState.solvedPuzzles.length /3) * 100)
                )}
                />
                <div className="relative z-10 my-auto py-8 px-4 w-full">
                    {!currentNode?.triggerPuzzle && (
                        <div className="mb-8">
                            <ArchipelagoMap
                                unlockedLocations={gameState.unlockedLocations}
                                currentLocationId={gameState.currentLocationId}
                                onSelectLocation={selectLocation}
                                />
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
                            }}
                        />
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
                            }}
                        />
                    )}
                    {currentNode?.triggerPuzzle === 'vault' && (
                        <EmberVault
                            onSolve={() => {
                                saveProgress({
                                    solvedPuzzles: [...gameState.solvedPuzzles, 'vault'],

                                });
                                advanceDialogue('vault_unlocked');
                            }}
                        />
                    )}
                    {!currentNode?.triggerPuzzle && (
                        <VisualNovelEngine
                            nodeId={gameState.currentNodeId}
                            onChoiceSelect={advanceDialogue}
                        />
                    )}
                </div>
        </main>
    );
}
