import { Model } from '../abstract/models';

class DependencyModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        name: {
            writable: true,
            api: 'name',
            type: String
        },
        corporation: {
            writable: true,
            api: 'corporation',
            type: Number
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

const dependencyModel = new DependencyModel();

class DependencyFilter extends Model {
    ORDER_CHOICES = {
        'name': 'Nombre',
        'created_at': 'Fecha de creación',
        'corporation__name': 'Corporación'
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
        corporations: {
            writable: true,
            api: 'corporation_id__in',
            type: Number,
            many: true
        },
        minCreatedAt: {
            writable: false,
            api: 'created_at__gte',
            type: Date
        },
        maxCreatedAt: {
            writable: false,
            api: 'created_at__gte',
            type: Date
        }
    }
}

const dependencyFilter = new DependencyFilter();

export {
    dependencyModel,
    dependencyFilter
};
