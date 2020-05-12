import { Model, dateReader, dateWriter } from '../abstract/models';

class ApplicationModel extends Model {
    STATUS_CREATED = 'created'
    STATUS_ACCEPTED = 'accepted'
    STATUS_REJECTED = 'rejected'
    STATUS_ARCHIVED = 'archived'

    STATUS_CHOICES = {
        [this.STATUS_CREATED]: 'Pendiente',
        [this.STATUS_ACCEPTED]: 'Aceptada',
        [this.STATUS_REJECTED]: 'Rechazada',
        [this.STATUS_ARCHIVED]: 'Archivada'
    }

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
            choices: Object.keys(this.STATUS_CHOICES)
        },
        candidate: {
            writable: true,
            api: 'candidate',
            type: Number
        },
        corporation: {
            writable: false,
            api: 'corporation',
            type: Number
        },
        dependency: {
            writable: false,
            api: 'dependency',
            type: Number
        },
        secondment: {
            writable: false,
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
        date: {
            writable: true,
            api: 'date',
            type: Date,
            reader: dateReader,
            writer: dateWriter
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
    ORDER_CHOICES = {
        'candidate__last_name': 'Candidato',
        'document': 'Documento',
        'date': 'Fecha de oficio',
        'status': 'Estado',        
        'position__secondment__dependency__corporation__name': 'Corporación',
        'position__secondment__dependency__name': 'Dependencia',
        'position__secondment__name': 'Adscripción',
        'position__name': 'Puesto',
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
            api: 'candidate__name__icontains',
            type: String
        },
        lastName: {
            writable: true,
            api: 'candidate__last_name__icontains',
            type: String
        },
        curp: {
            writable: true,
            api: 'candidate__curp__icontains',
            type: String
        },
        document: {
            writable: true,
            api: 'document__icontains',
            type: String
        },
        minDate: {
            writable: true,
            api: 'date__gte',
            type: Number,
            reader: dateReader,
            writer: dateWriter
        },
        maxDate: {
            writable: true,
            api: 'date__lte',
            type: Number,
            reader: dateReader,
            writer: dateWriter
        },
        status: {
            writable: true,
            api: 'status__in',
            type: String,
            choices: Object.keys(applicationModel.STATUS_CHOICES),
            many: true
        },
        corporations: {
            writable: true,
            api: 'position__secondment__dependency__corporation_id__in',
            type: Number,
            many: true
        },
        dependencies: {
            writable: true,
            api: 'position__secondment__dependency_id__in',
            type: Number,
            many: true
        },
        secondments: {
            writable: true,
            api: 'position__secondment_id__in',
            type: Number,
            many: true
        },
        positions: {
            writable: true,
            api: 'position_id__in',
            type: Number,
            many: true
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

const applicationFilter = new ApplicationFilter();

export {
    applicationModel,
    ApplicationModel,
    applicationFilter,
    ApplicationFilter
};
