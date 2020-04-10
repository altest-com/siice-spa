const staticRoutes = [{
    key: 'scheduling',
    meta: {
        title: 'Programación',
        icon: 'scheduling'
    },
    children: [{
        key: '/candidates/index',
        route: { 
            name: 'CandidatesIndex' 
        },        
        meta: {
            title: 'Candidatos'
        }
    }, {
        key: '/applications/index',
        route: { 
            name: 'ApplicationsIndex' 
        },        
        meta: {
            title: 'Solicitudes'
        }
    }, {
        key: '/evaluations/scheduling',
        route: { 
            name: 'EvaluationsIndex', 
            params: { section: 'scheduling' }  
        },        
        meta: {
            title: 'Evaluaciones'
        }
    }, {
        key: '/scheduling/entities',       
        meta: {
            title: 'Entidades'
        },
        children: [{
            key: '/corporations/index',
            route: { 
                name: 'CorporationsIndex' 
            },        
            meta: {
                title: 'Corporaciones'
            }
        }, {
            key: '/dependencies/index',
            route: { 
                name: 'DependenciesIndex' 
            },        
            meta: {
                title: 'Dependencias'
            }
        }, {
            key: '/secondments/index',
            route: { 
                name: 'SecondmentsIndex' 
            },        
            meta: {
                title: 'Adscripciones'
            }
        }, {
            key: '/positions/index',
            route: { 
                name: 'PositionsIndex' 
            },        
            meta: {
                title: 'Puestos'
            }
        }]
    }]
}, {
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'socioeconomic' }
    },
    key: '/evaluations/socioeconomic',
    meta: {
        title: 'Socioeconómico',
        icon: 'socioeconomic'
    }
}, {
    key: '/evaluations/medical',
    meta: {
        title: 'Médico',
        icon: 'medical'
    },
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'socioeconomic' }
    }
}, {
    key: '/evaluations/psychological',
    meta: {
        title: 'Psicológico',
        icon: 'psychological'
    },
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'socioeconomic' }
    }
}, {
    key: '/evaluations/polygraphic',
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
