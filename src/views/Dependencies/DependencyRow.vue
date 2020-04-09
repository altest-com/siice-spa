<template>

<tr 
    v-if="isReady" 
    class="row" 
    :class="{'focus': focus}" 
    @click="$emit('click')"
>
    <table-cell 
        v-for="header in headers" 
        :key="header"
        :type="rowData[header].type"
        :value="rowData[header].value"
        :styles="rowData[header].styles"
        :route="rowData[header].route"
    ></table-cell>
    <table-cell
        type="actions"
        @edit="$emit('edit')"
        @remove="$emit('remove')"
    ></table-cell>
</tr>

</template>

<script>

import TableCell from '@/components/TableCell';

export default {
    name: 'DependencyRow',

    components: {
        TableCell
    },

    props: {
        dependencyId: {
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
                    value: this.dependency.name
                },
                corporation: {
                    type: 'text',
                    value: this.corporation.name
                },
                createdAt: {
                    type: 'date',
                    value: this.dependency.createdAt
                }
            };
        },

        isReady() {
            return !!(this.dependency && this.corporation);
        },

        dependency() {
            this.$store.dispatch('dependencies/getItem', this.dependencyId);
            return this.$store.state.dependencies.items[this.dependencyId];
        },

        corporation() {
            const corporationId = this.dependency.corporation;
            this.$store.dispatch('corporations/getItem', corporationId);
            return this.$store.state.corporations.items[corporationId];
        }
    },

    methods: {
    }   
};
</script>}

<style lang="scss">
</style>
