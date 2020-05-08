import { Model } from '../abstract/models';

class CorporationModel extends Model {
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

const corporationModel = new CorporationModel();

class CorporationFilter extends Model {
    ORDER_CHOICES = {
        'name': 'Nombre',
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
        minCreatedAt: {
            writable: false,
            api: 'created_at__gte',
            type: Date
        },
        maxCreatedAt: {
            writable: false,
            api: 'created_at__lte',
            type: Date
        }
    }
}

const corporationFilter = new CorporationFilter();

export {
    corporationModel,
    corporationFilter
};
