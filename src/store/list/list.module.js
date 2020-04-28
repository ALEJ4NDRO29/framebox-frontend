import { LIST_LOAD, LIST_UNLOAD, LIST_DETAILS_LOAD, LIST_DETAILS_UNLOAD, LIST_UPDATING_LOAD, LIST_UPDATING_UNLOAD, LIST_CONTENT_UPDATE } from "../actions.types";
import { List } from "../../common/api.service";
import { SET_LISTS, UNSET_LISTS, SET_LIST_DETAILS, UNSET_LIST_DETAILS, SET_UPDATING_LIST, UNSET_UPDATING_LIST, SET_LIST_CONTENT, UNSET_LIST_CONTENT } from "../mutations.types";

const state = {
    userLists: null,
    currentList: null,
    listContent: null,
    updatingList: null
}

const actions = {
    async [LIST_LOAD]({ commit }, params) {
        var res = await List.get(params);
        var lists = res.data;
        commit(SET_LISTS, lists);
    },
    [LIST_UNLOAD]({ commit }) {
        commit(UNSET_LISTS);
    },

    [LIST_DETAILS_LOAD]({ commit }, params) {
        List.getDetails(params.slug).then((res) => {
            var list = res.data;
            commit(SET_LIST_DETAILS, list);
        });
        List.getContent(params.slug, params.paginate).then((res) => {
            var content = res.data;
            commit(SET_LIST_CONTENT, content);
        });
    },
    [LIST_DETAILS_UNLOAD]({ commit }) {
        commit(UNSET_LIST_DETAILS);
        commit(UNSET_LIST_CONTENT);
    },

    async [LIST_CONTENT_UPDATE] ({commit}, params){
        var listSlug = params.slug;
        var pagination = params.pagination;
        
        var res = await List.getContent(listSlug, pagination)
        var content = res.data;
        commit(SET_LIST_CONTENT, content);
    },

    async [LIST_UPDATING_LOAD]({commit}, slug) {
        var res = await List.getDetails(slug);
        var list = res.data;
        commit(SET_UPDATING_LIST, list);
    },
    [LIST_UPDATING_UNLOAD]({commit}) {
        commit(UNSET_UPDATING_LIST);
    }
}

const mutations = {
    [SET_LISTS](state, lists) {
        state.userLists = lists;
    },
    [UNSET_LISTS](state) {
        state.userLists = null;
    },

    [SET_LIST_DETAILS](state, list) {
        state.currentList = list;
    },
    [UNSET_LIST_DETAILS](state) {
        state.currentList = null;
    },

    [SET_LIST_CONTENT](state, content) {
        state.listContent = content;
    },
    [UNSET_LIST_CONTENT] (state) {
        state.listContent = null;
    },

    [SET_UPDATING_LIST](state, list) {
        state.updatingList = list;
    },
    [UNSET_UPDATING_LIST](state) {
        state.updatingList = null;
    }
}

const getters = {
    getUserLists() {
        return state.userLists;
    },
    getCurrentList() {
        return state.currentList;
    },
    getListContent() {
        return state.listContent;
    },
    getUpdatingList() {
        return state.updatingList;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};