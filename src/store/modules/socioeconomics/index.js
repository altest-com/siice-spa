import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { socioeconomicModel } from './models';

const PAGE_SIZE = 24;

const socioeconomicsApi = new Api(axios, 'socioeconomics/');
Object.freeze(socioeconomicsApi);

const state = {
    MODEL: socioeconomicModel,
    API: socioeconomicsApi,
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
    socioeconomicsApi
};
