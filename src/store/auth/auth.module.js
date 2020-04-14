import { LOGIN_USER, LOGOUT_USER } from "../actions.types";
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "../mutations.types";

const state = {
    currentUser: null
}

const actions = {
    async [LOGIN_USER]({ commit }, credentials) {
        // TODO
        commit;
        credentials;
    },
    async [LOGOUT_USER]({ commit }, credentials) {
        // TODO
        commit;
        credentials;
    }
}

const mutations = {
    [SET_CURRENT_USER](state, user) {
        state.currentUser = user;
    },
    [REMOVE_CURRENT_USER](state) {
        state.currentUser = null;
    }
}

const getters = {
    getCurrentUser() {
        return state.currentUser;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};