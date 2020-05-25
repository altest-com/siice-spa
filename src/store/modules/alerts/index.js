import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { alertModel, alertFilter } from './models';

const PAGE_SIZE = 24;

const alertsApi = new Api(axios, 'alerts/');
Object.freeze(alertsApi);

const state = {
    MODEL: alertModel,
    API: alertsApi,
    FILTER: alertFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: alertFilter.create(),
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
    alertsApi
};
