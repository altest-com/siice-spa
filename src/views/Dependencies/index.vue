<template>

<split-view class="dependencies-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="dependencies.length"
            :total-count="dependenciesCount"
            add-text="Nueva Dependencia"
            @create="onCreateDependency"
        ></list-header>

        <dependencies-list
            :focus-id="curDependencyId"
            @update:focus-id="onListFocusChange"
            @edit="onEditDependency"
            @remove="onRemoveDependency"
        ></dependencies-list>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
            center
        >
            <p>
                ¿Seguro deseas eliminar esta dependencia de forma permanente? 
                Se eliminará cualquier dato asociado.
            </p>
            <div slot="footer" class="flex-row jc">
                <el-button @click="showDeleteDialog = false">
                    Cancelar
                </el-button>
                <el-button
                    class="ml-2"
                    type="primary" 
                    :disabled="loading"
                    @click="onConfirmDelete"
                >
                    Confirmar
                </el-button>
            </div>
        </el-dialog>
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'search'">
            <div class="text-lg text-w6">Búsqueda</div>
            <tool-button
                class="ml-1"
                tooltip="Restablecer filtro" 
                icon="el-icon-refresh"
                @click="onClearFilter"
            />
        </template>

        <template v-else-if="panel === 'editor'">
            <div class="text-lg text-w6">Editor</div>
            <div class="flex-row">
                <tool-button
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
        ></dependencies-filter>

        <dependency-editor
            v-else-if="panel === 'editor'"
            :edit="curDependencyId !== newDependencyId" 
            :dependency-id="curDependencyId"
            @confirm="onDependencyEditorConfirm"
        ></dependency-editor>
    </template>
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { dependencyModel } from '@/store/modules/dependencies/models';
import ToolButton from '@/components/ToolButton';
import ListHeader from '@/components/ListHeader';
import SplitView from '@/layout/components/SplitView';
import DependenciesList from './DependenciesList';
import DependenciesFilter from './DependenciesFilter';
import DependencyEditor from './DependencyEditor';

const newDependencyId = 'newId';

export default {
    name: 'DependenciesIndex',

    components: {
        ToolButton,
        ListHeader,
        SplitView,
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
