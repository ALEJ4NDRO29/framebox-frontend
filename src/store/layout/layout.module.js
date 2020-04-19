import { ALERT, ALERT_CLOSE } from "../actions.types";
import { SET_ALERT, UNSET_ALERT } from "../mutations.types";

const initialAlert = {
    visible: false
}

const state = {
    dialogAlert: initialAlert
}

const actions = {
    [ALERT]({ commit }, alert) {
        commit(SET_ALERT, alert);
    },

    [ALERT_CLOSE]({ commit }) {
        commit(UNSET_ALERT);
    }
}

const mutations = {
    [SET_ALERT](state, alert) {
        state.dialogAlert = {
            visible: true,
            ...alert
        }
    },

    [UNSET_ALERT](state) {
        if(state.dialogAlert.visible)
            state.dialogAlert = initialAlert;
    }
}

const getters = {
    getDialogAlert() {
        return state.dialogAlert
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};