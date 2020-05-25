<template>

<ab-split-view class="evaluations-index">
    <template v-slot:main>
        <ab-list-header
            class="mb-4"
            :show-count="evaluations.length"
            :total-count="evaluationsCount"
            :add-button="false"
        />

        <evaluations-list
            :view="mainView"
            :headers="headers"
            :focus-id="curEvaluationId"
            @update:focus-id="onListFocusChange"
        ></evaluations-list>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
            center
        >
            <p>
                ¿Seguro deseas eliminar esta evaluación de forma permanente? 
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

                    <ab-tool-button
                        slot="reference"
                        :push="false"
                        tooltip="Seleccionar columnas" 
                        icon="el-icon-finished"
                    />
                </el-popover>

                <ab-tool-button
                    class="ml-1"
                    tooltip="Cambiar vista principal" 
                    :icon="viewIcon"
                    @click="onToggleMainView"
                />

                <ab-tool-button
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
                <ab-tool-button
                    class="ml-1"
                    tooltip="Editar evaluation" 
                    icon="el-icon-edit"
                    @click="onEvaluationEdit"
                />
                <ab-tool-button
                    class="ml-1"
                    tooltip="Eliminar evaluation" 
                    icon="el-icon-delete"
                    @click="showDeleteDialog = true"
                />
            </div>                 
        </template>

        <template v-else-if="panel === 'editor'">
            <div class="text-lg text-w6">Editor</div>
            <div class="flex-row">
                <ab-tool-button
                    class="mx-1"
                    tooltip="Cancelar edición" 
                    icon="el-icon-close"
                    @click="onCancelEvaluationEdit"
                />
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <evaluations-filter 
            v-if="panel === 'search'"
            :params="filterParams"
        ></evaluations-filter>

        <evaluation-details
            v-else-if="panel === 'details'"
            :evaluation-id="curEvaluationId"
            :section="section"
        ></evaluation-details>

        <evaluation-editor
            v-else-if="panel === 'editor'"
            :edit="curEvaluationId !== newEvaluationId" 
            :evaluation-id="curEvaluationId"
            @confirm="onEvaluationEditorConfirm"
        ></evaluation-editor>
    </template>
</ab-split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { evaluationModel } from '@/store/modules/evaluations/models';
import EvaluationsList from './EvaluationsList';
import EvaluationsFilter from './EvaluationsFilter';
import EvaluationEditor from './EvaluationEditor';
import EvaluationDetails from './EvaluationDetails';

import headers from './headers';

const headerChoices = Object.keys(headers).map(
    value => ({
        value: value,
        label: headers[value]
    })
);

const initHeaders = [
    'lastName',
    'name',
    'curp',
    'status',
    'type'
];

const newEvaluationId = 'newId';

export default {
    name: 'EvaluationsIndex',

    components: {
        EvaluationsList,
        EvaluationsFilter,        
        EvaluationEditor,
        EvaluationDetails        
    },

    props: {
        section: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            panel: 'search',
            mainView: 'table',
            curEvaluationId: null,
            showDeleteDialog: false,
            loading: false,
            newEvaluationId: newEvaluationId,
            filterParams: {},
            headers: initHeaders,
            headerChoices: headerChoices
        };
    },

    computed: {
        ...mapGetters({
            evaluations: 'evaluations/sortedItems'
        }),
        evaluationsCount() {
            return this.$store.state.evaluations.count;
        },
        viewIcon() {
            return this.mainView === 'grid' ? 
                'el-icon-notebook-2' : 'el-icon-s-grid';
        }
    },

    created() {
        const filterParams = this.$route.query;
        if (filterParams.candidates) {
            this.$store.dispatch('evaluations/setFilter', {
                candidates: [Number(filterParams.candidates)]
            });
        }
        this.$store.dispatch('evaluations/fetchItems');
    },

    beforeRouteUpdate(to, from, next) {
        const filterParams = to.query;
        if (Object.keys(filterParams).length) {
            this.$store.dispatch('evaluations/setFilter', filterParams);
            this.$store.dispatch('evaluations/fetchItems');
        }        
        next();
    },

    methods: {

        onEvaluationEdit() {
            if (this.curEvaluationId !== null) {
                this.panel = 'editor';
            }            
        },

        onCreateEvaluation() {
            const evaluation = evaluationModel.create();
            evaluation.id = newEvaluationId;
            this.$store.dispatch('evaluations/createItem', {
                item: evaluation,
                persist: false
            }).then(() => {
                this.curEvaluationId = newEvaluationId;
                this.panel = 'editor';
            });          
        },

        onEvaluationEditorConfirm(evaluationId) {
            if (this.panel === 'editor' && this.curEvaluationId !== null) {
                this.curEvaluationId = evaluationId;
                this.panel = 'details';            
                this.$store.dispatch('evaluations/fetchItems');
            }            
        },

        onCancelEvaluationEdit() {
            if (this.panel === 'editor' && this.curEvaluationId !== null) {                
                if (this.curEvaluationId === newEvaluationId) {
                    this.curEvaluationId = null;
                    this.panel = 'search';
                } else {
                    this.panel = 'details';
                } 
            }
        },

        onListFocusChange(evaluationId) {            
            this.panel = evaluationId === null ? 'search' : 'details';
            this.curEvaluationId = evaluationId;
        },

        onClearFilter() {
            this.$store.dispatch('evaluations/resetFilter');
            this.$store.dispatch('evaluations/fetchItems');
        },

        onConfirmDelete() {
            if (this.curEvaluationId !== null && this.panel === 'details') {
                this.loading = true;
                this.$store.dispatch(
                    'evaluations/destroyItem', this.curEvaluationId
                ).then(() => {
                    this.loading = false;
                    this.curEvaluationId = null;
                    this.panel = 'search';
                    this.showDeleteDialog = false;
                    this.$store.dispatch('evaluations/fetchItems');
                });
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
