<template>

<div class="applications-list">
    <template v-if="applications.length">
        <el-card v-if="view === 'table'" shadow="never" class="mt-5">
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
                />
            </table>
        </el-card>

        <el-row v-else-if="view === 'grid'" :gutter="8" class="mt-5">
            <el-col
                v-for="application in applications"
                :key="application.id"
                :xs="24" 
                :sm="12" 
                :md="8" 
                :lg="8" 
                :xl="4"                
            >
                <application-card
                    class="mb-2"
                    :application-id="application.id"
                    :focus="application.id === focusId"
                    @click="onItemClick(application.id)"                
                />
            </el-col>
        </el-row>

    </template>

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
        :total="applicationsCount"
        @current-change="updatePage"
    />
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import ApplicationRow from './ApplicationRow';
import ApplicationCard from './ApplicationCard';
import headers from './headers';

export default {
    name: 'ApplicationsList',

    components: {
        ApplicationRow,
        ApplicationCard
    },

    props: {
        focusId: {
            type: [Number, String],
            default: null
        },
        headers: {
            type: Array,
            default: () => [
                'lastName',
                'name',
                'curp',
                'document',
                'date',
                'position'
            ]
        },
        view: {
            type: String,
            default: 'table'
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
