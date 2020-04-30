import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { alertModel, alertFilter } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const alertsApi = new Api('alerts/');

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
