import { RESOURCES_LATEST_LOAD, RESOURCES_LATEST_UNLOAD, RESOURCES_SEARCH, RESOURCES_SEARCH_UNLOAD } from "../actions.types";
import { SET_LATEST_RESOURCES, UNSET_LATEST_RESOURCES, SET_SEARCH_RESORCES, UNSET_SEARCH_RESORCES } from "../mutations.types";
import { Resource } from "../../common/api.service";

const state = {
    latestResources: null,
    searchResult: null
}

const actions = {
    async [RESOURCES_LATEST_LOAD]({ commit }) {
        var res = await Resource.get({ limit: 5 });
        var resources = res.data;
        commit(SET_LATEST_RESOURCES, resources);
    },
    [RESOURCES_LATEST_UNLOAD]({ commit }) {
        commit(UNSET_LATEST_RESOURCES);
    },

    async [RESOURCES_SEARCH]({ commit }, params) {
        var res = await Resource.get(params);
        var resources = res.data;
        commit(SET_SEARCH_RESORCES, resources);
    },
    [RESOURCES_SEARCH_UNLOAD]({ commit }) {
        commit(UNSET_SEARCH_RESORCES)
    }
}

const mutations = {
    [SET_LATEST_RESOURCES](state, resources) {
        state.latestResources = resources;
    },
    [UNSET_LATEST_RESOURCES](state) {
        state.latestResources = null;
    },

    [SET_SEARCH_RESORCES](state, resources) {
        state.searchResult = resources;
    },
    [UNSET_SEARCH_RESORCES](state) {
        state.searchResult = null;
    }
}

const getters = {
    getLatestResources() {
        return state.latestResources;
    },
    getSearchResult() {
        return state.searchResult;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};