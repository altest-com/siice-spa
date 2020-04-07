import Vue from 'vue';
import Jwt from '@/jwt';
import { setHeader } from '@/api';
import { resetRouter } from '@/router';

/* class MockUserApi {
    login(data) {
        return new Promise(resolve => {
            resolve({
                user: 'mock',
                token: 'mock'
            });
        });
    }

    check() {
        return new Promise(resolve => {
            resolve({
                user: 'mock',
                token: 'mock'
            });
        });
    }
} */

class UserApi {
    login(data) {
        return Vue.axios.post('login/', data);
    }

    check() {
        return Vue.axios.get('users/');
    }
}

const userApi = new UserApi('users');
/* const userApi = new MockUserApi('users'); */

const namespace = 'users/';

const mutTypes = {
    SET_ERROR: 'SET_ERROR',
    SET_AUTH: 'SET_AUTH',
    PURGE_AUTH: 'PURGE_AUTH'
};

const actTypes = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    CHECK_AUTH: 'checkAuth'
};

const state = {
    errors: null,
    user: null,
    isAuthenticated: false
};

const mutations = {
    SET_ERROR(state, error) {
        state.errors = error;
    },

    SET_AUTH(state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        Jwt.saveToken(state.user.token);
    },

    PURGE_AUTH(state) {
        state.isAuthenticated = false;
        state.user = null;
        state.errors = null;
        Jwt.destroyToken();
    }
};

const actions = {

    login(context, credentials) {
        return new Promise((resolve, reject) => {
            userApi.login(credentials)
                .then(({ data }) => {
                    context.commit('SET_AUTH', data);
                    resolve(data);
                })
                .catch(() => {
                    context.commit('SET_ERROR', 'Error de autenticación');
                    reject('Error de autenticación');
                });
        });
    },

    logout(context) {
        context.commit('PURGE_AUTH');
        resetRouter();
    },

    checkAuth(context) {
        return new Promise((resolve, reject) => {
            try {
                if (Jwt.getToken()) {
                    setHeader();
                    userApi.check()
                        .then(({ data }) => {
                            context.commit('SET_AUTH', data);
                            resolve(data);
                        })
                        .catch((response) => {
                            context.commit('SET_ERROR', 'Error de autenticación');
                            reject('Error de autenticación');
                        });
                } else {
                    context.commit('PURGE_AUTH');
                    reject('Error de autenticación');
                }
            } catch (error) {
                reject(error);
            }
        });
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};

export { 
    namespace, 
    mutTypes, 
    actTypes 
};
