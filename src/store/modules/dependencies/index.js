import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { dependencyModel, dependencyFilter } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const dependenciesApi = new Api('dependencies/');

const state = {
    MODEL: dependencyModel,
    API: dependenciesApi,
    FILTER: dependencyFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: dependencyFilter.create(),
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
    dependenciesApi
};
