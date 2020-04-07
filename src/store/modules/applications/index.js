import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { applicationModel, applicationFilter } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const applicationsApi = new Api('applications/');

const state = {
    MODEL: applicationModel,
    API: applicationsApi,
    FILTER: applicationFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: applicationFilter.create(),
    orderBy: 'last_name',
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
