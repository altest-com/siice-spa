import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { dependencyModel } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const dependenciesApi = new Api('dependencies/');

const state = {
    MODEL: dependencyModel,
    API: dependenciesApi,
    FILTER: null,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: null,
    orderBy: 'created_at',
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
