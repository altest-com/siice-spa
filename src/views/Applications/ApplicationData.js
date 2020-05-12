import { applicationModel } from '@/store/modules/applications/models';

const defaultImage = require('@/assets/images/user.png');

const statusChoices = applicationModel.STATUS_CHOICES;

export default {
    props: {
        applicationId: {
            type: [Number, String],
            required: true
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
            return {
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
                image: {
                    type: 'image',
                    value: this.image
                },
                curp: {
                    type: 'text',
                    label: 'CURP',
                    value: this.candidate.curp
                },
                status: {
                    type: 'text',
                    label: 'Estado',
                    value: statusChoices[this.application.status]
                },
                document: {
                    type: 'text',
                    label: 'Oficio',
                    value: this.application.document
                },
                date: {
                    type: 'date',
                    label: 'Fecha del oficio',
                    value: this.application.date
                },
                createdAt: {
                    type: 'date',
                    label: 'Fecha de registro',
                    value: this.application.createdAt
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
                }
            };
        },

        isReady() {
            return !!(
                this.application && 
                this.dependency && 
                this.corporation && 
                this.secondment && 
                this.position && 
                this.candidate
            );
        },

        application() {
            this.$store.dispatch('applications/getItem', this.applicationId);
            return this.$store.state.applications.items[this.applicationId];
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
        }
    },

    methods: {
    }   
};
