import { Model } from 'vrudex';

class AlertModel extends Model {    
    SECTION_SOCIOECONOMIC = 'socioeconomic'
    SECTION_MEDICAL = 'medical'
    SECTION_POLYGRAPHIC = 'polygraphic'
    SECTION_PSYCHOLOGICAL = 'psychological'
    SECTION_TOXICOLOGICAL = 'toxicological'

    SECTION_CHOICES = {
        [this.SECTION_SOCIOECONOMIC]: 'Socioeconómica',
        [this.SECTION_MEDICAL]: 'Médica',
        [this.SECTION_POLYGRAPHIC]: 'Poligráfica',
        [this.SECTION_PSYCHOLOGICAL]: 'Psicológica',
        [this.SECTION_TOXICOLOGICAL]: 'Toxicológica'
    }

    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        evaluation: {
            writable: true,
            api: 'evaluation',
            type: Number
        },
        section: {
            writable: true,
            api: 'section',
            type: String,
            choices: Object.keys(this.SECTION_CHOICES)
        },
        info: {
            writable: true,
            api: 'info',
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

const alertModel = new AlertModel();
Object.freeze(alertModel);

class AlertFilter extends Model {
    props = {
        evaluation: {
            writable: true,
            api: 'evaluation',
            type: Number
        }
    }
}

const alertFilter = new AlertFilter();
Object.freeze(alertFilter);

export {
    alertModel,
    alertFilter
};
