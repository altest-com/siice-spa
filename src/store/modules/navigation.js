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
        route: { 
            name: 'EvaluationsIndex', 
            params: { section: 'scheduling' }  
        },
        key: 'EvaluationsIndex',
        meta: {
            title: 'Evaluaciones',
            icon: 'dashboard'
        }
    }]
}, {
    key: 'Socioeconomic',
    meta: {
        title: 'Socioeconómico',
        icon: 'socioeconomic'
    },
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'socioeconomic' }
    }
}, {
    key: 'Medical',
    meta: {
        title: 'Médico',
        icon: 'medical'
    },
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'socioeconomic' }
    }
}, {
    key: 'Psychological',
    meta: {
        title: 'Psicológico',
        icon: 'psychological'
    },
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'socioeconomic' }
    }
}, {
    key: 'Polygraphic',
    meta: {
        title: 'Poligráfico',
        icon: 'polygraphic'
    },
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'socioeconomic' }
    }
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
