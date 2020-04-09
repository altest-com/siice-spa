import { Model, dateReader, dateWriter } from '../abstract/models';

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
            api: 'name',
            type: String
        },
        corporations: {
            writable: true,
            api: 'corporations',
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

const dependencyFilter = new DependencyFilter();

export {
    dependencyModel,
    dependencyFilter
};
