import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { toxicologicalModel } from './models';

const PAGE_SIZE = 24;

const toxicologicalsApi = new Api(axios, 'toxicologicals/');
Object.freeze(toxicologicalsApi);

const state = {
    MODEL: toxicologicalModel,
    API: toxicologicalsApi,
    FILTER: null,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: null,
    pageSize: PAGE_SIZE,
    loading: false,
    getting: {}
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

export {
    toxicologicalsApi
};
