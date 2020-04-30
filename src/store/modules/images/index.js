import * as actions from './actions';
import * as mutations from './mutations';
import { imageModel } from './models';
import { Api } from '@/api';

const PAGE_SIZE = 24;

const imagesApi = new Api('images/');

const state = {
    MODEL: imageModel,
    API: imagesApi,
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
