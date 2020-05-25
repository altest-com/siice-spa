<template>

<ab-table-row
    v-if="isReady"
    class="corporation-row"
    :items="items"
    :focus="focus"
    @click="$emit('click')"
    @edit="$emit('edit')"
    @remove="$emit('remove')"
/>

</template>

<script>

import CorporationData from './CorporationData';

export default {
    name: 'CorporationRow',

    mixins: [CorporationData],

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

.corporation-row {
    .actions {
        width: 128px;
    }
}

</style>
