import {
    RESOURCES_LATEST_LOAD, RESOURCES_LATEST_UNLOAD, RESOURCES_SEARCH,
    RESOURCES_SEARCH_UNLOAD, RESOURCES_DETAILS_LOAD, RESOURCES_DETAILS_UNLOAD, RESOURCES_ADD_VIEWED, RESOURCES_REMOVE_VIEWED
} from "../actions.types";

import {
    SET_LATEST_RESOURCES, UNSET_LATEST_RESOURCES, SET_SEARCH_RESORCES,
    UNSET_SEARCH_RESORCES, SET_RESOURCES_DETAILS, UNSET_RESOURCES_DETAILS,
    SET_RESOURCE_IS_VIEWED, UNSET_RESOURCE_IS_VIEWED, SET_RESOURCE_RATE_AVERAGE,
    UNSET_RESOURCE_RATE_AVERAGE, SET_RESOURCE_REVIEWS, UNSET_RESOURCE_REVIEWS,
    SET_RESOURCE_MY_REVIEW, UNSET_RESOURCE_MY_REVIEW
} from "../mutations.types";
import { Resource } from "../../common/api.service";

const state = {
    resourceDetails: null,
    isViewed: null,
    latestResources: null,
    searchResult: null,
    resourceRateAverage: null,
    reviews: null,
    myReview: null
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

    async [RESOURCES_DETAILS_LOAD]({ commit }, params) {
        var res = await Resource.getDetails(params.slug);
        var resource = res.data;
        commit(SET_RESOURCES_DETAILS, resource);

        if (params.userLogged) {
            Resource.isViewed(params.slug).then((res) => {
                var isViewed = res.data;
                commit(SET_RESOURCE_IS_VIEWED, isViewed);
            });
            Resource.getMyReview(params.slug).then((res) => {
                var myReview = res.data;
                commit(SET_RESOURCE_MY_REVIEW, myReview);
            })
        }

        Resource.getAverage(params.slug).then((res) => {
            var resourceRateAverage = res.data;
            commit(SET_RESOURCE_RATE_AVERAGE, resourceRateAverage);
        });

        Resource.getReviews(params.slug).then((res) => {
            var reviews = res.data;
            commit(SET_RESOURCE_REVIEWS, reviews);
        });
    },
    [RESOURCES_DETAILS_UNLOAD]({ commit }) {
        commit(UNSET_RESOURCES_DETAILS);
        commit(UNSET_RESOURCE_IS_VIEWED);
        commit(UNSET_RESOURCE_RATE_AVERAGE);
        commit(UNSET_RESOURCE_REVIEWS);
        commit(UNSET_RESOURCE_MY_REVIEW);
    },

    async [RESOURCES_ADD_VIEWED]({ commit }, slug) {
        var res = await Resource.setViewed(slug);
        var viewed = res.data;
        commit(SET_RESOURCE_IS_VIEWED, viewed)
    },

    async [RESOURCES_REMOVE_VIEWED]({ commit }, slug) {
        await Resource.unsetViewed(slug);
        commit(SET_RESOURCE_IS_VIEWED, {})
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
    },

    [SET_RESOURCE_RATE_AVERAGE](state, resourceRateAverage) {
        state.resourceRateAverage = resourceRateAverage;
    },
    [UNSET_RESOURCE_RATE_AVERAGE](state) {
        state.resourceRateAverage = null;
    },

    [SET_RESOURCE_REVIEWS](state, reviews) {
        state.reviews = reviews;
    },
    [UNSET_RESOURCE_REVIEWS](state) {
        state.reviews;
    },

    [SET_RESOURCE_MY_REVIEW](state, review) {
        state.myReview = review;
    },
    [UNSET_RESOURCE_MY_REVIEW](state) {
        state.myReview = null;
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
    getResourceRateAverage() {
        return state.resourceRateAverage;
    },
    isResourceViewed() {
        return state.isViewed;
    },
    getResourceReviews() {
        return state.reviews;
    },
    getResourceMyReview() {
        return state.myReview;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};