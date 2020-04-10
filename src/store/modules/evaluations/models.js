import { Model } from '../abstract/models';
import { applicationFilter } from '../applications/models';

class EvalSectionModel extends Model {
    STATUS_CREATED = 'created'
    STATUS_STARTED = 'started'
    STATUS_FINISHED = 'finished'

    STATUS_CHOICES = {
        created: 'Creada',
        started: 'Iniciada',
        finished: 'Finalizada'
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
    TYPE_ORDINARY = 'ordinary'
    TYPE_EXTRA = 'extra'
    TYPE_REPEAT = 'repeat'

    TYPE_CHOICES = {
        ordinary: 'Ordinaria',
        extra: 'Extraordinaria',
        repeat: 'Reevaluación'
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
        scheduledAt: {
            writable: true,
            api: 'scheduled_at',
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
    order = [{
        label: 'Nombre', 
        value: 'application__candidate__name'
    }, {
        label: 'Apellidos', 
        value: 'candidate__last_name'
    }, {
        label: 'Tipo', 
        value: 'type'
    }];

    props = Object.assign({}, applicationFilter.props, {
        orderBy: {
            writable: true,
            api: 'order_by',
            type: String,
            choices: this.order.map(c => c.value)
        },
        type: {
            writable: true,
            api: 'type',
            type: String,
            choices: Object.keys(evaluationModel.TYPE_CHOICES)
        },
        minScheduledAt: {
            writable: true,
            api: 'min_scheduled_at',
            type: Date
        },
        maxScheduledAt: {
            writable: true,
            api: 'max_scheduled_at',
            type: Date
        }
    })
}

const evaluationFilter = new EvaluationFilter();

export {
    EvalSectionModel,
    evalSectionModel,
    evaluationModel,
    evaluationFilter
};
