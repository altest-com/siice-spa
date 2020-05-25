import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { evaluationModel, evaluationFilter } from './models';

const PAGE_SIZE = 24;

const evaluationsApi = new Api(axios, 'evaluations/');
Object.freeze(evaluationsApi);

const state = {
    MODEL: evaluationModel,
    API: evaluationsApi,
    FILTER: evaluationFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: evaluationFilter.create(),
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
    evaluationsApi
};
