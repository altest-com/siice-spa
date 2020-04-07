import defaultSettings from '@/settings';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
};

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (hasOwnProperty.call(state, key)) {
            state[key] = value;
        }
    }
};

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
