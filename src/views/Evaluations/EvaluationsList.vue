<template>

<div class="evaluations-list">
    <template v-if="evaluations.length">
        <el-card v-if="view === 'table'" shadow="never" class="mt-5">
            <table class="items-table">
                <tr class="header">                
                    <th v-for="header in headersData" :key="header.key">
                        <div class="cell"> {{ header.label }} </div>
                    </th>
                </tr>
                <evaluation-row 
                    v-for="evaluation in evaluations" 
                    :key="evaluation.id"
                    class="row"
                    :headers="headers"
                    :evaluation-id="evaluation.id"
                    :focus="evaluation.id === focusId"
                    @click="onItemClick(evaluation.id)"
                ></evaluation-row>
            </table>
        </el-card>

        <el-row v-else-if="view === 'grid'" :gutter="8" class="mt-5">
            <el-col
                v-for="evaluation in evaluations"
                :key="evaluation.id"
                :xs="24" 
                :sm="12" 
                :md="8" 
                :lg="8" 
                :xl="4"                
            >
                <evaluation-card
                    class="mb-2"
                    :evaluation-id="evaluation.id"
                    :focus="evaluation.id === focusId"
                    @click="onItemClick(evaluation.id)"                
                ></evaluation-card>
            </el-col>
        </el-row>

    </template>

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
        :total="evaluationsCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import Empty from '@/components/Empty';
import EvaluationRow from './EvaluationRow';
import EvaluationCard from './EvaluationCard';
import headers from './headers';

export default {
    name: 'EvaluationsList',

    components: {
        Empty,
        EvaluationRow,
        EvaluationCard
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
                'status',
                'type'
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
            evaluations: 'evaluations/sortedItems'
        }),
        evaluationsCount() {
            return this.$store.state.evaluations.count;
        },
        pageNumber: function() {
            return this.$store.state.evaluations.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.evaluations.pageSize;
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
            this.$store.dispatch('evaluations/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('evaluations/fetchItems');
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
