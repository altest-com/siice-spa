<template>

<div class="evaluations-list">

    <el-card v-if="evaluations.length" shadow="never" class="mt-5">
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

const headers = {
    /* Candidate fields */
    name: 'Nombre',
    curp: 'CURP',
    /* Application fields */
    document: 'Documento',
    year: 'Año Oficio',
    position: 'Puesto',
    corporation: 'Corporación',
    dependency: 'Dependencia',
    secondment: 'Adscripción',
    /* Evualtion fields */
    type: 'Tipo de evaluación',
    sheduledAt: 'Fecha programada',
    medical: 'Médico',
    socioeconomic: 'Socieconómico',
    psychological: 'Psicológico',
    polygraphic: 'Poligráfico'
};

export default {
    name: 'EvaluationsList',

    components: {
        Empty,
        EvaluationRow
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
                'type',
                'sheduledAt',
                'medical',
                'socioeconomic',
                'psychological',
                'polygraphic'
            ]
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
