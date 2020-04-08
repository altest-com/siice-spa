import { Model, yearReader, yearWriter } from '../abstract/models';

class ApplicationModel extends Model {
    STATUS_CREATED = 'created'
    STATUS_ACCEPTED = 'accepted'
    STATUS_REJECTED = 'rejected'
    STATUS_ARCHIVED = 'archived'

    STATUS_CHOICES = [{
        label: 'Creada',
        value: 'created'
    }, {
        label: 'Aceptada',
        value: 'accepted'
    }, {
        label: 'Rechazada',
        value: 'rejected'
    }, {
        label: 'Archivada',
        value: 'archived'
    }]

    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        status: {
            writable: true,
            api: 'status',
            type: String,
            choices: this.STATUS_CHOICES.map(c => c.value)
        },
        candidate: {
            writable: true,
            api: 'candidate',
            type: Number
        },
        corporation: {
            writable: true,
            api: 'corporation',
            type: Number
        },
        dependency: {
            writable: true,
            api: 'dependency',
            type: Number
        },
        secondment: {
            writable: true,
            api: 'secondment',
            type: Number
        },
        position: {
            writable: true,
            api: 'position',
            type: Number
        },
        document: {
            writable: true,
            api: 'document',
            type: String
        },
        year: {
            writable: true,
            api: 'year',
            type: Date,
            reader: yearReader,
            writer: yearWriter
        },
        createdAt: {
            writable: false,
            api: 'created_at',
            type: Date
        },
        acceptedAt: {
            writable: true,
            api: 'accepted_at',
            type: Date
        },
        rejectedAt: {
            writable: true,
            api: 'rejected_at',
            type: Date
        },
        archivedAt: {
            writable: true,
            api: 'rejected_at',
            type: Date
        },
        updatedAt: {
            writable: false,
            api: 'updated_at',
            type: Date
        }
    }
}

const applicationModel = new ApplicationModel();

class ApplicationFilter extends Model {
    order = [{
        label: 'Nombre', 
        value: 'candidate__name'
    }, {
        label: 'Apellidos', 
        value: 'candidate__last_name'
    }, {
        label: 'Documento origen', 
        value: 'document'
    }, {
        label: 'Fecha de solicitud', 
        value: 'created_at'
    }];

    props = {
        orderBy: {
            writable: true,
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
            writable: true,
            api: 'min_created_at',
            type: Date
        },
        maxCreatedAt: {
            writable: true,
            api: 'max_created_at',
            type: Date
        },
        document: {
            writable: true,
            api: 'document',
            type: String
        },
        corporations: {
            writable: true,
            api: 'corporations',
            type: Number,
            many: true
        },
        dependencies: {
            writable: true,
            api: 'dependency',
            type: Number,
            many: true
        },
        secondments: {
            writable: true,
            api: 'secondments',
            type: Number,
            many: true
        },
        positions: {
            writable: true,
            api: 'positions',
            type: Number,
            many: true
        }
    }
}

const applicationFilter = new ApplicationFilter();

export {
    applicationModel,
    ApplicationModel,
    applicationFilter,
    ApplicationFilter
};
