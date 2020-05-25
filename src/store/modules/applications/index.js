import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { applicationModel, applicationFilter } from './models';

const PAGE_SIZE = 24;

const applicationsApi = new Api(axios, 'applications/');
Object.freeze(applicationsApi);

const state = {
    MODEL: applicationModel,
    API: applicationsApi,
    FILTER: applicationFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: applicationFilter.create(),
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
    applicationsApi
};
