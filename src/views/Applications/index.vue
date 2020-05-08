<template>

<split-view class="applications-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="applications.length"
            :total-count="applicationsCount"
            add-text="Nueva Solicitud"
            @create="onCreateApplication"
        ></list-header>

        <applications-list
            :focus-id="curApplicationId"
            @update:focus-id="onListFocusChange"
        ></applications-list>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
            center
        >
            <p>
                ¿Seguro deseas eliminar esta solicitud de forma permanente? 
                Se eliminará cualquier dato asociado.
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDeleteDialog = false">
                    Cancelar
                </el-button>
                <el-button 
                    type="primary" 
                    :disabled="loading"
                    @click="onConfirmDelete"
                >
                    Confirmar
                </el-button>
            </span>
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
            ></tool-button>
        </template>

        <template v-else-if="panel === 'details'">
            <div class="text-lg text-w6">Detalles</div>
            <div class="flex-row">
                <tool-button
                    class="ml-1"
                    tooltip="Editar application" 
                    icon="el-icon-edit"
                    @click="onShowEditor"
                ></tool-button>
                <tool-button
                    class="ml-1"
                    tooltip="Eliminar application" 
                    icon="el-icon-delete"
                    @click="showDeleteDialog = true"
                ></tool-button>
            </div>                 
        </template>

        <template v-else-if="panel === 'editor'">
            <div class="text-lg text-w6">Editor</div>
            <div class="flex-row">
                <tool-button
                    class="mx-1"
                    tooltip="Cancelar edición" 
                    icon="el-icon-close"
                    @click="onEditorCancel"
                ></tool-button>
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <applications-filter 
            v-if="panel === 'search'"
        ></applications-filter>

        <application-details
            v-else-if="panel === 'details'"
            :application-id="curApplicationId"
            @reject="onRejected"
            @accept="onAccepted"
        ></application-details>

        <template v-else-if="panel === 'editor'">
            <template v-if="curApplicationId === newApplicationId">
                <el-form size="small">
                    <el-form-item label="Múltiples" class="switch">
                        <el-switch v-model="multiEdit"></el-switch>
                    </el-form-item>
                </el-form>
                <el-divider class="mt-2 mb-3"></el-divider>
            </template>

            <application-editor
                :edit="curApplicationId !== newApplicationId" 
                :application-id="curApplicationId"
                @confirm="onEditorConfirm"
            ></application-editor>
        </template>
    </template>
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { applicationModel } from '@/store/modules/applications/models';
import ToolButton from '@/components/ToolButton';
import ListHeader from '@/components/ListHeader';
import SplitView from '@/layout/components/SplitView';
import ApplicationsList from './ApplicationsList';
import ApplicationsFilter from './ApplicationsFilter';
import ApplicationEditor from './ApplicationEditor';
import ApplicationDetails from './ApplicationDetails';

const newApplicationId = 'newId';

export default {
    name: 'ApplicationsIndex',

    components: {
        ToolButton,
        ListHeader,
        SplitView,
        ApplicationsList,
        ApplicationsFilter,        
        ApplicationEditor,
        ApplicationDetails        
    },

    data() {
        return {
            panel: 'search',
            curApplicationId: null,
            showDeleteDialog: false,
            loading: false,
            newApplicationId: newApplicationId,
            multiEdit: false
        };
    },

    computed: {
        ...mapGetters({
            applications: 'applications/sortedItems'
        }),
        applicationsCount() {
            return this.$store.state.applications.count;
        }
    },

    created() {
        this.$store.dispatch('applications/fetchItems');
    },

    methods: {

        onShowEditor() {
            if (this.curApplicationId !== null) {
                this.panel = 'editor';
            }            
        },

        onCreateApplication(data = {}) {
            const application = applicationModel.create();
            application.id = newApplicationId;
            Object.assign(application, data);

            this.$store.dispatch('applications/createItem', {
                item: application,
                persist: false
            }).then(() => {
                this.curApplicationId = newApplicationId;
                this.panel = 'editor';
            });          
        },

        onEditorConfirm(application) {
            if (this.panel === 'editor') {
                this.$store.dispatch('applications/fetchItems');
                if (this.multiEdit && 
                    this.curApplicationId === newApplicationId
                ) {
                    this.onCreateApplication({
                        position: application.position,
                        document: application.document,
                        year: application.year
                    });
                } else {
                    this.curApplicationId = application.id;
                    this.panel = 'details';                    
                }
            }            
        },

        onEditorCancel() {
            if (this.panel === 'editor' && this.curApplicationId !== null) {                
                if (this.curApplicationId === newApplicationId) {
                    this.curApplicationId = null;
                    this.panel = 'search';
                } else {
                    this.panel = 'details';
                } 
            }
        },

        onListFocusChange(applicationId) {            
            this.panel = applicationId === null ? 'search' : 'details';
            this.curApplicationId = applicationId;
        },

        onClearFilter() {
            this.$store.dispatch('applications/resetFilter');
            this.$store.dispatch('applications/fetchItems');
        },

        onConfirmDelete() {
            if (this.curApplicationId !== null && this.panel === 'details') {
                this.loading = true;
                this.$store.dispatch(
                    'applications/destroyItem', this.curApplicationId
                ).then(() => {
                    this.loading = false;
                    this.curApplicationId = null;
                    this.panel = 'search';
                    this.showDeleteDialog = false;
                    this.$store.dispatch('applications/fetchItems');
                });
            }
        },

        onRejected() {
            if (this.curApplicationId !== null && this.panel === 'details') {
                this.curApplicationId = null;
                this.panel = 'search';
                this.$store.dispatch('applications/fetchItems');
            }
        },

        onAccepted() {
            if (this.curApplicationId !== null && this.panel === 'details') {
                this.curApplicationId = null;
                this.panel = 'search';
                this.$store.dispatch('applications/fetchItems');
            }
        }
    }
};
</script>

<style lang="scss">
</style>
