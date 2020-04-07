import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { socioeconomicModel } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const socioeconomicsApi = new Api('socioeconomics/');

const state = {
    MODEL: socioeconomicModel,
    API: socioeconomicsApi,
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
    socioeconomicsApi
};
