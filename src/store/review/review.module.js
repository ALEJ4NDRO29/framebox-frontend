import { PROFILE_REVIEWS_LOAD, PROFILE_REVIEWS_UNLOAD, REVIEWS_LATEST_LOAD, REVIEWS_LATEST_UNLOAD } from "../actions.types";
import { Review } from "../../common/api.service";
import { SET_PROFILE_REVIEWS, UNSET_PROFILE_REVIEWS, SET_LATEST_REVIEWS, UNSET_LATEST_REVIEWS } from "../mutations.types";

const state = {
    latestReviews: null,
    profileReviews: null
}

const actions = {
    async [PROFILE_REVIEWS_LOAD]({ commit }, params) {
        var res = await Review.fromUser(params.nickname, params.page);
        var reviews = res.data.reviews;
        commit(SET_PROFILE_REVIEWS, reviews);
    },
    [PROFILE_REVIEWS_UNLOAD]({ commit }) {
        commit(UNSET_PROFILE_REVIEWS);
    },

    async [REVIEWS_LATEST_LOAD]({ commit }) {
        var res = await Review.get();
        var reviews = res.data.reviews;
        commit(SET_LATEST_REVIEWS, reviews);
    },
    [REVIEWS_LATEST_UNLOAD]({ commit }) {
        commit(UNSET_LATEST_REVIEWS);
    }

}

const mutations = {
    [SET_PROFILE_REVIEWS](state, reviews) {
        state.profileReviews = reviews;
    },
    [UNSET_PROFILE_REVIEWS](state) {
        state.profileReviews = null;
    },

    [SET_LATEST_REVIEWS](state, reviews) {
        state.latestReviews = reviews
    },
    [UNSET_LATEST_REVIEWS](state) {
        state.latestReviews = null;
    }
}

const getters = {
    getProfileReviews() {
        return state.profileReviews;
    },
    getLatestReviews() {
        return state.latestReviews;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};