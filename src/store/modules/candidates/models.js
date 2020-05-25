import { Model } from 'vrudex';

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
Object.freeze(candidateModel);

class CandidateFilter extends Model {

    ORDER_CHOICES = {
        'name': 'Nombre',
        'last_name': 'Apellidos',
        'curp': 'CURP',
        'created_at': 'Fecha de creación'        
    }

    props = {
        orderBy: {
            writable: true,
            api: 'order_by',
            type: String,
            default: '-created_at'
        },
        name: {
            writable: true,
            api: 'name__icontains',
            type: String
        },
        lastName: {
            writable: true,
            api: 'last_name__icontains',
            type: String
        },
        curp: {
            writable: true,
            api: 'curp__icontains',
            type: String
        },
        minCreatedAt: {
            writable: true,
            api: 'created_at__gte',
            type: Date
        },
        maxCreatedAt: {
            writable: true,
            api: 'created_at__lte',
            type: Date
        }
    }
}

const candidateFilter = new CandidateFilter();
Object.freeze(candidateFilter);

export {
    candidateModel,
    candidateFilter
};
