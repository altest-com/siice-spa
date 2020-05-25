<template>

<table-row 
    v-if="isReady" 
    :items="items" 
    :focus="focus" 
    @click="$emit('click')" 
/>

</template>

<script>

import TableRow from '@/components/TableRow';
import EvaluationData from './EvaluationData';

export default {
    name: 'EvaluationRow',

    components: {
        TableRow        
    },

    mixins: [EvaluationData],

    props: {
        focus: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
        };
    },

    computed: {
        items() {
            const items = this.headers.map(key => {
                return this.data[key] || {};
            });
            return items;
        }
    } 
};

</script>

<style lang="scss">
</style>
