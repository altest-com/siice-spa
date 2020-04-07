<template>

<tr v-if="evaluation" :class="{'focus': focus}" @click="$emit('click')">
    <td v-for="header in headers" :key="header">
        <div class="cell">
            {{ rowData[header] }}
        </div>
    </td>
</tr>

</template>

<script>

import filters from '@/filters';

export default {
    name: 'EvaluationRow',

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
            return {
                id: this.evaluation.id,
                name: this.candidate ? this.candidate.name : '',
                curp: this.candidate ? this.candidate.curp : '',
                document: this.application.document,
                year: this.application.year,
                position: this.position ? this.position.name : '',
                corporation: this.corporation ? this.corporation.name : '',
                dependency: this.dependency ? this.dependency.name : '',
                secondment: this.secondment ? this.secondment.name : '',
                type: this.evaluation.type,
                scheduledAt: filters.dateFilter(this.evaluation.scheduledAt),
                medical: this.medical ? this.medical.status : '',
                socioeconomic: this.socioeconomic ? this.socioeconomic.status : '',
                psychological: this.polygraphic ? this.polygraphic.status : '',
                polygraphic: this.psychological ? this.psychological.status : ''          
            };
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
            const positionId = this.evaluation.position;
            this.$store.dispatch('positions/getItem', positionId);
            return this.$store.state.positions.items[positionId];
        },

        candidate() {
            const candidateId = this.application.candidate;
            this.$store.dispatch('candidates/getItem', candidateId);
            return this.$store.state.candidates.items[candidateId];
        },

        medical() {
            const medicalId = this.evaluation.medical;
            this.$store.dispatch('medicals/getItem', medicalId);
            return this.$store.state.candidates.items[medicalId];
        },

        polygraphic() {
            const polygraphicId = this.evaluation.polygraphic;
            this.$store.dispatch('polygraphics/getItem', polygraphicId);
            return this.$store.state.candidates.items[polygraphicId];
        },

        socioeconomic() {
            const socioeconomicId = this.evaluation.socioeconomic;
            this.$store.dispatch('socioeconomics/getItem', socioeconomicId);
            return this.$store.state.candidates.items[socioeconomicId];
        },

        psychological() {
            const psychologicalId = this.evaluation.psychological;
            this.$store.dispatch('psychologicals/getItem', psychologicalId);
            return this.$store.state.candidates.items[psychologicalId];
        }
    },

    methods: {
    }   
};
</script>}

<style lang="scss">
</style>
