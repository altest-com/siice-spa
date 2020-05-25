import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { candidateModel, candidateFilter } from './models';

const PAGE_SIZE = 24;

const candidatesApi = new Api(axios, 'candidates/');
Object.freeze(candidatesApi);

const state = {
    MODEL: candidateModel,
    API: candidatesApi,
    FILTER: candidateFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: candidateFilter.create(),
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
    candidatesApi
};
