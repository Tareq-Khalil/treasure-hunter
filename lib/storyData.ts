import {Character,DialogueNode,Location,Clue} from '@/types/game';
export const CHARACTERS: Record<string, Character>={
    lara:{
        id:'lara',
        name:'Lara Greyrat',
        role:'Expedition Commander',
        portraitUrl:'lara.png',
        themeColor:'#53B6EB'
    },
    roxy:{
        id:'roxy',
        name:'Roxy Megurdia',
        role:'Cryptographer & Historian',
        portraitUrl:'roxy.png',
        themeColor:'#006F9F'
    },
    sieg:{
        id:'sieg',
        name:'Air lord Sieg',
        role:'Island Surveyor',
        portraitUrl:'sieg.png',
        themeColor:'#34d399'
    }
};
export const LOCATIONS:Location[]=[
    {
        id:'abandoned_dock',
        name:'Asura Docks',
        subtitle:'The starting point of the failed 1892 expedition',
        coordinates:{x:22,y:70},
        startNodeId:'prologue_start'
    },
    {
        id:'observatory',
        name:'Submerged Shirone Astrolabe',
        subtitle:'An ancient ruined tower half-buried in shallow reef',
        coordinates:{x:48,y:35},
        startNodeId:'observatory_start',
        requiresClue:'dock_journal_clue'
    },
    {
        id:'sunken_vault',
        name:'The Ember Vault of Millis',
        subtitle:'A sealed basalt monolith beneath the cliff face',
        coordinates:{x:78,y:55},
        startNodeId:'vault_start',
        requiresClue:'cipher_solution_clue'
    }
];
export const CLUES:Record<string,Clue>={
    dock_journal_clue:{
        id:'dock_journal_clue',
        title:'Phosphor Inscription',
        description:'UV light revealed hidden text: "The sky atlas points to 18 degrees North - Cygnus constellation."',
        foundAt: 'Asura Docks Journal'
    },
    cipher_solution_clue:{
        id:'cipher_solution_clue',
        title:'Astrolabe Transposition Key',
        description:'Decoded runes read: "KEY = 7419". This opens the basalt vault on the east cliff.',
        foundAt:'Submerged Shirone Astrolabe Cipher Wheel'
    }
};
export const STORY_NODES:Record<string,DialogueNode>={
    prologue_start:{
        id:'prologue_start',
        characterId:'lara',
        expression:'determined',
        text:"Welcome back, Archivist. We finally anchored at Asura Docks. Take a look at the captain's journal we recovered from the flotsam.",
        choices:[
            {
                text:'Inspect the journal under UV torch light',
                nextNodeId:'prologue_uv_inspect',
                unlockClueId:'dock_journal_clue'
            }
        ]
    },
    prologue_uv_inspect:{
        id:'prologue_uv_inspect',
        characterId:'lara',
        text:'Move the UV lantern over the parchment page to read the phosphor ink notes.',
        triggerPuzzle:'uv_journal'
    },
    prologue_journal_revealed:{
        id:'prologue_journal_revealed',
        characterId:'roxy',
        expression:'pensive',
        text:'Incredible! The invisible ink references the Submerged Shirone Astrolabe. I have updated your chart navigation coordinates.',
        choices:[
            {
                text:'Chart a course to the Submerged Shirone Astrolabe',
                nextNodeId:"observatory_start",
                unlockLocationId:'observatory'
            }
        ]
    },
    observatory_start:{
        id:'observatory_start',
        characterId:'sieg',
        text:'We reached the Astrolabe ruins. There is an ancient rotating cipher mechanism embedded in the stone altar.',
        choices:[
            {
                text:'Examine the Cipher Decoder Wheel',
                nextNodeId:'observatory_cipher_puzzle'
            }
        ]
    },
    observatory_cipher_puzzle:{
        id:'observatory_cipher_puzzle',
        characterId:'roxy',
        text:'Align the outer constellation glyphs with the inner numeric wheel to reveal the access key.',
        triggerPuzzle:'cipher'
    },
    observatory_solved:{
        id:'observatory_solved',
        characterId:'roxy',
        expression:'shocked',
        text:'The code 7-4-1-9 activated the stone mechanism! Coordinates to the Ember Vault of Millis are now unlocked.',
        choices:[
            {
                text:'Head to the Ember Vault of Millis monolith',
                nextNodeId:'vault_start',
                unlockLocationId:'sunken_vault',
                unlockClueId:'cipher_solution_clue'
            }
        ]
    },
    vault_start:{
        id:'vault_start',
        characterId:'lara',
        expression:'determined',
        text:'This is it. The basalt vault doors have a 4-digit ember keypad. Enter the passcode discovered from our expedition.',
        triggerPuzzle:'vault'
    },
    vault_unlocked:{
        id:'vault_unlocked',
        characterId:'lara',
        expression:'shocked',
        text:'The heavy stone doors recoil! Inside lies the final log, intact. "The Treasure was never buried in gold; it is the living memory of the stars."',
        choices:[]
    }
};