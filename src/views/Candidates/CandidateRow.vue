<template>

<ab-table-row
    v-if="isReady"
    :items="items"
    :focus="focus"
    @click="$emit('click')"
/>

</template>

<script>

import CandidateData from './CandidateData';

export default {
    name: 'CandidateRow',

    mixins: [CandidateData],

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
            return this.headers.map(key => {
                return this.data[key] || {};
            });
        }
    }
};
</script>}

<style lang="scss">
</style>
