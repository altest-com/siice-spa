import { Model } from 'vrudex';

class SecondmentModel extends Model {
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
        dependency: {
            writable: true,
            api: 'dependency',
            type: Number
        },
        corporation: {
            writable: false,
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

const secondmentModel = new SecondmentModel();
Object.freeze(secondmentModel);

class SecondmentFilter extends Model {
    ORDER_CHOICES = {
        'name': 'Nombre',
        'dependency__name': 'Dependencia',
        'dependency__corporation__name': 'Corporación',
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
        dependencies: {
            writable: true,
            api: 'dependency_id__in',
            type: Number,
            many: true
        },
        corporations: {
            writable: true,
            api: 'dependency__corporation_id__in',
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

const secondmentFilter = new SecondmentFilter();
Object.freeze(secondmentFilter);

export {
    secondmentModel,
    secondmentFilter
};
