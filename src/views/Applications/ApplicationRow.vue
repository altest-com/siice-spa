<template>

<tr v-if="application" :class="{'focus': focus}" @click="$emit('click')">
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
    name: 'ApplicationRow',

    props: {
        applicationId: {
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
                id: this.application.id,
                name: this.candidate ? this.candidate.name : '',
                curp: this.candidate ? this.candidate.curp : '',
                status: this.application.status,
                document: this.application.document,
                year: this.application.year,
                position: this.position ? this.position.name : '',
                createdAt: filters.dateFilter(this.application.createdAt),
                corporation: this.corporation ? this.corporation.name : '',
                dependency: this.dependency ? this.dependency.name : '',
                secondment: this.secondment ? this.secondment.name : ''
            };
        },

        application() {
            this.$store.dispatch('applications/getItem', this.applicationId);
            return this.$store.state.applications.items[this.applicationId];
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

        candidate() {
            const candidateId = this.application.candidate;
            this.$store.dispatch('candidates/getItem', candidateId);
            return this.$store.state.candidates.items[candidateId];
        }
    },

    methods: {
    }   
};
</script>}

<style lang="scss">
</style>
