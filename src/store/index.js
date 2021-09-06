import { createStore } from 'vuex';
import words from '../mock/words';

const store = createStore({
    state: {
        words: words,
        searched: null,
        sylls: [],
        sorted: [],
    },
    getters: {
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
        getSylls:state => {
            return JSON.parse(JSON.stringify(state.sylls));
        },
        getSortedSylls:state => {
            return JSON.parse(JSON.stringify(state.sortedSylls));
        },
    },
    mutations: {
        SET_LIST_WORDS: (state, data) => {
            state.words = data;
        },
        SET_LIST_SYLLS: (state, data) => {
            state.sylls = data
        },
        SET_LIST_SORTED: (state, data) => {
            state.sorted = data
        },
    },
    actions: {
        updateSylls({ commit }, data) {        
            commit('SET_LIST_SYLLS', data);
        }, 
        updateSorted({ commit }, data) {        
            commit('SET_LIST_SORTED', data);
        }, 
        onWordsListener ({ commit }) { 
            let data = words;
            commit('SET_LIST_WORDS', data);   
        }
    }
});

export default store;