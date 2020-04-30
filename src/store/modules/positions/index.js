import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { positionModel, positionFilter } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const positionsApi = new Api('positions/');

const state = {
    MODEL: positionModel,
    API: positionsApi,
    FILTER: positionFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: positionFilter.create(),
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
    positionsApi
};
