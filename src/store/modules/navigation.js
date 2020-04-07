const staticRoutes = [{
    key: 'Programming',
    meta: {
        title: 'Programación',
        icon: 'dashboard'
    },
    children: [{
        route: { name: 'CandidatesIndex' },
        key: 'CandidatesIndex',
        meta: {
            title: 'Candidatos',
            icon: 'dashboard'
        }
    }, {
        route: { name: 'ApplicationsIndex' },
        key: 'ApplicationsIndex',
        meta: {
            title: 'Solicitudes',
            icon: 'dashboard'
        }
    }, {
        route: { name: 'EvaluationsIndex' },
        key: 'EvaluationsIndex',
        meta: {
            title: 'Evaluaciones',
            icon: 'dashboard'
        }
    }]
}];

const state = {
    routes: staticRoutes
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = routes;   
    }
};

const actions = {    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
