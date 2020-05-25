import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Jwt from '@/jwt';
import Qs from 'qs';

const API_URL = process.env.VUE_APP_API_URL;

const getHeader = function() {
    return { 
        Authorization: `Token ${Jwt.getToken()}` 
    };
};

const setHeader = function() {
    const token = `Token ${Jwt.getToken()}`;
    Vue.axios.defaults.headers.common['Authorization'] = token;
};

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = API_URL;

class Api {
    constructor(path = '') {        
        if (path.length && path[path.length - 1] !== '/') {
            path += '/'; 
        }
        this.path = path;
    }

    fetch(params = {}) {
        return this.axios.get(this.path, {
            params: params,
            paramsSerializer: (p) => {
                return Qs.stringify(p, { arrayFormat: 'repeat' });
            }
        });
    }
    
    retrieve(id = '', params = {}) {
        return this.axios.get(this.path + id + '/', { params: params });
    }
    
    create(params) {
        return Vue.axios.post(this.path, params);
    }

    update(id, params) {
        return Vue.axios.patch(this.path + id + '/', params);
    }
    
    destroy(id) {
        return Vue.axios.delete(this.path + id + '/');
    }

    download(params = {}, method = 'get') {
        if (method === 'get') {
            return Vue.axios.get(this.path, {
                responseType: 'blob',
                params: params
            });
        } else if (method === 'post') {
            return Vue.axios.post(this.path, params, {
                responseType: 'blob'
            });
        }
    }
}

export {
    Api,
    axios,
    getHeader,
    setHeader,
    API_URL
};

