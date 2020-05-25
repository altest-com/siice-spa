<template>

<tr class="table-row" :class="{'focus': focus}" @click="$emit('click')">
    <td
        v-for="(item, index) in data" 
        :key="index"
        class="table-cell"
        :class="{[item.class]: item.class}"
    >
        <div v-if="item.type === 'image'" class="cell">
            <router-link v-if="item.route" :to="item.route">
                <img :src="item.value" alt="">
            </router-link>
            <img v-else :src="item.value" alt="">
        </div>
        <div v-else-if="item.type === 'actions'" class="cell">
            <el-button
                v-if="item.edit"
                size="mini"
                icon="el-icon-edit"
                class="mr-1"
                @click.stop="$emit('edit')"
            />
            <el-button
                v-if="item.remove"
                size="mini"
                icon="el-icon-delete"
                type="danger"
                @click.stop="$emit('remove')"
            />
        </div>
        <div v-else class="cell">
            <router-link v-if="item.route" :to="item.route">
                {{ item.value }}
            </router-link>
            <template v-else>{{ item.value }}</template>        
        </div>
    </td>
</tr>

</template>

<script>

import filters from '@/filters';

const filter = {
    'date': filters.dateFilter,
    'time': filters.timeFilter,
    'datetime': filters.dateTimeFilter
};

export default {
    name: 'TableRow',

    props: {
        items: {
            type: Array,
            default: () => []
        },
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
        data() {
            return this.items.map(item => {
                let value = item.value;
                if (value || value === 0) {
                    const filter_ = filter[item.type];
                    value = filter_ ? filter_(value) : value;
                } else {
                    value = '';
                }
                return {
                    ...item,
                    value: value
                };
            });
        }
    }
};
</script>

<style lang="scss">
</style>
