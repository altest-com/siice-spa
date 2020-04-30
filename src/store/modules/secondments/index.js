import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { secondmentModel, secondmentFilter } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const secondmentsApi = new Api('secondments/');

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
