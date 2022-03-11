let words = [
    {
        id: 0,
        name: "a",                      // a word
        sound: "/assets/words/kun2.wav",     // sound of word
        done: false,                        // sorted or not
        store: [],                          // will catch sorted sylls
        sylls: [                            // store raw syllables
            { id: 1, name: "leh", sound: "/assets/sylls/leh.wav" },
            { id: 2, name: "yu", sound: "/assets/sylls/yu.wav" },
            { id: 3, name: "rrengh", sound: "/assets/sylls/rrengh.wav" },
            { id: 4, name: "djin", sound: "/assets/sylls/djin.wav" },
            { id: 197, name: "karn", sound: "/assets/sylls/karn.wav" },
        ]
    },
    {
        id: 1,
        name: "alibaba",
        sound: "/assets/words/kun.wav",
        done: false,
        store: [],
        sylls: [
            
            { id: 3, name: "rrengh", sound: "/assets/sylls/rrengh.wav" },
            { id: 4, name: "djin", sound: "/assets/sylls/djin.wav" },
            { id: 5, name: "durrk", sound: "/assets/sylls/durrk.wav" },

        ]

    },
    {
        id: 2,
        name: "Banhmi",
        sound: "/assets/words/kun2.wav",
        done: false,
        store: [],
        sylls: [
            
            { id: 4, name: "djin", sound: "/assets/sylls/djin.wav" },
            { id: 5, name: "durrk", sound: "/assets/sylls/durrk.wav" },
        ]

    },
    {
        id: 3,
        name: "pho",
        sound: "/assets/words/kun.wav",
        done: false,
        store: [],
        sylls: [
            { id: 1, name: "leh", sound: "/assets/sylls/leh.wav" },            
        ]
    },
    {
        id: 4,
        name: "b",
        sound: "/assets/words/kun2.wav",
        done: false,
        store: [],
        sylls: [
            { id: 1, name: "leh", sound: "/assets/sylls/leh.wav" },
            { id: 2, name: "yu", sound: "/assets/sylls/yu.wav" },
            { id: 60, name: "dim", sound: "/assets/sylls/dim.wav" },
            { id: 197, name: "karn", sound: "/assets/sylls/karn.wav" },

        ]
    }
];

export default words;
