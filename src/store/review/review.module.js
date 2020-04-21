import { PROFILE_REVIEWS_LOAD, PROFILE_REVIEWS_UNLOAD } from "../actions.types";
import { Review } from "../../common/api.service";
import { SET_PROFILE_REVIEWS, UNSET_PROFILE_REVIEWS } from "../mutations.types";

const state = {
    profileReviews: null
}

const actions = {
    async [PROFILE_REVIEWS_LOAD]({ commit }, params) {
        var res = await Review.fromUser(params.nickname, params.page);
        var reviews = res.data.reviews;
        commit(SET_PROFILE_REVIEWS, reviews);
    },

    [PROFILE_REVIEWS_UNLOAD]({commit}) {
        commit(UNSET_PROFILE_REVIEWS);
    }
}

const mutations = {
    [SET_PROFILE_REVIEWS](state, reviews) {
        state.profileReviews = reviews;
    },
    [UNSET_PROFILE_REVIEWS](state) {
        state.profileReviews = null;
    }
}

const getters = {
    getProfileReviews() {
        return state.profileReviews;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};