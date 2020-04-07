<template>

<split-view v-if="socioeconomic && evaluation" class="Documents">
    <template v-slot:main>
        <el-tabs v-model="section">
            <el-tab-pane label="Digiscan" name="digiscan">
                <digiscan :record-id="recordId"></digiscan>
            </el-tab-pane>
        </el-tabs>        
    </template>

    <template v-slot:side-actions>
        <div class="text-lg text-w6">Evaluación</div>
    </template>

    <template v-slot:side-content>
        <candidate-info :candidate-id="application.candidate"></candidate-info>
    </template>
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import CandidateInfo from '@/components/CandidateInfo';
import Digiscan from '@/components/Digiscan';
import SplitView from '@/layout/components/SplitView';

export default {
    name: 'Documents',

    components: {
        SplitView,
        CandidateInfo,
        Digiscan
    },

    props: {
        recordId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            section: 'digiscan'
        };
    },

    computed: {
        ...mapGetters({
            applications: 'applications/sortedItems'
        }),
        socioeconomic() {
            this.$store.dispatch('socioeconomics/getItem', this.recordId);
            return this.$store.state.applications.items[this.recordId];
        },
        evaluation() {
            const evaluationId = this.socioeconomic.evaluation;
            this.$store.dispatch('evaluations/getItem', evaluationId);
            return this.$store.state.evaluations.items[evaluationId];
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
</style>
