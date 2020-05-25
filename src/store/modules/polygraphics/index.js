import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { polygraphicModel } from './models';

const PAGE_SIZE = 24;

const polygraphicsApi = new Api(axios, 'polygraphics/');
Object.freeze(polygraphicsApi);

const state = {
    MODEL: polygraphicModel,
    API: polygraphicsApi,
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
    polygraphicsApi
};
