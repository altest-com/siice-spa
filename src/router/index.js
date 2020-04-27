import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    }, {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    }, {
        path: '/',
        component: Layout,
        redirect: '/evaluations'
    }, {
        path: '/schemas',
        component: Layout,
        children: [{
            path: 'index',
            name: 'SchemasIndex',
            component: () => import('@/views/Schemas/SchemasIndex'),
            meta: {
                title: 'Formularios',
                icon: 'dashboard'
            }
        }, {
            path: 'editor/:schemaId',
            name: 'SchemaEditor',
            component: () => import('@/views/Schemas/SchemaEditor'),            
            hidden: true,
            props: true
        }]
    }, {
        path: '/candidates',
        component: Layout,
        children: [{
            path: 'index',
            name: 'CandidatesIndex',
            component: () => import('@/views/Candidates/index')
        }]
    }, {
        path: '/corporations',
        component: Layout,
        children: [{
            path: 'index',
            name: 'CorporationsIndex',
            component: () => import('@/views/Corporations/index')
        }]
    }, {
        path: '/dependencies',
        component: Layout,
        children: [{
            path: 'index',
            name: 'DependenciesIndex',
            component: () => import('@/views/Dependencies/index')
        }]
    }, {
        path: '/secondments',
        component: Layout,
        children: [{
            path: 'index',
            name: 'SecondmentsIndex',
            component: () => import('@/views/Secondments/index')
        }]
    }, {
        path: '/positions',
        component: Layout,
        children: [{
            path: 'index',
            name: 'PositionsIndex',
            component: () => import('@/views/Positions/index')
        }]
    }, {
        path: '/applications',
        component: Layout,
        children: [{
            path: 'index',
            name: 'ApplicationsIndex',
            component: () => import('@/views/Applications/index')
        }]
    }, {
        path: '/evaluations',
        component: Layout,
        children: [{
            path: ':section',
            name: 'EvaluationsIndex',
            component: () => import('@/views/Evaluations/index'),
            props: true
        }, {
            path: ':evaluationId/:section/',
            name: 'EvalSectionIndex',
            component: () => import('@/views/EvalSection/EvalSectionIndex'),
            props: true
        }]
    }, { 
        /* 404 page must be placed at the end !!! */
        path: '*',
        redirect: '/404',
        hidden: true
    }
];

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
