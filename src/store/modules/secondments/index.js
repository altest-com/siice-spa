import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { secondmentModel, secondmentFilter } from './models';

const PAGE_SIZE = 24;

const secondmentsApi = new Api(axios, 'secondments/');
Object.freeze(secondmentsApi);

const state = {
    MODEL: secondmentModel,
    API: secondmentsApi,
    FILTER: secondmentFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: secondmentFilter.create(),
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
    secondmentsApi
};
