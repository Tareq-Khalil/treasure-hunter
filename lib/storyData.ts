import {Character,DialogueNode,Location,Clue} from '@/types/game';
export const PUZZLE_COUNT=3;
export const CHARACTERS: Record<string, Character>={
    lara:{
        id:'lara',
        name:'Lara Greyrat',
        role:'Expedition Commander',
        portraitUrl:'/lara.png',
        themeColor:'#53B6EB'
    },
    roxy:{
        id:'roxy',
        name:'Roxy Megurdia',
        role:'Cryptographer & Historian',
        portraitUrl:'/roxy.png',
        themeColor:'#006F9F'
    },
    sieg:{
        id:'sieg',
        name:'Air lord Sieg',
        role:'Island Surveyor',
        portraitUrl:'/sieg.png',
        themeColor:'#34d399'
    }
};
export const LOCATIONS:Location[]=[
    {
        id:'abandoned_dock',
        name:'Asura Docks',
        subtitle:'where the 1892 crew set out.',
        coordinates:{x:22,y:70},
        startNodeId:'prologue_start'
    },
    {
        id:'observatory',
        name:'Submerged Shirone Astrolabe',
        subtitle:'a tower half sunk in the reef',
        coordinates:{x:48,y:35},
        startNodeId:'observatory_start',
        requiresClue:'dock_journal_clue'
    },
    {
        id:'sunken_vault',
        name:'The Ember Vault of Millis',
        subtitle:'black stone under the east cliff',
        coordinates:{x:78,y:55},
        startNodeId:'vault_start',
        requiresClue:'cipher_solution_clue'
    }
];
export const CLUES:Record<string,Clue>={
    dock_journal_clue:{
        id:'dock_journal_clue',
        title:'Margin note in UV ink',
        description:'Under the lamp, a line in the margin:"18° N, under the Swan." The Swan is Cyngus.',
        foundAt: "Captain's logbook, Asura Docks"
    },
    cipher_solution_clue:{
        id:'cipher_solution_clue',
        title:'Number from the star dial',
        description:'With the Swan under the marker the slot reads 7419. Four digits, so it should fit a keypad.',
        foundAt:'Stone dial, astrolabe tower'
    }
};
export const STORY_NODES:Record<string,DialogueNode>={
    prologue_start:{
        id:'prologue_start',
        characterId:'lara',
        expression:'determined',
        text:"Okay, Archivist, we're tied up at Asura Docks. The harbour master made us unload twice, so don't ask about my mourning. Sieg fished this out of the flotsam: the captain's logbook, 1892, the crew that never came home. Most of it is pulp. Roxy swears there's writing we can't see, and she brought the lamp.",
        choices:[
            {
                text:'Take the lamp and go over the page',
                nextNodeId:'prologue_uv_inspect',
            }
        ]
    },
    prologue_uv_inspect:{
        id:'prologue_uv_inspect',
        characterId:'lara',
        text:"Go slow. If you press on that paper it'll come apart in your hands.",
        triggerPuzzle:'uv_journal'
    },
    prologue_journal_revealed:{
        id:'prologue_journal_revealed',
        characterId:'roxy',
        expression:'pensive',
        text:"\"Under the Swan.\" That's Cygnus. He wasn't hising a place, he was hiding a bearing: eighteen north, steered by the stars. Only one thing out there is tall enough to navigate by, the old astrolabe tower on the reef. I've pencilled it onto the chart.",
        choices:[
            {
                text:'Sail for the astrolabe tower',
                nextNodeId:"observatory_start",
                unlockLocationId:'observatory'
            }
        ]
    },
    observatory_start:{
        id:'observatory_start',
        characterId:'sieg',
        text:"That's the tower. Half of it's under at high tide, so we got the timing right for once. There's a stone dial on the altar with eight signs around the rim. It still turns.",
        choices:[
            {
                text:'Try the dial',
                nextNodeId:'observatory_cipher_puzzle'
            }
        ]
    },
    observatory_cipher_puzzle:{
        id:'observatory_cipher_puzzle',
        characterId:'roxy',
        text:"Eight constellations. THe logbook said the Swan, so start there. Turn the ring untill it sits under the marker, then read the slot. Gently. That thing's been wet for over a century.",
        triggerPuzzle:'cipher'
    },
    observatory_solved:{
        id:'observatory_solved',
        characterId:'roxy',
        expression:'shocked',
        text:"Seven, four, one, nine. Did you hear that? Something shifted behind the altar. Write it down. Sieg says there's a block of black stone no the east with a keypad in its face, so I think we know where this goes.",
        choices:[
            {
                text:'Climb to the east cliff',
                nextNodeId:'vault_start',
                unlockLocationId:'sunken_vault',
            }
        ]
    },
    vault_start:{
        id:'vault_start',
        characterId:'lara',
        expression:'determined',
        text:"That's the one. Black stone, four keys, and a lot of cliff over our heads. You've got the number. I'll keep an eye on the tide",
        triggerPuzzle:'vault'
    },
    vault_unlocked:{
        id:'vault_unlocked',
        characterId:'lara',
        expression:'shocked',
        text:"It's dry in here. The last log is sitting on a shelf like someone left it this morning. Final line reads: \"No gold. There never was. The charts are the cargo, every night's sky copied out by hand. Keep them dry.\" Huh. All that, for a stack of star charts.",
        choices:[]
    }
};