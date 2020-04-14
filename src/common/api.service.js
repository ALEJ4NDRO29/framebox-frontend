import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { Jwt } from './jwt';
import { FRAMEBOX_API_URL } from "./constants";


export const ApiService =  {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = FRAMEBOX_API_URL;
        
        if (Jwt.get()) {
            this.setHeader();
        }
    },

    setHeader() {
        Vue.axios.defaults.headers.common["Authorization"] = `Token ${Jwt.get()}`;
    },

}
