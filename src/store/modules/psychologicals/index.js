import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { psychologicalModel } from './models';

const PAGE_SIZE = 24;

const psychologicalsApi = new Api(axios, 'psychologicals/');
Object.freeze(psychologicalsApi);

const state = {
    MODEL: psychologicalModel,
    API: psychologicalsApi,
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
    psychologicalsApi
};
