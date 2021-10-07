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
        getSyllableById: state => id => {
            if(id==null) id=1;
            var syll = null;
            for(let key in state.syllables){
                let x = JSON.parse(JSON.stringify(state.syllables[key]));
                if(x.id == id){
                    syll = x;                    
                    break;
                }
            }
            return syll;
        },
        getWordByName: state => name => {
            var word = null;
            for(let key in state.words){
                let x = JSON.parse(JSON.stringify(state.words[key]))
                if(x.name.toUpperCase() == name.toUpperCase()){
                    word = x;
                    break;
                }
            }
            return word;
        },
        getWordById: state => id => {
            if(id==null) id=1;
            var word = null;
            for(let key in state.words){
                let x = JSON.parse(JSON.stringify(state.words[key]));
                if(x.id == id){
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

        async addSyllableIntoWord({ commit, state }, data){
            const newWords= JSON.parse(JSON.stringify([...state.words]));
            let exist = false;
            for(let key in newWords[data.wordID].sylls){                
                let x = newWords[data.wordID].sylls[key];
                if(x.id == data.addSyll.id){
                    exist = true;                    
                    break;
                }
            }
            if(!exist)
                newWords[data.wordID].sylls.push(data.addSyll);

            await commit('SET_LIST_WORDS', newWords); 
        },
    }
});

export default store;