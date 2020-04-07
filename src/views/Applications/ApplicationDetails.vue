<template>

<div v-if="application" class="application-details">
    <candidate-info :candidate-id="application.candidate"></candidate-info>
</div>

</template>

<script>

import CandidateInfo from '@/components/CandidateInfo';

export default {
    name: 'ApplicationDetails',

    components: {
        CandidateInfo
    },
    
    props: {
        applicationId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return { 
        };
    },

    computed: {        
        application() {
            this.$store.dispatch('applications/getItem', this.applicationId);
            return this.$store.state.applications.items[this.applicationId];
        }
    }, 

    methods: {
    }
};
</script>

<style lang="scss">
</style>
