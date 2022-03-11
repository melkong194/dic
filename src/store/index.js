import { createStore } from 'vuex';
import words from '../mock/words';
import syllables from '../mock/syllables';

const store = createStore({
    state: {
        words: words,
        syllables: syllables,
        searched: null,
        sylls: [],
        sorted: [],
    },
    getters: {
        getListSyllables: state => {
            return JSON.parse(JSON.stringify(state.syllables));
        },
        getListSyllablesByOrder: state => {
            let result = [];
            let list = JSON.parse(JSON.stringify(state.syllables));
            let arr = ['a','bb','b','dj','d','e','kk','k','l','m','ng','nj', 'n','o','rd','rl','rn','rr','r','u','w', 'y'];
            for(let key in arr){
                result[key]=[]; 
            }
            for (let key in list){
                let value = list[key];
                
                for(let k in arr){
                    if( value.name.toUpperCase().startsWith(arr[k].toUpperCase())){
                        result[k].push(value);
                        break;
                    }
                }
            }

            return result;
        },
        getSyllableById: state => id => {
            if (id == null) id = 1;
            var syll = null;
            for (let key in state.syllables) {
                let x = JSON.parse(JSON.stringify(state.syllables[key]));
                if (x.id == id) {
                    syll = x;
                    break;
                }
            }
            return syll;
        },
        getSyllsByName: state => name => {
            var sylls = [];
            for (let key in state.syllables) {
                let x = JSON.parse(JSON.stringify(state.syllables[key]))
                if (x.name.toUpperCase().startsWith(name.trim().toUpperCase())) {
                    sylls.push(x);
                }
            }
            return sylls;
        },
        getWordByName: state => name => {
            var word = null;
            for (let key in state.words) {
                let x = JSON.parse(JSON.stringify(state.words[key]))
                if (x.name.toUpperCase().startsWith(name.trim().toUpperCase())) {
                    word = x;
                    break;
                }
            }
            return word;
        },
        getWordById: state => id => {
            if (id == null)
                id = 1;

            var word = null;
            for (let key in state.words) {
                let x = JSON.parse(JSON.stringify(state.words[key]));
                if (x.id == id) {
                    word = x;
                    break;
                }
            }
            return word;
        },
        getWordsLength: state => {
            let x = JSON.parse(JSON.stringify(state.words));
            return x.length;
        },
        // getSylls:state => {
        //     return JSON.parse(JSON.stringify(state.sylls));
        // },
        // getSortedSylls:state => {
        //     return JSON.parse(JSON.stringify(state.sortedSylls));
        // },
    },
    mutations: {
        SET_LIST_WORDS: (state, data) => {
            state.words = data;
        },
        SET_LIST_SYLLABLES: (state, data) => {
            state.syllables = data;
        },
        // SET_LIST_SYLLS: (state, data) => {
        //     state.sylls = data
        // },
        // SET_LIST_SORTED: (state, data) => {
        //     state.sorted = data
        // },

    },
    actions: {
        // updateSylls({ commit }, data) {        
        //     commit('SET_LIST_SYLLS', data);
        // }, 
        // updateSorted({ commit }, data) {        
        //     commit('SET_LIST_SORTED', data);
        // }, 
        // onWordsListener ({ commit }) { 
        //     let data = words;
        //     commit('SET_LIST_WORDS', data);   
        // },

        async addSyllableIntoWord({ commit, state }, data) {
            const newWords = JSON.parse(JSON.stringify([...state.words]));
            let exist = false;
            for (let key in newWords[data.wordID].sylls) {
                let x = newWords[data.wordID].sylls[key];
                if (x.id == data.addSyll.id) {
                    exist = true;
                    break;
                }
            }
            if (!exist)
                newWords[data.wordID].sylls.push(data.addSyll);

            await commit('SET_LIST_WORDS', newWords);
        },

        async addSyllableIntoWordByName({ commit, state }, data) {
            let newWords = JSON.parse(JSON.stringify([...state.words]));
            let newSyllables = JSON.parse(JSON.stringify(state.syllables));

            for (let key in newSyllables) {
                // console.log("===========")
                let s = newSyllables[key];
                for (let k in data.syllNames) {
                    let e = data.syllNames[k];
                    if (s.name.toUpperCase() == e.toUpperCase()) {
                        
                        //checking if syllables exist in current word
                        let exist = false;
                        for (let i in newWords[data.wordID].sylls) {
                            let x = newWords[data.wordID].sylls[i];
                            if (s.name == x.name) {
                                exist = true;
                            }
                        }
                        
                        if(!exist){
                            newWords[data.wordID].sylls.push(s);
                        }

                        break;
                    }
                }
            }

            await commit('SET_LIST_WORDS', newWords);

        }

    }

});

export default store;