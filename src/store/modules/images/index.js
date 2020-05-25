import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { imageModel } from './models';

const PAGE_SIZE = 24;

const imagesApi = new Api(axios, 'images/');
Object.freeze(imagesApi);

const state = {
    MODEL: imageModel,
    API: imagesApi,
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

export {
    imagesApi
};

