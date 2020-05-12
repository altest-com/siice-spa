<template>

<split-view class="positions-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="positions.length"
            :total-count="positionsCount"
            add-text="Nueva Posición"
            @create="onCreatePosition"
        ></list-header>

        <positions-list
            :focus-id="curPositionId"
            @update:focus-id="onListFocusChange"
            @edit="onEditPosition"
            @remove="onRemovePosition"
        ></positions-list>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
            center
        >
            <p>
                ¿Seguro deseas eliminar esta posición de forma permanente? 
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
                    @click="onCancelPositionEdit"
                />
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <positions-filter 
            v-if="panel === 'search'"
        ></positions-filter>

        <position-editor
            v-else-if="panel === 'editor'"
            :edit="curPositionId !== newPositionId" 
            :position-id="curPositionId"
            @confirm="onPositionEditorConfirm"
        ></position-editor>
    </template>
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { positionModel } from '@/store/modules/positions/models';
import ToolButton from '@/components/ToolButton';
import ListHeader from '@/components/ListHeader';
import SplitView from '@/layout/components/SplitView';
import PositionsList from './PositionsList';
import PositionsFilter from './PositionsFilter';
import PositionEditor from './PositionEditor';

const newPositionId = 'newId';

export default {
    name: 'PositionsIndex',

    components: {
        ToolButton,
        ListHeader,
        SplitView,
        PositionsList,
        PositionsFilter,        
        PositionEditor       
    },

    props: {
    },

    data() {
        return {
            panel: 'search',
            curPositionId: null,
            showDeleteDialog: false,
            loading: false,
            newPositionId: newPositionId
        };
    },

    computed: {
        ...mapGetters({
            positions: 'positions/sortedItems'
        }),
        positionsCount() {
            return this.$store.state.positions.count;
        }
    },

    created() {
        this.$store.dispatch('positions/fetchItems');
    },

    methods: {

        onEditPosition(positionId) {
            this.curPositionId = positionId;
            this.panel = 'editor';            
        },

        onRemovePosition(positionId) {
            this.curPositionId = positionId;
            this.showDeleteDialog = true;            
        },

        onCreatePosition() {
            const position = positionModel.create();
            position.id = newPositionId;
            this.$store.dispatch('positions/createItem', {
                item: position,
                persist: false
            }).then(() => {
                this.curPositionId = newPositionId;
                this.panel = 'editor';
            });          
        },

        onPositionEditorConfirm(positionId) {
            if (this.panel === 'editor' && this.curPositionId !== null) {
                this.curPositionId = positionId;
                this.panel = 'search';            
                this.$store.dispatch('positions/fetchItems');
            }            
        },

        onCancelPositionEdit() {
            if (this.panel === 'editor' && this.curPositionId !== null) { 
                this.panel = 'search';              
                if (this.curPositionId === newPositionId) {
                    this.curPositionId = null;                    
                } 
            }
        },

        onListFocusChange(positionId) {
            this.curPositionId = positionId;
        },

        onClearFilter() {
            this.$store.dispatch('positions/resetFilter');
            this.$store.dispatch('positions/fetchItems');
        },

        onConfirmDelete() {
            if (this.curPositionId !== null) {
                this.loading = true;
                this.$store.dispatch(
                    'positions/destroyItem', this.curPositionId
                ).then(() => {
                    this.loading = false;
                    this.curPositionId = null;
                    this.panel = 'search';
                    this.showDeleteDialog = false;
                    this.$store.dispatch('positions/fetchItems');
                });
            }
        }
    }
};
</script>

<style lang="scss">
</style>
