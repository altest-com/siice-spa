<template>

<div class="corporations-list">

    <el-card v-if="corporations.length" shadow="never" class="mt-5">
        <ab-flex-table>
            <tr>
                <th v-for="key in showHeaders" :key="key">
                    {{ headers[key] }}
                </th>
                <th/>
            </tr>
            <corporation-row
                v-for="corporation in corporations"
                :key="corporation.id"
                :headers="showHeaders"
                :corporation-id="corporation.id"
                :focus="corporation.id === focusId"
                @click="onItemClick(corporation.id)"
                @edit="$emit('edit', corporation.id)"
                @remove="$emit('remove', corporation.id)"
            />
        </ab-flex-table>
    </el-card>

    <ab-empty
        v-else
        title="Sin elementos"
        message="No existen resultados para mostrar"
        height="400px"
    />

    <el-pagination 
        hide-on-single-page
        layout="prev, pager, next"
        class="mt-4"
        :page-size="pageSize" 
        :background="true"
        :current-page="pageNumber"
        :total="corporationsCount"
        @current-change="updatePage"
    />
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import CorporationRow from './CorporationRow';

const headers = {
    name: 'Nombre',
    createdAt: 'Fecha de creación'
};

export default {
    name: 'CorporationsList',

    components: {
        CorporationRow
    },

    props: {
        focusId: {
            type: [Number, String],
            default: null
        },
        showHeaders: {
            type: Array,
            default: () => [
                'name',
                'createdAt'
            ]
        }
    },

    data() {
        return {
            headers: headers
        };
    },

    computed: {
        ...mapGetters({
            corporations: 'corporations/sortedItems'
        }),
        corporationsCount() {
            return this.$store.state.corporations.count;
        },
        pageNumber: function() {
            return this.$store.state.corporations.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.corporations.pageSize;
        }
    },

    methods: {         
        updatePage: function(number) {
            this.$store.dispatch('corporations/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('corporations/fetchItems');
        },
        onItemClick(itemId) {
            const focusId = itemId === this.focusId ? null : itemId;
            this.$emit('update:focus-id', focusId);
        }
    }
};
</script>

<style lang="scss">
</style>
