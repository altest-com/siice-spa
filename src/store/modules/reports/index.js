import { Api } from '@/api';
import { saveAs } from 'file-saver';

const reportsApi = new Api('reports/');

const mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading;
    }
};

const actions = {
    print(context, params = {}) {    
        return new Promise((resolve, reject) => {
            reportsApi.download(params, 'post').then((response) => {
                const fileNameHeader = 'filename';
                let fileName = response.headers[fileNameHeader];
                if (!fileName) {
                    const date = new Date().toISOString().slice(0, 16);
                    fileName = `report-${date}.pdf`;
                }
                saveAs(response.data, fileName);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
};

const state = {
    loading: false
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};

export {
    reportsApi
};
