import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { candidateModel, candidateFilter } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const candidatesApi = new Api('candidates/');

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
