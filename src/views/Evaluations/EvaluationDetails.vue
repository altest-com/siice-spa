<template>

<div v-if="evaluation" class="evaluation-details">
    <candidate-info :candidate-id="application.candidate"></candidate-info>
</div>

</template>

<script>

import CandidateInfo from '@/components/CandidateInfo';

export default {
    name: 'EvaluationDetails',

    components: {
        CandidateInfo
    },
    
    props: {
        evaluationId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return { 
        };
    },

    computed: {
        evaluation() {
            this.$store.dispatch('evaluations/getItem', this.evaluationId);
            return this.$store.state.evaluations.items[this.evaluationId];
        },    
        application() {
            const applicationId = this.evaluation.application;
            this.$store.dispatch('applications/getItem', applicationId);
            return this.$store.state.applications.items[applicationId];
        }
    }, 

    methods: {
    }
};
</script>

<style lang="scss">

.evaluation-details {
    .candidate {
        img {
            height: 96px;
            border-radius: 8px;
        }
    }
}

</style>
