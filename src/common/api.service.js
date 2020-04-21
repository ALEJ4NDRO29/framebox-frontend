import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { Jwt } from './jwt';
import { FRAMEBOX_API_URL } from "./constants";
import store from '../store'
import { GET_CURRENT_USER } from "../store/actions.types";

export const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = FRAMEBOX_API_URL;

        if (Jwt.get()) {
            this.setHeader();
            store.dispatch(GET_CURRENT_USER);
        }

    },

    setHeader() {
        Vue.axios.defaults.headers.common["Authorization"] = `Token ${Jwt.get()}`;
    },

    removeHeader() {
        delete Vue.axios.defaults.headers.common["Authorization"];
    },

    query(resource, params) {
        return Vue.axios.get(resource, { params });
    },

    get(resource) {
        return Vue.axios.get(resource);
    },

    post(resource, data) {
        return Vue.axios.post(resource, data);
    },

    update(resource, data) {
        return Vue.axios.put(resource, data);
    },

    put(resource, data) {
        return Vue.axios.put(resource, data);
    },

    delete(resource) {
        return Vue.axios.delete(resource);
    }

}

export const Auth = {
    current() {
        return ApiService.get('/auth/current');
    },
    login(credentials) {
        return ApiService.post('/auth/login', credentials);
    },
    register(credentials) {
        return ApiService.post('/auth/register', credentials);
    }
}

export const Profile = {
    get(nickname) {
        return ApiService.get(`/profile/get/${nickname}`);
    },
    getViewed(params) {
        return ApiService.query('/profile/me/viewed', params);
    }
}

export const Resource = {
    get(params) {
        return ApiService.query('/resource', params);
    }
}

export const Review = {
    get(page = 1) {
        return ApiService.query('/review', { page });
    },
    fromUser(nickname, page = 1) {
        return ApiService.query(`/review/nickname/${nickname}`, { page })
    }
}