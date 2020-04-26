import { RESOURCE_ADMIN_LOAD, RESOURCE_ADMIN_UNLOAD, RESOURCE_UPDATE_LOAD, RESOURCE_UPDATE_UNLOAD } from "../actions.types";
import { SET_RESOURCE_TYPES, UNSET_RESOURCE_TYPES, SET_RESOURCE_UPDATING, UNSET_RESOURCE_UPDATING } from "../mutations.types";
import { Resource } from "../../common/api.service";

const state = {
    types: null,
    resource: null
}

const actions = {
    async [RESOURCE_ADMIN_LOAD]({ commit }) {
        var res = await Resource.getTypes();
        var types = res.data;
        commit(SET_RESOURCE_TYPES, types);
    },
    [RESOURCE_ADMIN_UNLOAD]({ commit }) {
        commit(UNSET_RESOURCE_TYPES);
    },

    async [RESOURCE_UPDATE_LOAD]({ commit }, slug) {
        var res = await Resource.getDetails(slug)
        var resource = res.data;
        commit(SET_RESOURCE_UPDATING, resource);
    },
    [RESOURCE_UPDATE_UNLOAD]({ commit }) {
        commit(UNSET_RESOURCE_UPDATING);
    }
}

const mutations = {
    [SET_RESOURCE_TYPES](state, types) {
        state.types = types;
    },
    [UNSET_RESOURCE_TYPES](state) {
        state.types = null;
    },

    [SET_RESOURCE_UPDATING](state, resource) {
        state.resource = resource;
    },
    [UNSET_RESOURCE_UPDATING](state) {
        state.resource = null;
    }
}

const getters = {
    getResourceTypes() {
        return state.types;
    },
    getUpdatingResource() {
        return state.resource;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};