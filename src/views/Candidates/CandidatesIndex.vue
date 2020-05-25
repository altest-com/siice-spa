<template>

<ab-split-view class="candidates-index">
    <template v-slot:main>
        <ab-list-header
            class="mb-4"
            :show-count="candidates.length"
            :total-count="candidatesCount"
            add-text="Nuevo Candidato"
            @create="onCreateCandidate"
        />

        <candidates-list
            :view="main"
            :focus-id="curCandidateId"
            @update:focus-id="onListFocusChange"
        />

        <ab-delete-dialog
            message="¿Seguro deseas eliminar este candidato de forma
            permanente? Se eliminará cualquier dato asociado."
            :visible.sync="showDeleteDialog"
            :disabled="loading"
            @confirm="onConfirmDelete"
        />
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'search'">
            <div class="text-lg text-w6">Búsqueda</div>
            <div class="flex-row">
                <ab-tool-button
                    class="ml-1"
                    tooltip="Cambiar vista principal" 
                    :icon="viewIcon"
                    @click="onChangeView"
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
                    tooltip="Editar candidato" 
                    icon="el-icon-edit"
                    @click="onCandidateEdit"
                />
                <ab-tool-button
                    class="ml-1"
                    tooltip="Eliminar candidate" 
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
                    @click="onCancelCandidateEdit"
                />
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <candidates-filter 
            v-if="panel === 'search'"
        />

        <candidate-details
            v-else-if="panel === 'details'"
            class="px-2"
            :candidate-id="curCandidateId"
        />

        <candidate-editor
            v-else-if="panel === 'editor'"
            :edit="curCandidateId !== newCandidateId" 
            :candidate-id="curCandidateId"
            @confirm="onCandidateEditorConfirm"
        />
    </template>
</ab-split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { candidateModel } from '@/store/modules/candidates/models';
import CandidatesList from './CandidatesList';
import CandidatesFilter from './CandidatesFilter';
import CandidateEditor from './CandidateEditor';
import CandidateDetails from './CandidateDetails';

const newCandidateId = 'newId';

export default {
    name: 'CandidatesIndex',

    components: {
        CandidatesList,
        CandidatesFilter,        
        CandidateEditor,
        CandidateDetails        
    },

    data() {
        return {
            panel: 'search',
            main: 'table',
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
        },
        viewIcon() {
            return this.main === 'grid' ? 
                'el-icon-notebook-2' : 'el-icon-s-grid';
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
        },

        onChangeView() {
            this.main = this.main === 'table' ? 'grid' : 'table';
        }
    }
};
</script>

<style lang="scss">
</style>
