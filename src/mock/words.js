let words = [
    {   
        id: 1,
        name: "a",                      // a word
        sound: "/assets/words/be.wav" ,     // sound of word
        done: false,                        // sorted or not
        store: [],                          // will catch sorted sylls
        sylls: [                            // store raw syllables
            { id: 0, name: "be", sound: "/assets/sylls/be.wav" },
            { id: 1, name: "bey", sound: "/assets/sylls/bey.wav" },
            { id: 2, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 3, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 4, name: "kan", sound: "/assets/sylls/kan.wav" }    
        ]           
    },
    {   
        id: 2,
        name: "alibaba",
        sound: "/assets/words/be.wav" ,
        done: false,
        store: [],
        sylls: [
            { id: 0, name: "be", sound: "/assets/sylls/be.wav" },
            { id: 1, name: "bey", sound: "/assets/sylls/bey.wav" },
            { id: 2, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 3, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 4, name: "kan", sound: "/assets/sylls/kan.wav" },
            { id: 5, name: "kanj", sound: "/assets/sylls/kanj.wav" },
            { id: 6, name: "di", sound: "/assets/sylls/di.wav" },
            { id: 7, name: "dih", sound: "/assets/sylls/dih.wav" },
            { id: 8, name: "be", sound: "/assets/sylls/be.wav" },
            { id: 9, name: "bey", sound: "/assets/sylls/bey.wav" },
            { id: 10, name: "be", sound: "/assets/sylls/be.wav" },
            { id: 11, name: "bey", sound: "/assets/sylls/bey.wav" },    
        ]
            
    },
    {   
        id: 3,
        name: "Banhmi",
        sound: "/assets/words/be.wav" ,
        done: false,
        store: [],
        sylls: [
            { id: 0, name: "be", sound: "/assets/sylls/be.wav" },
            { id: 1, name: "bey", sound: "/assets/sylls/bey.wav" },
            { id: 2, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 3, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 4, name: "kan", sound: "/assets/sylls/kan.wav" }    
        ]
            
    },
    {   
        id: 4,
        name: "pho",
        sound: "/assets/words/be.wav" ,
        done: false,
        store: [],
        sylls: [
            { id: 0, name: "be", sound: "/assets/sylls/be.wav" },
            { id: 1, name: "bey", sound: "/assets/sylls/bey.wav" },
            { id: 2, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 3, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 4, name: "kan", sound: "/assets/sylls/kan.wav" },
            { id: 5, name: "kanj", sound: "/assets/sylls/kanj.wav" },
            { id: 6, name: "di", sound: "/assets/sylls/di.wav" },
            { id: 7, name: "dih", sound: "/assets/sylls/dih.wav" },
            { id: 8, name: "be", sound: "/assets/sylls/be.wav" },
            { id: 9, name: "bey", sound: "/assets/sylls/bey.wav" },
            { id: 10, name: "be", sound: "/assets/sylls/be.wav" },
            { id: 11, name: "bey", sound: "/assets/sylls/bey.wav" },
            { id: 12, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 13, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 14, name: "kan", sound: "/assets/sylls/kan.wav" },
            { id: 15, name: "kanj", sound: "/assets/sylls/kanj.wav" },
            { id: 16, name: "di", sound: "/assets/sylls/di.wav" },
            { id: 17, name: "dih", sound: "/assets/sylls/dih.wav" },
            { id: 20, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 23, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 24, name: "kan", sound: "/assets/sylls/kan.wav" },
            { id: 25, name: "kanj", sound: "/assets/sylls/kanj.wav" },
            { id: 26, name: "di", sound: "/assets/sylls/di.wav" },
            { id: 27, name: "dih", sound: "/assets/sylls/dih.wav" },
            { id: 37, name: "dih", sound: "/assets/sylls/dih.wav" },
            { id: 30, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 33, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 34, name: "kan", sound: "/assets/sylls/kan.wav" },
            { id: 35, name: "kanj", sound: "/assets/sylls/kanj.wav" },
            { id: 36, name: "di", sound: "/assets/sylls/di.wav" },
            { id: 37, name: "dih", sound: "/assets/sylls/dih.wav" },
            { id: 40, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 43, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 44, name: "kan", sound: "/assets/sylls/kan.wav" },
            { id: 45, name: "kanj", sound: "/assets/sylls/kanj.wav" },
            { id: 46, name: "di", sound: "/assets/sylls/di.wav" },
            { id: 47, name: "dih", sound: "/assets/sylls/dih.wav" },
            { id: 47, name: "dih", sound: "/assets/sylls/dih.wav" },
            { id: 40, name: "ka", sound: "/assets/sylls/ka.wav" },
            { id: 43, name: "kka", sound: "/assets/sylls/kka.wav" },
            { id: 44, name: "kan", sound: "/assets/sylls/kan.wav" },
            { id: 45, name: "kanj", sound: "/assets/sylls/kanj.wav" },
            { id: 46, name: "di", sound: "/assets/sylls/di.wav" },
            { id: 47, name: "dih", sound: "/assets/sylls/dih.wav" },            
        ]           
    }
];

export default words;
