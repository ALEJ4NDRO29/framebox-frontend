import { PROFILE_UNLOAD, PROFILE_LOAD } from "../actions.types";
import { Profile } from "../../common/api.service";
import { SET_LOADED_PROFILE, UNSET_LOADED_PROFILE } from "../mutations.types";

const state = {
    profile: null
}

const actions = {
    async [PROFILE_LOAD]({commit}, nickname) {
        var res = await Profile.get(nickname);
        var profile = res.data.profile;

        commit(SET_LOADED_PROFILE, profile);
    },
    async [PROFILE_UNLOAD]({commit}) {
        commit(UNSET_LOADED_PROFILE);
    }
}

const mutations = {
    [SET_LOADED_PROFILE](state, profile) {
        state.profile = profile;
    },
    [UNSET_LOADED_PROFILE](state) {
        state.profile = null;
    }
}

const getters = {
    getProfile() {
        return state.profile;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};
