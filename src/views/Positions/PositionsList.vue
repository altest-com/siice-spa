<template>

<div class="positions-list">

    <el-card v-if="positions.length" shadow="never" class="mt-5">
        <table class="items-table">
            <tr class="header">                
                <th v-for="header in headersData" :key="header.key">
                    <div class="cell"> {{ header.label }} </div>
                </th>
                <th></th>
            </tr>
            <position-row 
                v-for="position in positions" 
                :key="position.id"
                :headers="headers"
                :position-id="position.id"
                :focus="position.id === focusId"
                @click="onItemClick(position.id)"
                @edit="$emit('edit', position.id)"
                @remove="$emit('remove', position.id)"
            ></position-row>
        </table>
    </el-card>

    <ab-empty
        v-else
        title="Sin elementos"
        message="No existen resultados para mostrar"
        height="400px"
    />

    <el-pagination 
        hide-on-single-page
        layout="prev, pager, next"
        class="mt-4"
        :page-size="pageSize" 
        :background="true"
        :current-page="pageNumber"
        :total="positionsCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import PositionRow from './PositionRow';

const headers = {
    name: 'Nombre',
    createdAt: 'Fecha de creación'
};

export default {
    name: 'PositionsList',

    components: {
        PositionRow
    },

    props: {
        focusId: {
            type: [Number, String],
            default: null
        },
        headers: {
            type: Array,
            default: () => [
                'name',
                'createdAt'
            ]
        }
    },

    data() {
        return {
        };
    },

    computed: {
        ...mapGetters({
            positions: 'positions/sortedItems'
        }),
        positionsCount() {
            return this.$store.state.positions.count;
        },
        pageNumber: function() {
            return this.$store.state.positions.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.positions.pageSize;
        },
        headersData() {
            return this.headers.map(key => {
                return {
                    key: key, 
                    label: headers[key]
                };
            });
        }
    },

    methods: {         
        updatePage: function(number) {
            this.$store.dispatch('positions/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('positions/fetchItems');
        },
        onItemClick(itemId) {
            const focusId = itemId === this.focusId ? null : itemId;
            this.$emit('update:focus-id', focusId);
        }
    }
};
</script>

<style lang="scss">
</style>
