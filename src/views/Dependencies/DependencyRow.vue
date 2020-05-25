<template>

<ab-table-row
    v-if="isReady"
    class="dependency-row"
    :items="items"
    :focus="focus"
    @click="$emit('click')"
    @edit="$emit('edit')"
    @remove="$emit('remove')"
/>

</template>

<script>

import DependencyData from './DependencyData';

export default {
    name: 'DependencyRow',

    mixins: [DependencyData],

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

    computed: {
        items() {
            const items = this.headers.map(key => {
                return this.data[key] || {};
            });
            items.push({
                type: 'actions',
                edit: true,
                remove: true,
                class: 'actions'
            });
            return items;
        }
    }
};
</script>

<style lang="scss">

    .dependency-row {
        .actions {
            width: 128px;
        }
    }

</style>

