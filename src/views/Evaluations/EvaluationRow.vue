<template>

<tr v-if="isReady" :class="{'focus': focus}" @click="$emit('click')">
    <table-cell 
        v-for="header in headers" 
        :key="header"
        :type="rowData[header].type"
        :value="rowData[header].value"
        :styles="rowData[header].styles"
        :route="rowData[header].route"
    ></table-cell>
</tr>

</template>

<script>

import TableCell from '@/components/TableCell';

export default {
    name: 'EvaluationRow',

    components: {
        TableCell
    },

    props: {
        evaluationId: {
            type: [Number, String],
            required: true
        },
        focus: {
            type: Boolean,
            default: false
        },
        headers: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
        };
    },

    computed: {

        rowData() {
            const data = {
                name: {
                    type: 'text',
                    value: this.candidate.name
                },
                curp: {
                    type: 'text',
                    value: this.candidate.curp
                },
                status: {
                    type: 'text',
                    value: this.application.status
                },
                document: {
                    type: 'text',
                    value: this.application.document
                },
                year: {
                    type: 'year',
                    value: this.application.year
                },
                position: {
                    type: 'text',
                    value: this.position.name
                },
                corporation: {
                    type: 'text',
                    value: this.corporation.name
                },
                dependency: {
                    type: 'text',
                    value: this.dependency.name
                },
                secondment: {
                    type: 'text',
                    value: this.secondment.name
                },
                type: {
                    type: 'text',
                    value: this.evaluation.type
                },
                scheduledAt: {
                    type: 'date',
                    value: this.evaluation.scheduledAt
                },
                medical: {
                    type: 'text',
                    value: this.medical ? this.medical.status : ''
                },
                socioeconomic: {
                    type: 'text',
                    value: this.socioeconomic ? this.socioeconomic.status : ''
                },
                psychological: {
                    type: 'text',
                    value: this.polygraphic ? this.polygraphic.status : ''
                },
                polygraphic: {
                    type: 'text',
                    value: this.polygraphic ? this.polygraphic.status : ''
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
            this.$store.dispatch('dependencies/getItem', dependencyId);
            return this.$store.state.dependencies.items[dependencyId];
        },

        corporation() {
            const corporationId = this.application.corporation;
            this.$store.dispatch('corporations/getItem', corporationId);
            return this.$store.state.corporations.items[corporationId];
        },

        secondment() {
            const secondmentId = this.application.secondment;
            this.$store.dispatch('secondments/getItem', secondmentId);
            return this.$store.state.secondments.items[secondmentId];
        },

        position() {
            const positionId = this.application.position;
            this.$store.dispatch('positions/getItem', positionId);
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
    },

    methods: {
    }   
};
</script>}

<style lang="scss">
</style>
