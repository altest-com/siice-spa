import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { medicalModel } from './models';

const PAGE_SIZE = 24;

const medicalsApi = new Api(axios, 'medicals/');
Object.freeze(medicalsApi);

const state = {
    MODEL: medicalModel,
    API: medicalsApi,
    FILTER: null,    
    items: {},
    sortId: [],
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
    mutations,
    getters
};

export {
    medicalsApi
};
