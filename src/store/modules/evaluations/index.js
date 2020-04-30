import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { evaluationModel, evaluationFilter } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const evaluationsApi = new Api('evaluations/');

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
