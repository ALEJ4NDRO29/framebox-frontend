import { RESOURCES_LATEST_LOAD, RESOURCES_LATEST_UNLOAD, RESOURCES_SEARCH, RESOURCES_SEARCH_UNLOAD, RESOURCES_DETAILS_LOAD, RESOURCES_DETAILS_UNLOAD } from "../actions.types";
import { SET_LATEST_RESOURCES, UNSET_LATEST_RESOURCES, SET_SEARCH_RESORCES, UNSET_SEARCH_RESORCES, SET_RESOURCES_DETAILS, UNSET_RESOURCES_DETAILS, SET_RESOURCE_IS_VIEWED, UNSET_RESOURCE_IS_VIEWED } from "../mutations.types";
import { Resource } from "../../common/api.service";

const state = {
    resourceDetails: null,
    isViewed: null,
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
    },

    async [RESOURCES_DETAILS_LOAD]({ commit }, slug) {
        var res = await Resource.getDetails(slug);
        var resource = res.data;
        commit(SET_RESOURCES_DETAILS, resource);

        var res2 = await Resource.isViewed(slug);
        var isViewed = res2.data;
        commit(SET_RESOURCE_IS_VIEWED, isViewed);
    },
    [RESOURCES_DETAILS_UNLOAD]({ commit }) {
        commit(UNSET_RESOURCES_DETAILS);
        commit(UNSET_RESOURCE_IS_VIEWED);
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
    },

    [SET_RESOURCES_DETAILS](state, resource) {
        state.resourceDetails = resource;
    },
    [UNSET_RESOURCES_DETAILS](state) {
        state.resourceDetails = null;
    },

    [SET_RESOURCE_IS_VIEWED](state, isViewed) {
       state.isViewed = isViewed; 
    },
    [UNSET_RESOURCE_IS_VIEWED](state) {
        state.isViewed = null;
    }
}

const getters = {
    getLatestResources() {
        return state.latestResources;
    },
    getSearchResult() {
        return state.searchResult;
    },
    getResourceDetails() {
        return state.resourceDetails;
    },
    isResourceViewed() {
        return state.isViewed;        
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};