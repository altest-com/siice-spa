<template>

<split-view class="corporations-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="corporations.length"
            :total-count="corporationsCount"
            add-text="Nueva Corporación"
            @create="onCreateCorporation"
        ></list-header>

        <corporations-list
            :focus-id="curCorporationId"
            @update:focus-id="onListFocusChange"
            @edit="onEditCorporation"
            @remove="onRemoveCorporation"
        ></corporations-list>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
            center
        >
            <p>
                ¿Seguro deseas eliminar esta corporación de forma permanente? 
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
            ></tool-button>
        </template>

        <template v-else-if="panel === 'editor'">
            <div class="text-lg text-w6">Editor</div>
            <div class="flex-row">
                <tool-button
                    class="mx-1"
                    tooltip="Cancelar edición" 
                    icon="el-icon-close"
                    @click="onCancelCorporationEdit"
                ></tool-button>
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <corporations-filter 
            v-if="panel === 'search'"
        ></corporations-filter>

        <corporation-editor
            v-else-if="panel === 'editor'"
            :edit="curCorporationId !== newCorporationId" 
            :corporation-id="curCorporationId"
            @confirm="onCorporationEditorConfirm"
        ></corporation-editor>
    </template>
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { corporationModel } from '@/store/modules/corporations/models';
import ToolButton from '@/components/ToolButton';
import ListHeader from '@/components/ListHeader';
import SplitView from '@/layout/components/SplitView';
import CorporationsList from './CorporationsList';
import CorporationsFilter from './CorporationsFilter';
import CorporationEditor from './CorporationEditor';

const newCorporationId = 'newId';

export default {
    name: 'CorporationsIndex',

    components: {
        ToolButton,
        ListHeader,
        SplitView,
        CorporationsList,
        CorporationsFilter,        
        CorporationEditor       
    },

    props: {
    },

    data() {
        return {
            panel: 'search',
            curCorporationId: null,
            showDeleteDialog: false,
            loading: false,
            newCorporationId: newCorporationId
        };
    },

    computed: {
        ...mapGetters({
            corporations: 'corporations/sortedItems'
        }),
        corporationsCount() {
            return this.$store.state.corporations.count;
        }
    },

    created() {
        this.$store.dispatch('corporations/fetchItems');
    },

    methods: {

        onEditCorporation(corporationId) {
            this.curCorporationId = corporationId;
            this.panel = 'editor';            
        },

        onRemoveCorporation(corporationId) {
            this.curCorporationId = corporationId;
            this.showDeleteDialog = true;            
        },

        onCreateCorporation() {
            const corporation = corporationModel.create();
            corporation.id = newCorporationId;
            this.$store.dispatch('corporations/createItem', {
                item: corporation,
                persist: false
            }).then(() => {
                this.curCorporationId = newCorporationId;
                this.panel = 'editor';
            });          
        },

        onCorporationEditorConfirm(corporationId) {
            if (this.panel === 'editor' && this.curCorporationId !== null) {
                this.curCorporationId = corporationId;
                this.panel = 'search';            
                this.$store.dispatch('corporations/fetchItems');
            }            
        },

        onCancelCorporationEdit() {
            if (this.panel === 'editor' && this.curCorporationId !== null) { 
                this.panel = 'search';              
                if (this.curCorporationId === newCorporationId) {
                    this.curCorporationId = null;                    
                } 
            }
        },

        onListFocusChange(corporationId) {
            this.curCorporationId = corporationId;
        },

        onClearFilter() {
            this.$store.dispatch('corporations/resetFilter');
            this.$store.dispatch('corporations/fetchItems');
        },

        onConfirmDelete() {
            if (this.curCorporationId !== null) {
                this.loading = true;
                this.$store.dispatch(
                    'corporations/destroyItem', this.curCorporationId
                ).then(() => {
                    this.loading = false;
                    this.curCorporationId = null;
                    this.panel = 'search';
                    this.showDeleteDialog = false;
                    this.$store.dispatch('corporations/fetchItems');
                });
            }
        }
    }
};
</script>

<style lang="scss">
</style>
