<template>

<ab-split-view class="dependencies-index">
    <template v-slot:main>
        <ab-list-header
            class="mb-4"
            :show-count="dependencies.length"
            :total-count="dependenciesCount"
            add-text="Nueva Dependencia"
            @create="onCreateDependency"
        />

        <dependencies-list
            :focus-id="curDependencyId"
            @update:focus-id="onListFocusChange"
            @edit="onEditDependency"
            @remove="onRemoveDependency"
        />

        <ab-delete-dialog
            message="¿Seguro deseas eliminar esta dependencia de forma
                permanente? Se eliminará cualquier dato asociado."
            :visible.sync="showDeleteDialog"
            :disabled="loading"
            @confirm="onConfirmDelete"
        />
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'search'">
            <div class="text-lg text-w6">Búsqueda</div>
            <ab-tool-button
                class="ml-1"
                tooltip="Restablecer filtro" 
                icon="el-icon-refresh"
                @click="onClearFilter"
            />
        </template>

        <template v-else-if="panel === 'editor'">
            <div class="text-lg text-w6">Editor</div>
            <div class="flex-row">
                <ab-tool-button
                    class="mx-1"
                    tooltip="Cancelar edición" 
                    icon="el-icon-close"
                    @click="onCancelDependencyEdit"
                />
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <dependencies-filter 
            v-if="panel === 'search'"
        />
        <dependency-editor
            v-else-if="panel === 'editor'"
            :edit="curDependencyId !== newDependencyId" 
            :dependency-id="curDependencyId"
            @confirm="onDependencyEditorConfirm"
        />
    </template>
</ab-split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { dependencyModel } from '@/store/modules/dependencies/models';
import DependenciesList from './DependenciesList';
import DependenciesFilter from './DependenciesFilter';
import DependencyEditor from './DependencyEditor';

const newDependencyId = 'newId';

export default {
    name: 'DependenciesIndex',

    components: {
        DependenciesList,
        DependenciesFilter,        
        DependencyEditor       
    },

    props: {
    },

    data() {
        return {
            panel: 'search',
            curDependencyId: null,
            showDeleteDialog: false,
            loading: false,
            newDependencyId: newDependencyId
        };
    },

    computed: {
        ...mapGetters({
            dependencies: 'dependencies/sortedItems'
        }),
        dependenciesCount() {
            return this.$store.state.dependencies.count;
        }
    },

    created() {
        this.$store.dispatch('dependencies/fetchItems');
    },

    methods: {

        onEditDependency(dependencyId) {
            this.curDependencyId = dependencyId;
            this.panel = 'editor';            
        },

        onRemoveDependency(dependencyId) {
            this.curDependencyId = dependencyId;
            this.showDeleteDialog = true;            
        },

        onCreateDependency() {
            const dependency = dependencyModel.create();
            dependency.id = newDependencyId;
            this.$store.dispatch('dependencies/createItem', {
                item: dependency,
                persist: false
            }).then(() => {
                this.curDependencyId = newDependencyId;
                this.panel = 'editor';
            });          
        },

        onDependencyEditorConfirm(dependencyId) {
            if (this.panel === 'editor' && this.curDependencyId !== null) {
                this.curDependencyId = dependencyId;
                this.panel = 'search';            
                this.$store.dispatch('dependencies/fetchItems');
            }            
        },

        onCancelDependencyEdit() {
            if (this.panel === 'editor' && this.curDependencyId !== null) { 
                this.panel = 'search';              
                if (this.curDependencyId === newDependencyId) {
                    this.curDependencyId = null;                    
                } 
            }
        },

        onListFocusChange(dependencyId) {
            this.curDependencyId = dependencyId;
        },

        onClearFilter() {
            this.$store.dispatch('dependencies/resetFilter');
            this.$store.dispatch('dependencies/fetchItems');
        },

        onConfirmDelete() {
            if (this.curDependencyId !== null) {
                this.loading = true;
                this.$store.dispatch(
                    'dependencies/destroyItem', this.curDependencyId
                ).then(() => {
                    this.loading = false;
                    this.curDependencyId = null;
                    this.panel = 'search';
                    this.showDeleteDialog = false;
                    this.$store.dispatch('dependencies/fetchItems');
                });
            }
        }
    }
};
</script>

<style lang="scss">
</style>
