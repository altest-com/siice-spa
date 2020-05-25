<template>

<div class="dependencies-list">

    <el-card v-if="dependencies.length" shadow="never" class="mt-5">
        <ab-flex-table>
            <tr>
                <th v-for="key in showHeaders" :key="key">
                    {{ headers[key] }}
                </th>
                <th/>
            </tr>
            <dependency-row
                v-for="dependency in dependencies"
                :key="dependency.id"
                :headers="showHeaders"
                :dependency-id="dependency.id"
                :focus="dependency.id === focusId"
                @click="onItemClick(dependency.id)"
                @edit="$emit('edit', dependency.id)"
                @remove="$emit('remove', dependency.id)"
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
        :total="dependenciesCount"
        @current-change="updatePage"
    />
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import DependencyRow from './DependencyRow';

const headers = {
    name: 'Nombre',
    corporation: 'Corporación',
    createdAt: 'Fecha de creación'
};

export default {
    name: 'DependenciesList',

    components: {
        DependencyRow
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
                'corporation',
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
            dependencies: 'dependencies/sortedItems'
        }),
        dependenciesCount() {
            return this.$store.state.dependencies.count;
        },
        pageNumber: function() {
            return this.$store.state.dependencies.pageNumber + 1;
        },
        pageSize() {
            return this.$store.state.dependencies.pageSize;
        }
    },

    methods: {         
        updatePage: function(number) {
            this.$store.dispatch('dependencies/setPage', number - 1);
            this.updateList();
        },
        updateList: function() {
            this.$store.dispatch('dependencies/fetchItems');
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
