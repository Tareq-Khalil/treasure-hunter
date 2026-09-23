export type CharacterId = 'lara' | 'roxy' | 'sieg' | 'system';
export interface Character{
    id:CharacterId;
    name:string;
    role:string;
    portraitUrl:string;
    themeColor:string;
}
export interface Choice{
    text:string;
    nextNodeId:string;
    unlockClueId?:string;
    unlockLocationId?:string;
}
export interface DialogueNode{
    id:string;
    characterId:CharacterId;
    text:string;
    expression?:'neutral'|'shocked'|'determined'|'pensive';
    choices?:Choice[];
    triggerPuzzle?:'uv_journal'|'cipher'|'vault';
}
export interface Location{
    id:string;
    name:string;
    subtitle:string;
    coordinates:{x:number;y:number};
    startNodeId:string;
    requiresClue?:string;
}
export interface Clue{
    id:string;
    title:string;
    description:string;
    foundAt:string;
}
export interface GameState{
    unlockedLocations:string[];
    unlockedClues:string[];
    solvedPuzzles:string[];
    currentNodeId:string;
    currentLocationId:string;
    dialogueHistory:{character:string;text:string}[];
}