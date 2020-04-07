import { Model } from '../abstract/models';
import { applicationFilter } from '../applications/models';

class EvalSectionModel extends Model {
    STATUS_CREATED = 'created'
    STATUS_STARTED = 'started'
    STATUS_FINISHED = 'finished'

    STATUS_CHOICES = [{
        label: 'Creada',
        value: 'created'
    }, {
        label: 'Iniciada',
        value: 'started'
    }, {
        label: 'Finalizada',
        value: 'finished'
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
        result: {
            writable: true,
            api: 'type',
            type: String
        },
        passed: {
            writable: true,
            api: 'passed',
            type: Boolean
        },
        alert: {
            writable: true,
            api: 'alert',
            type: String
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
        alertedAt: {
            writable: true,
            api: 'alerted_at',
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

class EvaluationModel extends Model {
    TYPE_ORDINARY = 'ordinary'
    TYPE_EXTRA = 'extra'
    TYPE_REPEAT = 'repeat'

    TYPE_CHOICES = [{
        label: 'Ordinaria',
        value: 'ordinary'
    }, {
        label: 'Extraordinaria',
        value: 'extra'
    }, {
        label: 'Reevaluación',
        value: 'repeat'
    }]

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
            choices: this.TYPE_CHOICES.map(c => c.value)
        },
        application: {
            writable: true,
            api: 'application',
            type: Number
        },
        socioeconomic: {
            writable: true,
            api: 'socioeconomic',
            type: Number
        },
        medical: {
            writable: true,
            api: 'dependency',
            type: Number
        },
        toxicological: {
            writable: true,
            api: 'toxicological',
            type: Number
        },
        psychological: {
            writable: true,
            api: 'psychological',
            type: Number
        },
        polygraphic: {
            writable: true,
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
            writable: false,
            api: 'order_by',
            type: String,
            choices: this.order.map(c => c.value)
        },
        type: {
            writable: true,
            api: 'type',
            type: Number
        },
        minScheduledAt: {
            writable: false,
            api: 'min_scheduled_at',
            type: Date
        },
        maxScheduledAt: {
            writable: false,
            api: 'max_scheduled_at',
            type: Date
        }
    })
}

const evaluationFilter = new EvaluationFilter();

export {
    EvalSectionModel,
    evaluationModel,
    evaluationFilter
};
