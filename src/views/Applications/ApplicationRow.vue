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
    name: 'ApplicationRow',

    components: {
        TableCell
    },

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
                createdAt: {
                    type: 'date',
                    value: this.application.createdAt
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
                position: {
                    type: 'text',
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
