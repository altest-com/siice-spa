<template>

<td class="table-cell" :style="renderStyles">
    <div v-if="type === 'image'" class="cell">
        <img :src="render" alt="">
    </div>
    <div v-if="type === 'actions'" class="cell">
        <el-button
            v-if="edit"
            size="mini"
            icon="el-icon-edit"
            class="mr-1"
            @click.stop="$emit('edit')"
        ></el-button>
        <el-button
            v-if="remove"
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click.stop="$emit('remove')"
        ></el-button>
    </div>
    <div v-else class="cell">
        <router-link v-if="route" :to="route">
            {{ renderValue }}
        </router-link>
        <template v-else>{{ renderValue }}</template>        
    </div>
</td>

</template>

<script>

import filters from '@/filters';

export default {
    name: 'TableCell',

    props: {
        type: {
            type: String,
            default: 'char'
        },
        value: {
            type: null,
            default: ''
        },
        edit: {
            type: Boolean,
            default: true
        },
        remove: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
        };
    },

    computed: {
        renderValue() {
            if (!this.value) {
                return this.value;
            }

            switch (this.type) {
                case 'text':
                    return this.value;
                case 'image':
                    return this.value;
                case 'date':
                    return filters.dateFilter(this.value);
                case 'datetime':
                    return filters.dateTimeFilter(this.value);
                case 'time':
                    return filters.timeFilter(this.value);
                case 'year':
                    return filters.yearFilter(this.value);                   
            }
            return this.value;
        },

        renderStyles() {
            if (this.styles) {
                return this.style;
            }

            switch (this.type) {
                case 'text':
                    return {
                        width: '200px'
                    };
                case 'actions':
                    return {
                        width: '120px'
                    };                
            }
            return this.styles;
        }
    },

    methods: {
        
    }
};
</script>

<style lang="scss">
    .table-cell {
        img {
            height: 100%;
            max-width: 150px;
        }
    }
</style>
