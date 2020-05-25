import { Api, actions, mutations, getters } from 'vrudex';
import { axios } from '@/api';
import { corporationModel, corporationFilter } from './models';
import {candidatesApi} from "@/store/modules/candidates";

const PAGE_SIZE = 24;

const corporationsApi = new Api(axios, 'corporations/');
Object.freeze(candidatesApi);

const state = {
    MODEL: corporationModel,
    API: corporationsApi,
    FILTER: corporationFilter,    
    items: {},
    sortId: [],
    count: 0,
    pageNumber: 0,
    filter: corporationFilter.create(),
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
    corporationsApi
};
