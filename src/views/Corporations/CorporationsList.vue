<template>

<div class="corporations-list">

    <el-card v-if="corporations.length" shadow="never" class="mt-5">
        <table class="items-table">
            <tr class="header">                
                <th v-for="header in headersData" :key="header.key">
                    <div class="cell"> {{ header.label }} </div>
                </th>
                <th></th>
            </tr>
            <corporation-row 
                v-for="corporation in corporations" 
                :key="corporation.id"
                :headers="headers"
                :corporation-id="corporation.id"
                :focus="corporation.id === focusId"
                @click="onItemClick(corporation.id)"
                @edit="$emit('edit', corporation.id)"
                @remove="$emit('remove', corporation.id)"
            ></corporation-row>
        </table>
    </el-card>

    <empty
        v-else
        title="Sin elementos"
        message="No existen resultados para mostrar"
        icon-size="3em"
        height="383px"
        icon="el-icon-user"
        background="#eee"
    ></empty> 

    <el-pagination 
        hide-on-single-page
        layout="prev, pager, next"
        class="mt-4"
        :page-size="pageSize" 
        :background="true"
        :current-page="pageNumber"
        :total="corporationsCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import Empty from '@/components/Empty';
import CorporationRow from './CorporationRow';

const headers = {
    name: 'Nombre',
    createdAt: 'Fecha de creación'
};

export default {
    name: 'CorporationsList',

    components: {
        Empty,
        CorporationRow
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
            corporations: 'corporations/sortedItems'
        }),
        corporationsCount() {
            return this.$store.state.corporations.count;
        },
        pageNumber: function() {
            return this.$store.state.corporations.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.corporations.pageSize;
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
            this.$store.dispatch('corporations/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('corporations/fetchItems');
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
