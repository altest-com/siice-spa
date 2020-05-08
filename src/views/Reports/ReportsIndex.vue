<template>

<div v-if="evaluation" class="reports-index">
    <div v-if="hasEvalData" ref="pages" class="pages">
        <item-print 
            :item-id="evalSection.evalData"
        ></item-print> 
    </div>                 
</div>

</template>

<script>

import params from '../params';

export default {
    name: 'ReportsIndex',

    components: {
    },

    props: {
        evaluationId: {
            type: [Number, String],
            required: true
        },
        section: {
            type: String,
            required: true,
            validator: val => val in params
        }
    },

    data() {
        return {
            loading: false
        };
    },

    computed: {
        evaluation() {            
            this.$store.dispatch('evaluations/getItem', this.evaluationId);
            return this.$store.state.evaluations.items[this.evaluationId];
        },
        evalSection() {
            const evalSectionId = this.evaluation[this.section];
            const store = params[this.section].store;
            this.$store.dispatch(`${store}/getItem`, evalSectionId);
            return this.$store.state[store].items[evalSectionId];
        },
        hasEvalData() {
            return this.evalSection && (
                this.evalSection.evalData || 
                this.evalSection.evalData === 0
            );
        }
    },

    methods: {
    }
};
</script>

<style lang="scss">

@import '@/styles/reports.scss';

</style>
