<template>

<div class="list-item">
    <div v-if="type === 'image'" class="cell">
        <router-link v-if="route" :to="route">
            <img :src="render" alt="" :style="renderStyles">
        </router-link>
        <img v-else :src="render" alt="" :style="renderStyles">
    </div>
    <div v-else class="cell" :style="renderStyles">
        <router-link v-if="route" :to="route">
            {{ renderValue }}
        </router-link>
        <template v-else>{{ renderValue }}</template>        
    </div>
</div>

</template>

<script>

import filters from '@/filters';

export default {
    name: 'ListItem',

    props: {
        type: {
            type: String,
            default: 'char'
        },
        value: {
            type: null,
            default: ''
        },
        styles: {
            type: Object,
            default: null
        },
        route: {
            type: [String, Object],
            default: null
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
                        maxWidth: '200px'
                    };
                case 'image':
                    return {
                        height: '32px',
                        maxWidth: '150px'
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
</style>
