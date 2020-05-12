<template>

<split-view class="applications-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="applications.length"
            :total-count="applicationsCount"
            add-text="Nueva Solicitud"
            @create="onCreateApplication"
        />

        <applications-list
            :view="mainView"
            :focus-id="curApplicationId"
            :headers="headers"
            @update:focus-id="onListFocusChange"
        />

        <delete-dialog
            message="¿Seguro deseas eliminar esta solicitud de forma 
                permanente? Se eliminará cualquier dato asociado."
            :visible.sync="showDeleteDialog"
            :disabled="loading"
            @confirm="onConfirmDelete"
        />
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'search'">
            <div class="text-lg text-w6">
                Búsqueda
            </div>
            <div class="flex-row">
                <el-popover
                    v-if="mainView === 'table'"
                    placement="bottom"
                    title="Columnas visibles"
                    width="200"
                    trigger="click"
                    popper-class="select-columns-popper"
                >
                    <el-checkbox-group v-model="headers">
                        <el-checkbox 
                            v-for="choice in headerChoices"
                            :key="choice.value"
                            :label="choice.value" 
                        >
                            {{ choice.label }}
                        </el-checkbox>
                    </el-checkbox-group>

                    <tool-button
                        slot="reference"
                        :push="false"
                        tooltip="Seleccionar columnas" 
                        icon="el-icon-finished"
                    />
                </el-popover>

                <tool-button
                    class="ml-1"
                    tooltip="Cambiar vista principal" 
                    :icon="viewIcon"
                    @click="onToggleMainView"
                />

                <tool-button
                    class="ml-1"
                    tooltip="Restablecer filtro" 
                    icon="el-icon-refresh"
                    @click="onClearFilter"
                />
            </div>            
        </template>

        <template v-else-if="panel === 'details'">
            <div class="text-lg text-w6">Detalles</div>
            <div class="flex-row">
                <tool-button
                    class="ml-1"
                    tooltip="Editar application" 
                    icon="el-icon-edit"
                    @click="onShowEditor"
                />
                <tool-button
                    class="ml-1"
                    tooltip="Eliminar application" 
                    icon="el-icon-delete"
                    @click="showDeleteDialog = true"
                />
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
                />
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <applications-filter 
            v-if="panel === 'search'"
        />

        <application-details
            v-else-if="panel === 'details'"
            :application-id="curApplicationId"
            @reject="onRejected"
            @accept="onAccepted"
        />

        <template v-else-if="panel === 'editor'">
            <template v-if="curApplicationId === newApplicationId">
                <el-form size="small">
                    <el-form-item label="Múltiples" class="switch">
                        <el-switch v-model="multiEdit"></el-switch>
                    </el-form-item>
                </el-form>
                <el-divider class="mt-2 mb-3" />
            </template>

            <application-editor
                :edit="curApplicationId !== newApplicationId" 
                :application-id="curApplicationId"
                @confirm="onEditorConfirm"
            />
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
import DeleteDialog from '@/components/DeleteDialog';
import ApplicationsList from './ApplicationsList';
import ApplicationsFilter from './ApplicationsFilter';
import ApplicationEditor from './ApplicationEditor';
import ApplicationDetails from './ApplicationDetails';

import headers from './headers';

const headerChoices = Object.keys(headers).map(value => ({
    value: value,
    label: headers[value]
}));

const initHeaders = [
    'lastName',
    'name',
    'curp',
    'document',
    'date',
    'position'
];

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
        ApplicationDetails,
        DeleteDialog      
    },

    data() {
        return {
            panel: 'search',
            mainView: 'table',
            curApplicationId: null,
            showDeleteDialog: false,
            loading: false,
            newApplicationId: newApplicationId,
            multiEdit: false,
            headerChoices: headerChoices,
            headers: initHeaders
        };
    },

    computed: {
        ...mapGetters({
            applications: 'applications/sortedItems'
        }),
        applicationsCount() {
            return this.$store.state.applications.count;
        },
        viewIcon() {
            return this.mainView === 'grid' ? 
                'el-icon-notebook-2' : 'el-icon-s-grid';
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
                        date: application.date
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
        },

        onToggleMainView() {
            this.mainView = this.mainView === 'table' ? 'grid' : 'table';
        }
    }
};
</script>

<style lang="scss">
</style>
