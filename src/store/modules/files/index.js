import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { fileModel } from './models';

const PAGE_SIZE = 24;

const filesApi = new Api(axios, 'files/');
Object.freeze(filesApi);

const state = {
    MODEL: fileModel,
    API: filesApi,
    items: {},
    count: 0,
    pageNumber: 0,
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
