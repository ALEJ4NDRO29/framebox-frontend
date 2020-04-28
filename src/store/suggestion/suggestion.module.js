import { SUGGESTION_FORM_LOAD, SUGGESTION_FORM_UNLOAD, SUGGESTION_LIST_LOAD, SUGGESTION_LIST_UNLOAD } from "../actions.types";
import { Suggestion } from "../../common/api.service";
import { SET_SUGGESTION_TYPES, UNSET_SUGGESTION_TYPES, SET_SUGGESTIONS_LIST, UNSET_SUGGESTIONS_LIST } from "../mutations.types";

const state = {
    types: null,
    suggestions: null
}

const actions = {
    async [SUGGESTION_FORM_LOAD]({ commit }) {
        var res = await Suggestion.getTypes();
        var types = res.data;
        commit(SET_SUGGESTION_TYPES, types);
    },
    [SUGGESTION_FORM_UNLOAD]({ commit }) {
        commit(UNSET_SUGGESTION_TYPES);
    },

    async [SUGGESTION_LIST_LOAD]({ commit }, params) {
        var res = await Suggestion.get(params);
        var suggestions = res.data;
        commit(SET_SUGGESTIONS_LIST, suggestions);
    },
    [SUGGESTION_LIST_UNLOAD]({ commit }) {
        commit(UNSET_SUGGESTIONS_LIST);
    }
}

const mutations = {
    [SET_SUGGESTION_TYPES](state, types) {
        state.types = types;
    },
    [UNSET_SUGGESTION_TYPES](state) {
        state.types = null;
    },

    [SET_SUGGESTIONS_LIST](state, suggestions) {
        state.suggestions = suggestions;
    },
    [UNSET_SUGGESTIONS_LIST](state) {
        state.suggestions = null;
    }
}

const getters = {
    getSuggestionTypes() {
        return state.types;
    },
    getSuggestions() {
        return state.suggestions;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};