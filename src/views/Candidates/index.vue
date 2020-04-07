<template>

<split-view class="candidates-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="candidates.length"
            :total-count="candidatesCount"
            add-text="Nuevo Candidato"
            @create="onCreateCandidate"
        ></list-header>

        <candidates-list
            :focus-id="curCandidateId"
            @update:focus-id="onListFocusChange"
        ></candidates-list>

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
                    tooltip="Editar candidate" 
                    icon="el-icon-edit"
                    @click="onCandidateEdit"
                ></tool-button>
                <tool-button
                    class="ml-1"
                    tooltip="Eliminar candidate" 
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
                    @click="onCancelCandidateEdit"
                ></tool-button>
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <candidates-filter 
            v-if="panel === 'search'"
        ></candidates-filter>

        <candidate-details
            v-else-if="panel === 'details'"
            :candidate-id="curCandidateId"
        ></candidate-details>

        <candidate-editor
            v-else-if="panel === 'editor'"
            :edit="curCandidateId !== newCandidateId" 
            :candidate-id="curCandidateId"
            @confirm="onCandidateEditorConfirm"
        ></candidate-editor>
    </template>
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { candidateModel } from '@/store/modules/candidates/models';
import ToolButton from '@/components/ToolButton';
import ListHeader from '@/components/ListHeader';
import SplitView from '@/layout/components/SplitView';
import CandidatesList from './CandidatesList';
import CandidatesFilter from './CandidatesFilter';
import CandidateEditor from './CandidateEditor';
import CandidateDetails from './CandidateDetails';

const newCandidateId = 'newId';

export default {
    name: 'CandidatesIndex',

    components: {
        ToolButton,
        ListHeader,
        SplitView,
        CandidatesList,
        CandidatesFilter,        
        CandidateEditor,
        CandidateDetails        
    },

    data() {
        return {
            panel: 'search',
            curCandidateId: null,
            showDeleteDialog: false,
            loading: false,
            newCandidateId: newCandidateId
        };
    },

    computed: {
        ...mapGetters({
            candidates: 'candidates/sortedItems'
        }),
        candidatesCount() {
            return this.$store.state.candidates.count;
        }
    },

    created() {
        this.$store.dispatch('candidates/fetchItems');
    },

    methods: {

        onCandidateEdit() {
            if (this.curCandidateId !== null) {
                this.panel = 'editor';
            }            
        },

        onCreateCandidate() {
            const candidate = candidateModel.create();
            candidate.id = newCandidateId;
            this.$store.dispatch('candidates/createItem', {
                item: candidate,
                persist: false
            }).then(() => {
                this.curCandidateId = newCandidateId;
                this.panel = 'editor';
            });          
        },

        onCandidateEditorConfirm(candidateId) {
            if (this.panel === 'editor' && this.curCandidateId !== null) {
                this.curCandidateId = candidateId;
                this.panel = 'details';            
                this.$store.dispatch('candidates/fetchItems');
            }            
        },

        onCancelCandidateEdit() {
            if (this.panel === 'editor' && this.curCandidateId !== null) {                
                if (this.curCandidateId === newCandidateId) {
                    this.curCandidateId = null;
                    this.panel = 'search';
                } else {
                    this.panel = 'details';
                } 
            }
        },

        onListFocusChange(candidateId) {            
            this.panel = candidateId === null ? 'search' : 'details';
            this.curCandidateId = candidateId;
        },

        onClearFilter() {
            this.$store.dispatch('candidates/resetFilter');
            this.$store.dispatch('candidates/fetchItems');
        },

        onConfirmDelete() {
            if (this.curCandidateId !== null && this.panel === 'details') {
                this.loading = true;
                this.$store.dispatch(
                    'candidates/destroyItem', this.curCandidateId
                ).then(() => {
                    this.loading = false;
                    this.curCandidateId = null;
                    this.panel = 'search';
                    this.showDeleteDialog = false;
                    this.$store.dispatch('candidates/fetchItems');
                });
            }
        }
    }
};
</script>

<style lang="scss">
</style>
