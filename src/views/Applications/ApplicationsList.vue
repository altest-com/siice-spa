<template>

<div class="applications-list">

    <el-card v-if="applications.length" shadow="never" class="mt-5">
        <table class="items-table">
            <tr class="header">                
                <th v-for="header in headersData" :key="header.key">
                    <div class="cell"> {{ header.label }} </div>
                </th>
            </tr>
            <application-row 
                v-for="application in applications" 
                :key="application.id"
                class="row"
                :headers="headers"
                :application-id="application.id"
                :focus="application.id === focusId"
                @click="onItemClick(application.id)"
            ></application-row>
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
        :total="applicationsCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import Empty from '@/components/Empty';
import ApplicationRow from './ApplicationRow';

const headers = {
    name: 'Nombre',
    curp: 'CURP',
    status: 'Estado',
    document: 'Documento',
    year: 'Año Oficio',
    position: 'Puesto',
    createdAt: 'Fecha',
    corporation: 'Corporación',
    dependency: 'Dependencia',
    secondment: 'Adscripción'
};

export default {
    name: 'ApplicationsList',

    components: {
        Empty,
        ApplicationRow
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
                'curp',
                'status',
                'document',
                'year',
                'position',
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
            applications: 'applications/sortedItems'
        }),
        applicationsCount() {
            return this.$store.state.applications.count;
        },
        pageNumber: function() {
            return this.$store.state.applications.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.applications.pageSize;
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
            this.$store.dispatch('applications/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('applications/fetchItems');
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
