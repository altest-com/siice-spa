<template>

<div class="candidates-list">
    <template v-if="candidates.length">
        <el-card v-if="view === 'table'" shadow="never" class="mt-5">
            <table class="items-table">
                <tr class="header">                
                    <th v-for="header in headersData" :key="header.key">
                        <div class="cell"> {{ header.label }} </div>
                    </th>
                </tr>
                <candidate-row 
                    v-for="candidate in candidates" 
                    :key="candidate.id"
                    class="row"
                    :headers="headers"
                    :candidate-id="candidate.id"
                    :focus="candidate.id === focusId"
                    @click="onItemClick(candidate.id)"
                ></candidate-row>
            </table>
        </el-card>

        <el-row v-if="view === 'grid'" :gutter="8" class="mt-5">
            <el-col
                v-for="candidate in candidates"
                :key="candidate.id"
                :xs="24" 
                :sm="12" 
                :md="8" 
                :lg="8" 
                :xl="4"                
            >
                <candidate-card
                    class="mb-2"
                    :candidate-id="candidate.id"
                    :focus="candidate.id === focusId"
                    @click="onItemClick(candidate.id)"                
                ></candidate-card>
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
        :total="candidatesCount"
        @current-change="updatePage"
    ></el-pagination>       
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import Empty from '@/components/Empty';
import CandidateCard from './CandidateCard';
import CandidateRow from './CandidateRow';

const headers = {
    name: 'Nombre',
    lastName: 'Apellidos',
    curp: 'CURP',
    createdAt: 'Fecha de creación'
};

export default {
    name: 'CandidatesList',

    components: {
        Empty,
        CandidateCard,
        CandidateRow
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
                'lastName',
                'curp',
                'createdAt'
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
            candidates: 'candidates/sortedItems'
        }),
        candidatesCount() {
            return this.$store.state.candidates.count;
        },
        pageNumber: function() {
            return this.$store.state.candidates.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.candidates.pageSize;
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
            this.$store.dispatch('candidates/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('candidates/fetchItems');
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
