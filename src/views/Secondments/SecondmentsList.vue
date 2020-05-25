<template>

<div class="secondments-list">

    <el-card v-if="secondments.length" shadow="never" class="mt-5">
        <table class="items-table">
            <tr class="header">                
                <th v-for="header in headersData" :key="header.key">
                    <div class="cell"> {{ header.label }} </div>
                </th>
                <th></th>
            </tr>
            <secondment-row 
                v-for="secondment in secondments" 
                :key="secondment.id"
                :headers="headers"
                :secondment-id="secondment.id"
                :focus="secondment.id === focusId"
                @click="onItemClick(secondment.id)"
                @edit="$emit('edit', secondment.id)"
                @remove="$emit('remove', secondment.id)"
            ></secondment-row>
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
        :total="secondmentsCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import SecondmentRow from './SecondmentRow';

const headers = {
    name: 'Nombre',
    dependency: 'Dependencia',
    corporation: 'Corporación',
    createdAt: 'Fecha de creación'
};

export default {
    name: 'SecondmentsList',

    components: {
        SecondmentRow
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
                'dependency',
                'corporation',
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
            secondments: 'secondments/sortedItems'
        }),
        secondmentsCount() {
            return this.$store.state.secondments.count;
        },
        pageNumber: function() {
            return this.$store.state.secondments.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.secondments.pageSize;
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
            this.$store.dispatch('secondments/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('secondments/fetchItems');
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
