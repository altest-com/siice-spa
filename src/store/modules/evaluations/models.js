import { Model, dateReader, dateWriter } from '../abstract/models';
import { applicationModel } from '../applications/models';

class EvalSectionModel extends Model {
    STATUS_CREATED = 'created'
    STATUS_STARTED = 'started'
    STATUS_FINISHED = 'finished'

    STATUS_CHOICES = {
        created: 'Programado',
        started: 'En curso',
        finished: 'Finalizado'
    }

    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        evaluation: {
            writable: false,
            api: 'evaluation',
            type: Number
        },
        evalData: {
            writable: false,
            api: 'eval_data',
            type: Number
        },
        status: {
            writable: true,
            api: 'status',
            type: String,
            choices: Object.keys(this.STATUS_CHOICES)
        },
        result: {
            writable: true,
            api: 'result',
            type: String
        },
        passed: {
            writable: true,
            api: 'passed',
            type: Boolean
        },
        scheduledAt: {
            writable: true,
            api: 'scheduled_at',
            type: Date
        },
        startedAt: {
            writable: true,
            api: 'started_at',
            type: Date
        },
        finishedAt: {
            writable: true,
            api: 'finished_at',
            type: Date
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

const evalSectionModel = new EvalSectionModel();

class EvaluationModel extends Model {
    TYPE_ENTRANT = 'entrant'
    TYPE_REENTRANT = 'reentrant'
    TYPE_PERMANENCE = 'permanence'
    TYPE_PROMOTION = 'promotion'

    TYPE_CHOICES = {
        [this.TYPE_ENTRANT]: 'Nuevo ingreso',
        [this.TYPE_REENTRANT]: 'Reingreso',
        [this.TYPE_PERMANENCE]: 'Permanencia',
        [this.TYPE_PROMOTION]: 'Promoción'
    }

    MODE_ORDINARY = 'ordinary'
    MODE_EXTRA = 'extra'
    MODE_REPEAT = 'repeat'

    MODE_CHOICES = {
        [this.MODE_ORDINARY]: 'Ordinaria',
        [this.MODE_EXTRA]: 'Extraordinaria',
        [this.MODE_REPEAT]: 'Reevaluación'
    }

    RESOURCES_FORTASEG = 'fortaseg'
    RESOURCES_FASP = 'fasp'
    RESOURCES_OTHER = 'other'

    RESOURCES_CHOICES = {
        [this.RESOURCES_FORTASEG]: 'FORTASEG',
        [this.RESOURCES_FASP]: 'FASP',
        [this.RESOURCES_OTHER]: 'Otros'
    }

    SCHEMA_INTEGRAL = 'integral'
    SCHEMA_DIFFERENTIATED = 'differentiated'
    SCHEMA_FILTER = 'filter'

    SCHEMA_CHOICES = {
        [this.SCHEMA_INTEGRAL]: 'Integral',
        [this.SCHEMA_DIFFERENTIATED]: 'Diferenciado',
        [this.SCHEMA_FILTER]: 'Filtro'
    }

    STATUS_CREATED = 'created'
    STATUS_ISE_AUTH_PENDING = 'ise_auth_pending'
    STATUS_INT_AUTH_PENDING = 'int_auth_pending'
    STATUS_SCHEDULE_PENDING = 'schedule_pending'
    STATUS_SCHEDULED = 'schedule_pending'

    STATUS_CHOICES = {
        [this.STATUS_CREATED]: 'Creada',
        [this.STATUS_ISE_AUTH_PENDING]: 'ISE pendiente',
        [this.STATUS_INT_AUTH_PENDING]: 'Integración pendiente',
        [this.STATUS_SCHEDULE_PENDING]: 'Programación pendiente',
        [this.STATUS_SCHEDULED]: 'Programada'
    }

    REASON_NONE = 'none'
    REASON_PERIODIC = 'periodic'
    REASON_TRACKING = 'tracking'

    REASON_CHOICES = {
        [this.REASON_NONE]: 'No aplica',
        [this.REASON_PERIODIC]: 'Periódica',
        [this.REASON_TRACKING]: 'Seguimiento'
    }

    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        type: {
            writable: true,
            api: 'type',
            type: String,
            choices: Object.keys(this.TYPE_CHOICES)
        },
        mode: {
            writable: true,
            api: 'mode',
            type: String,
            choices: Object.keys(this.MODE_CHOICES)
        },
        resources: {
            writable: true,
            api: 'resources',
            type: String,
            choices: Object.keys(this.RESOURCES_CHOICES),
            default: this.RESOURCES_FORTASEG
        },
        schema: {
            writable: true,
            api: 'schema',
            type: String,
            choices: Object.keys(this.SCHEMA_CHOICES),
            default: this.SCHEMA_INTEGRAL
        },
        status: {
            writable: true,
            api: 'status',
            type: String,
            choices: Object.keys(this.STATUS_CHOICES),
            default: this.STATUS_CREATED
        },
        reason: {
            writable: true,
            api: 'reason',
            type: String,
            choices: Object.keys(this.REASON_CHOICES),
            default: this.REASON_NONE
        },
        application: {
            writable: true,
            api: 'application',
            type: Number
        },
        socioeconomic: {
            writable: false,
            api: 'socioeconomic',
            type: Number
        },
        medical: {
            writable: false,
            api: 'medical',
            type: Number
        },
        toxicological: {
            writable: false,
            api: 'toxicological',
            type: Number
        },
        psychological: {
            writable: false,
            api: 'psychological',
            type: Number
        },
        polygraphic: {
            writable: false,
            api: 'polygraphic',
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

const evaluationModel = new EvaluationModel();

class EvaluationFilter extends Model {
    ORDER_CHOICES = {
        'type': 'Tipo de evaluación',
        'created_at': 'Fecha de creación',
        'application__candidate__curp': 'CURP',
        'application__document': 'Documento',
        'application__date': 'Fecha de oficio',
        'application__status': 'Estado de la solicitud',        
        'application__position__secondment__dependency__corporation_id': 'Corporación',
        'application__position__secondment__dependency_id': 'Dependencia',
        'application__position__secondment_id': 'Adscripción',
        'application__position_id': 'Puesto'
    }

    props = {
        orderBy: {
            writable: true,
            api: 'order_by',
            type: String,
            default: '-created_at'
        },
        type: {
            writable: true,
            api: 'type__in',
            type: String,
            many: true,
            choices: Object.keys(evaluationModel.TYPE_CHOICES)
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
        },
        candidates: {
            writable: true,
            api: 'application__candidate_id__in',
            type: Number,
            many: true
        },
        candidateName: {
            writable: true,
            api: 'application__candidate__name__icontains',
            type: String
        },
        candidateLastName: {
            writable: true,
            api: 'application__candidate__last_name__icontains',
            type: String
        },
        candidateCurp: {
            writable: true,
            api: 'application__candidate__curp__icontains',
            type: String
        },
        applicationDocument: {
            writable: true,
            api: 'application__document__icontains',
            type: String
        },
        applicationMinDate: {
            writable: true,
            api: 'application__date__gte',
            type: Number,
            reader: dateReader,
            writer: dateWriter
        },
        applicationMaxDate: {
            writable: true,
            api: 'application__date__lte',
            type: Number,
            reader: dateReader,
            writer: dateWriter
        },
        applicationStatus: {
            writable: true,
            api: 'application__status__in',
            type: String,
            choices: Object.keys(applicationModel.STATUS_CHOICES),
            many: true
        },
        applicationCorporations: {
            writable: true,
            api: 'application__position__secondment__dependency__corporation_id__in',
            type: Number,
            many: true
        },
        applicationDependencies: {
            writable: true,
            api: 'application__position__secondment__dependency_id__in',
            type: Number,
            many: true
        },
        applicationSecondments: {
            writable: true,
            api: 'application__position__secondment_id__in',
            type: Number,
            many: true
        },
        applicationPositions: {
            writable: true,
            api: 'application__position_id__in',
            type: Number,
            many: true
        }
    }
}

const evaluationFilter = new EvaluationFilter();

export {
    EvalSectionModel,
    evalSectionModel,
    evaluationModel,
    evaluationFilter
};
