import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import VueSchemas from 'vue-schemas';
import 'normalize.css/normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/es';
import '@/styles/index.scss'; // global css
import App from './App';
import store from './store';
import router from './router';
import filters from './filters';
import '@/icons';
import '@/permission';
import { axios } from './api';

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(VueSchemas, {
    store: store,
    axios: axios,
    apiPath: 'eval-data/'
});

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'error';

Vue.use(VueLogger, {
    isEnabled: true,
    logLevel: logLevel,
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '|',
    showConsoleColors: true
});

for (const filterName of Object.keys(filters)) {
    Vue.filter(filterName, filters[filterName]);
}

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
