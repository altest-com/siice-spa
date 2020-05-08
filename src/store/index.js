import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import navigation from './modules/navigation';
import settings from './modules/settings';
import users from './modules/users';
import applications from './modules/applications';
import candidates from './modules/candidates';
import corporations from './modules/corporations';
import dependencies from './modules/dependencies';
import evaluations from './modules/evaluations';
import files from './modules/files';
import images from './modules/images';
import medicals from './modules/medicals';
import polygraphics from './modules/polygraphics';
import positions from './modules/positions';
import psychologicals from './modules/psychologicals';
import secondments from './modules/secondments';
import socioeconomics from './modules/socioeconomics';
import toxicologicals from './modules/toxicologicals';
import alerts from './modules/alerts';
import reports from './modules/reports';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        navigation,
        settings,
        users,
        applications,
        candidates,
        corporations,
        dependencies,
        evaluations,
        files,
        images,
        medicals,
        polygraphics,
        positions,
        psychologicals,
        secondments,
        socioeconomics,
        toxicologicals,
        alerts,
        reports
    },
    getters
});

export default store;
