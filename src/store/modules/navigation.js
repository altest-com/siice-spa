const staticRoutes = [{
    key: '/dashboard',
    route: { 
        name: 'DashboardIndex'
    },    
    meta: {
        title: 'Estadísticas',
        icon: 'dashboard'
    }
}, {
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
    key: '/evaluations/socioeconomic',
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'socioeconomic' }
    },    
    meta: {
        title: 'Socioeconómico',
        icon: 'socioeconomic'
    }
}, {
    key: '/evaluations/medical',
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'medical' }
    },
    meta: {
        title: 'Médico',
        icon: 'medical'
    }
}, {
    key: '/evaluations/psychological',
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'psychological' }
    },
    meta: {
        title: 'Psicológico',
        icon: 'psychological'
    }
}, {
    key: '/evaluations/polygraphic',
    route: { 
        name: 'EvaluationsIndex', 
        params: { section: 'polygraphic' }
    },
    meta: {
        title: 'Poligráfico',
        icon: 'polygraphic'
    }
}, {
    key: '/schemas/index',
    route: { 
        name: 'SchemasIndex'
    },
    meta: {
        title: 'Formularios',
        icon: 'forms'
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
