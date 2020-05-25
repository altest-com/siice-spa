import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { dependencyModel, dependencyFilter } from './models';

const PAGE_SIZE = 24;

const dependenciesApi = new Api(axios, 'dependencies/');
Object.freeze(dependenciesApi);

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
