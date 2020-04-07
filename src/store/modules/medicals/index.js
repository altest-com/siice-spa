import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { medicalModel } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const medicalsApi = new Api('medicals/');

const state = {
    MODEL: medicalModel,
    API: medicalsApi,
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
    medicalsApi
};
