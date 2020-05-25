<template>

<div v-if="evaluation" class="evaluation-details">
    <candidate-info :candidate-id="application.candidate" />

    <info-list class="mt-4" :items="infoItems" />

    <router-link :to="route">
        <el-button 
            type="primary" 
            class="block mt-4"
            size="small"
            icon="el-icon-document"
        >
            Registrar Resultados
        </el-button>
    </router-link>    
</div>

</template>

<script>

import CandidateInfo from '../Candidates/CandidateInfo';
import EvaluationData from './EvaluationData';
import InfoList from '@/components/InfoList';

const headers = [
    'document',
    'date',
    'corporation',
    'dependency',
    'secondment',
    'position',
    'type',
    'resources',
    'schema',
    'status',
    'reason'
];

export default {
    name: 'EvaluationDetails',

    components: {
        CandidateInfo,
        InfoList
    },

    mixins: [EvaluationData],
    
    props: {
        evaluationId: {
            type: [Number, String],
            required: true
        },
        section: {
            type: String,
            required: true
        }
    },

    data() {
        return { 
        };
    },

    computed: {
        route() {
            return { 
                name: 'EvalSectionIndex', 
                params: { 
                    evaluationId: this.evaluationId,
                    section: this.section
                }
            };
        },
        infoItems() {
            return headers.map(header => this.data[header]);
        }
    }
};
</script>

<style lang="scss">
</style>
