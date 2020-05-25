import { 
    evaluationModel, 
    evalSectionModel 
} from '@/store/modules/evaluations/models';

const defaultImage = require('@/assets/images/user.png');

const typeChoices = evaluationModel.TYPE_CHOICES;
const resourceChoices = evaluationModel.RESOURCES_CHOICES;
const schemaChoices = evaluationModel.SCHEMA_CHOICES;
const statusChoices = evaluationModel.STATUS_CHOICES;
const reasonChoices = evaluationModel.REASON_CHOICES;

const sectionChoices = evalSectionModel.STATUS_CHOICES;

export default {
    props: {
        evaluationId: {
            type: [Number, String],
            required: true
        },
        headers: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        image() {
            const imageId = this.candidate.image;
            if (imageId) {
                this.$store.dispatch('images/getItem', imageId);
                const image = this.$store.state.images.items[imageId];
                if (image) {
                    return image.image;
                }
            }
            return defaultImage;
        },

        fullName() {
            return `${this.candidate.lastName} ${this.candidate.name}`;
        },

        data() {
            const data = {
                name: {
                    type: 'text',
                    label: 'Nombre',
                    value: this.candidate.name
                },
                lastName: {
                    type: 'text',
                    label: 'Apellidos',
                    value: this.candidate.lastName
                },
                curp: {
                    type: 'text',
                    label: 'CURP',
                    value: this.candidate.curp
                },
                document: {
                    type: 'text',
                    label: 'Número de Oficio',
                    value: this.application.document
                },
                date: {
                    type: 'date',
                    label: 'Fecha del Oficio',
                    value: this.application.date
                },
                corporation: {
                    type: 'text',
                    label: 'Corporación',
                    value: this.corporation.name
                },
                dependency: {
                    type: 'text',
                    label: 'Dependencia',
                    value: this.dependency.name
                },
                secondment: {
                    type: 'text',
                    label: 'Adscripción',
                    value: this.secondment.name
                },
                position: {
                    type: 'text',
                    label: 'Puesto',
                    value: this.position.name
                },
                type: {
                    type: 'text',
                    label: 'Tipo de Evaluación',
                    value: typeChoices[this.evaluation.type]
                },
                resources: {
                    type: 'text',
                    label: 'Origen de Recursos',
                    value: resourceChoices[this.evaluation.resources]
                },
                schema: {
                    type: 'text',
                    label: 'Origen de Recursos',
                    value: schemaChoices[this.evaluation.schema]
                },
                status: {
                    type: 'text',
                    label: 'Estado de Aprobación',
                    value: statusChoices[this.evaluation.status]
                },
                reason: {
                    type: 'text',
                    label: 'Motivo de Evaluación',
                    value: reasonChoices[this.evaluation.reason]
                },
                medical: {
                    type: 'text',
                    label: 'Examen Médico',
                    value: this.medical ? 
                        sectionChoices[this.medical.status] : ''
                },
                socioeconomic: {
                    type: 'text',
                    label: 'Examen Socioeconómico',
                    value: this.socioeconomic ? 
                        sectionChoices[this.socioeconomic.status] : ''
                },
                psychological: {
                    type: 'text',
                    label: 'Examen Psicológico',
                    value: this.polygraphic ? 
                        sectionChoices[this.polygraphic.status] : ''
                },
                polygraphic: {
                    type: 'text',
                    label: 'Examen Poligráfico',
                    value: this.polygraphic ? 
                        sectionChoices[this.polygraphic.status] : ''
                }         
            };

            return data;
        },

        isReady() {
            return !!(
                this.application && 
                this.dependency && 
                this.corporation && 
                this.secondment && 
                this.position && 
                this.candidate && 
                this.evaluation
            );
        },

        evaluation() {
            this.$store.dispatch('evaluations/getItem', this.evaluationId);
            return this.$store.state.evaluations.items[this.evaluationId];
        },

        application() {
            const applicationId = this.evaluation.application;
            this.$store.dispatch('applications/getItem', applicationId);
            return this.$store.state.applications.items[applicationId];
        },

        candidate() {
            const candidateId = this.application.candidate;
            this.$store.dispatch('candidates/getItem', candidateId);
            return this.$store.state.candidates.items[candidateId];
        },

        dependency() {
            const dependencyId = this.application.dependency;
            return this.$store.state.dependencies.items[dependencyId];
        },

        corporation() {
            const corporationId = this.application.corporation;
            return this.$store.state.corporations.items[corporationId];
        },

        secondment() {
            const secondmentId = this.application.secondment;
            return this.$store.state.secondments.items[secondmentId];
        },

        position() {
            const positionId = this.application.position;
            return this.$store.state.positions.items[positionId];
        },

        medical() {
            if (!this.headers.includes('medical')) {
                return null;
            }
            const medicalId = this.evaluation.medical;
            this.$store.dispatch('medicals/getItem', medicalId);
            return this.$store.state.medicals.items[medicalId];
        },

        polygraphic() {
            if (!this.headers.includes('polygraphic')) {
                return null;
            }
            const polygraphicId = this.evaluation.polygraphic;
            this.$store.dispatch('polygraphics/getItem', polygraphicId);
            return this.$store.state.polygraphics.items[polygraphicId];
        },

        socioeconomic() {
            if (!this.headers.includes('socioeconomic')) {
                return null;
            }
            const socioeconomicId = this.evaluation.socioeconomic;
            this.$store.dispatch('socioeconomics/getItem', socioeconomicId);
            return this.$store.state.socioeconomics.items[socioeconomicId];
        },

        psychological() {
            if (!this.headers.includes('psychological')) {
                return null;
            }
            const psychologicalId = this.evaluation.psychological;
            this.$store.dispatch('psychologicals/getItem', psychologicalId);
            return this.$store.state.psychologicals.items[psychologicalId];
        }
    }   
};

