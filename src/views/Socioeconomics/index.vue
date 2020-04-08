<template>

<split-view v-if="evaluation" class="socioeconomics-index">
    <template v-slot:main>
        <el-card shadow="never">
            <el-tabs v-model="section">
                <el-tab-pane label="Digiscan" name="digiscan">
                    <digiscan
                        class="main-form" 
                        v-if="socioeconomic" 
                        :record-id="socioeconomic.id"
                    ></digiscan>
                </el-tab-pane>
            </el-tabs> 
        </el-card>               
    </template>

    <template v-slot:side-actions>
        <div class="text-lg text-w6">Evaluación</div>
    </template>

    <template v-slot:side-content>
        <candidate-info 
            v-if="application"  
            :candidate-id="application.candidate"
        ></candidate-info>
    </template>
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import CandidateInfo from '@/components/CandidateInfo';
import Digiscan from './Digiscan';
import SplitView from '@/layout/components/SplitView';

export default {
    name: 'SocioeconomicsIndex',

    components: {
        SplitView,
        CandidateInfo,
        Digiscan
    },

    props: {
        evaluationId: {
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
        evaluation() {            
            this.$store.dispatch('evaluations/getItem', this.evaluationId);
            return this.$store.state.evaluations.items[this.evaluationId];
        },
        socioeconomic() {
            const socioeconomicId = this.evaluation.socioeconomic;
            this.$store.dispatch('socioeconomics/getItem', socioeconomicId);
            return this.$store.state.socioeconomics.items[socioeconomicId];
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

.socioeconomics-index {
    .main-form {
        max-width: 450px;
    }
}

</style>
