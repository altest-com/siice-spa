<template>

<div class="dependencies-list">

    <el-card v-if="dependencies.length" shadow="never" class="mt-5">
        <table class="items-table">
            <tr class="header">                
                <th v-for="header in headersData" :key="header.key">
                    <div class="cell"> {{ header.label }} </div>
                </th>
                <th></th>
            </tr>
            <dependency-row 
                v-for="dependency in dependencies" 
                :key="dependency.id"
                :headers="headers"
                :dependency-id="dependency.id"
                :focus="dependency.id === focusId"
                @click="onItemClick(dependency.id)"
                @edit="$emit('edit', dependency.id)"
                @remove="$emit('remove', dependency.id)"
            ></dependency-row>
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
        :total="dependenciesCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import Empty from '@/components/Empty';
import DependencyRow from './DependencyRow';

const headers = {
    name: 'Nombre',
    corporation: 'Corporación',
    createdAt: 'Fecha de creación'
};

export default {
    name: 'DependenciesList',

    components: {
        Empty,
        DependencyRow
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
            dependencies: 'dependencies/sortedItems'
        }),
        dependenciesCount() {
            return this.$store.state.dependencies.count;
        },
        pageNumber: function() {
            return this.$store.state.dependencies.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.dependencies.pageSize;
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
            this.$store.dispatch('dependencies/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('dependencies/fetchItems');
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
