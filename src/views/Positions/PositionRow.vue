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
    name: 'PositionRow',

    components: {
        TableCell
    },

    props: {
        positionId: {
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
                    value: this.position.name
                },
                createdAt: {
                    type: 'date',
                    value: this.position.createdAt
                }
            };
        },

        isReady() {
            return !!this.position;
        },

        position() {
            this.$store.dispatch('positions/getItem', this.positionId);
            return this.$store.state.positions.items[this.positionId];
        }
    },

    methods: {
    }   
};
</script>}

<style lang="scss">
</style>
