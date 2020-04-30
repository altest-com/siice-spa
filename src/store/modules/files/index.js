import * as actions from './actions';
import * as mutations from './mutations';
import { fileModel } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const filesApi = new Api('files/');

const state = {
    MODEL: fileModel,
    API: filesApi,
    FILTER: null,
    items: {},
    count: 0,
    pageNumber: 0,
    filter: null,
    pageSize: PAGE_SIZE,
    loading: false,
    getting: {}
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
