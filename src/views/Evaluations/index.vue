<template>

<split-view class="evaluations-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="evaluations.length"
            :total-count="evaluationsCount"
            :add-button="false"
        ></list-header>

        <evaluations-list
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
                    tooltip="Editar evaluation" 
                    icon="el-icon-edit"
                    @click="onEvaluationEdit"
                ></tool-button>
                <tool-button
                    class="ml-1"
                    tooltip="Eliminar evaluation" 
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
                    @click="onCancelEvaluationEdit"
                ></tool-button>
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <evaluations-filter 
            v-if="panel === 'search'"
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
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { evaluationModel } from '@/store/modules/evaluations/models';
import ToolButton from '@/components/ToolButton';
import ListHeader from '@/components/ListHeader';
import SplitView from '@/layout/components/SplitView';
import EvaluationsList from './EvaluationsList';
import EvaluationsFilter from './EvaluationsFilter';
import EvaluationEditor from './EvaluationEditor';
import EvaluationDetails from './EvaluationDetails';

const newEvaluationId = 'newId';

export default {
    name: 'EvaluationsIndex',

    components: {
        ToolButton,
        ListHeader,
        SplitView,
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
            curEvaluationId: null,
            showDeleteDialog: false,
            loading: false,
            newEvaluationId: newEvaluationId
        };
    },

    computed: {
        ...mapGetters({
            evaluations: 'evaluations/sortedItems'
        }),
        evaluationsCount() {
            return this.$store.state.evaluations.count;
        }
    },

    created() {
        this.$store.dispatch('evaluations/fetchItems');
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
        }
    }
};
</script>

<style lang="scss">
</style>
