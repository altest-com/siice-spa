import { Model } from '../abstract/models';

class CandidateModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        image: {
            writable: true,
            api: 'image',
            type: Number
        },
        name: {
            writable: true,
            api: 'name',
            type: String
        },
        lastName: {
            writable: true,
            api: 'last_name',
            type: String
        },
        curp: {
            writable: true,
            api: 'curp',
            type: String
        },
        createdAt: {
            writable: false,
            api: 'created_at',
            type: Date
        },
        updatedAt: {
            writable: false,
            api: 'updated_at',
            type: Date
        }
    }
}

const candidateModel = new CandidateModel();

class CandidateFilter extends Model {
    order = [{
        label: 'Nombre', 
        value: 'name'
    }, {
        label: 'Apellidos', 
        value: 'last_name'
    }, {
        label: 'Fecha de creación', 
        value: 'created_at'
    }];

    props = {
        orderBy: {
            writable: false,
            api: 'order_by',
            type: String,
            choices: this.order.map(c => c.value)
        },
        name: {
            writable: true,
            api: 'name',
            type: String
        },
        lastName: {
            writable: true,
            api: 'last_name',
            type: String
        },
        curp: {
            writable: true,
            api: 'curp',
            type: String
        },
        minCreatedAt: {
            writable: false,
            api: 'min_created_at',
            type: Date
        },
        maxCreatedAt: {
            writable: false,
            api: 'max_created_at',
            type: Date
        }
    }
}

const candidateFilter = new CandidateFilter();

export {
    candidateModel,
    candidateFilter
};
