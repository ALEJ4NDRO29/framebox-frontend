import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, GET_CURRENT_USER } from "../actions.types";
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "../mutations.types";
import { Auth, ApiService } from "../../common/api.service";
import { Jwt } from "../../common/jwt";

const state = {
    currentUser: null
}

const actions = {
    async [GET_CURRENT_USER]({ commit }) {
        try {
            var res = await Auth.current();
            var user = res.data.user;
            commit(SET_CURRENT_USER, user)
        } catch (e) {
            Jwt.remove();
            ApiService.removeHeader();
        }
    },

    async [LOGIN_USER]({ commit }, credentials) {
        var res = await Auth.login(credentials);
        var user = res.data.user;
        commit(SET_CURRENT_USER, user);
    },

    async [REGISTER_USER]({commit}, credentials){
        var res = await Auth.register(credentials);
        var user = res.data.user;
        commit(SET_CURRENT_USER, user);
    },

    async [LOGOUT_USER]({ commit }) {
        commit(REMOVE_CURRENT_USER);
    }
}

const mutations = {
    [SET_CURRENT_USER](state, user) {
        Jwt.set(user.jwt)
        ApiService.setHeader();

        state.currentUser = {
            nickname: user.nickname,
            email: user.email
        }
    },
    [REMOVE_CURRENT_USER](state) {
        Jwt.remove();
        ApiService.removeHeader();
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