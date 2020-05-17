import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import VueSchemas from 'vue-schemas';
import 'normalize.css/normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/es';

import App from './App';
import store from './store';
import router from './router';
import { axios } from './api';
import filters from './filters';
import '@/icons';
import '@/styles/index.scss'; // global css
import '@/permission';
import preload from './preload';

/* import sty from '!!raw-loader!./styles/reports.css';

console.log(JSON.stringify(sty)); */

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(VueSchemas, {
    store: store,
    axios: axios,
    apiPath: 'eval-data/',
    components: [
        'SchemasIndex',
        'SchemaEditor',
        'ItemEditor',
        'ItemPrint',
        'AbQuerySelect'
    ]
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

preload(store);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
