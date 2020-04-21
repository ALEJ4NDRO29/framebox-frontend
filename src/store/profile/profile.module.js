import { PROFILE_UNLOAD, PROFILE_LOAD, VIEWED_LOAD, VIEWED_UNLOAD } from "../actions.types";
import { Profile } from "../../common/api.service";
import { SET_LOADED_PROFILE, UNSET_LOADED_PROFILE, SET_VIEWED, UNSET_VIEWED } from "../mutations.types";

const state = {
    profile: null,
    viewed: null
}

const actions = {
    async [PROFILE_LOAD]({ commit }, nickname) {
        var res = await Profile.get(nickname);
        var profile = res.data.profile;

        commit(SET_LOADED_PROFILE, profile);
    },
    async [PROFILE_UNLOAD]({ commit }) {
        commit(UNSET_LOADED_PROFILE);
    },

    async [VIEWED_LOAD]({ commit }, params) {
        var res = await Profile.getViewed(params);
        var viewed = res.data;
        commit(SET_VIEWED, viewed);
    },
    [VIEWED_UNLOAD]({commit}) {
        commit(UNSET_VIEWED);
    }
}

const mutations = {
    [SET_LOADED_PROFILE](state, profile) {
        state.profile = profile;
    },
    [UNSET_LOADED_PROFILE](state) {
        state.profile = null;
    },

    [SET_VIEWED](state, viewed) {
        state.viewed = viewed;
    },
    [UNSET_VIEWED] (state) {
        state.viewed = null;
    }
}

const getters = {
    getProfile() {
        return state.profile;
    },
    getViewed() {
        return state.viewed;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};
