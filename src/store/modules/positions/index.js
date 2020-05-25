import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { positionModel, positionFilter } from './models';

const PAGE_SIZE = 24;

const positionsApi = new Api(axios, 'positions/');
Object.freeze(positionsApi);

const state = {
    MODEL: positionModel,
    API: positionsApi,
    FILTER: positionFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: positionFilter.create(),
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
    positionsApi
};
