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
import ApplicationData from './ApplicationData';

export default {
    name: 'ApplicationRow',

    components: {
        TableRow
    },

    mixins: [ApplicationData],

    props: {
        focus: {
            type: Boolean,
            default: false
        },
        headers: {
            type: Array,
            required: true
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
</script>}

<style lang="scss">
</style>
