import { RESOURCE_ADMIN_LOAD, RESOURCE_ADMIN_UNLOAD } from "../actions.types";
import { SET_RESOURCE_TYPES, UNSET_RESOURCE_TYPES } from "../mutations.types";
import { Resource } from "../../common/api.service";

const state = {
    types: null
}

const actions = {
    async [RESOURCE_ADMIN_LOAD]({ commit }) {
        var res = await Resource.getTypes();
        var types = res.data;
        commit(SET_RESOURCE_TYPES, types);
    },
    [RESOURCE_ADMIN_UNLOAD]({ commit }) {
        commit(UNSET_RESOURCE_TYPES);
    }
}

const mutations = {
    [SET_RESOURCE_TYPES](state, types) {
        state.types = types;
    },
    [UNSET_RESOURCE_TYPES](state) {
        state.types = null;
    }
}

const getters = {
    getResourceTypes() {
        return state.types;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};