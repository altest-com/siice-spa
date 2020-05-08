import { Model, dateReader, dateWriter } from '../abstract/models';

class PositionModel extends Model {
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
        secondment: {
            writable: true,
            api: 'secondment',
            type: Number
        },
        dependency: {
            writable: false,
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

const positionModel = new PositionModel();

class PositionFilter extends Model {
    ORDER_CHOICES = {
        'name': 'Nombre',
        'secondment__name': 'Adscripción',
        'secondment__dependency__name': 'Dependencia',
        'secondment__dependency__corporation__name': 'Corporación',
        'created_at': 'Fecha de creación'
    }

    props = {
        orderBy: {
            writable: true,
            api: 'order_by',
            type: String,
            choices: Object.keys(this.ORDER_CHOICES)
        },
        name: {
            writable: true,
            api: 'name__icontains',
            type: String
        },
        secondments: {
            writable: true,
            api: 'secondment_id__in',
            type: Number,
            many: true
        },
        dependencies: {
            writable: true,
            api: 'secondment__dependency_id__in',
            type: Number,
            many: true
        },
        corporations: {
            writable: true,
            api: 'secondment__dependency__corporation_id__in',
            type: Number,
            many: true
        },
        minCreatedAt: {
            writable: false,
            api: 'min_created_at',
            type: Date,
            reader: dateReader,
            writer: dateWriter
        },
        maxCreatedAt: {
            writable: false,
            api: 'max_created_at',
            type: Date,
            reader: dateReader,
            writer: dateWriter
        }
    }
}

const positionFilter = new PositionFilter();

export {
    positionModel,
    positionFilter
};
