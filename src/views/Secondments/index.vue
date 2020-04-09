<template>

<split-view class="secondments-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="secondments.length"
            :total-count="secondmentsCount"
            add-text="Nueva Adscripción"
            @create="onCreateSecondment"
        ></list-header>

        <secondments-list
            :focus-id="curSecondmentId"
            @update:focus-id="onListFocusChange"
            @edit="onEditSecondment"
            @remove="onRemoveSecondment"
        ></secondments-list>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
            center
        >
            <p>
                ¿Seguro deseas eliminar esta adscripción de forma permanente? 
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
                    @click="onCancelSecondmentEdit"
                ></tool-button>
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <secondments-filter 
            v-if="panel === 'search'"
        ></secondments-filter>

        <secondment-editor
            v-else-if="panel === 'editor'"
            :edit="curSecondmentId !== newSecondmentId" 
            :secondment-id="curSecondmentId"
            @confirm="onSecondmentEditorConfirm"
        ></secondment-editor>
    </template>
</split-view>

</template>

<script>

import { mapGetters } from 'vuex';
import { secondmentModel } from '@/store/modules/secondments/models';
import ToolButton from '@/components/ToolButton';
import ListHeader from '@/components/ListHeader';
import SplitView from '@/layout/components/SplitView';
import SecondmentsList from './SecondmentsList';
import SecondmentsFilter from './SecondmentsFilter';
import SecondmentEditor from './SecondmentEditor';

const newSecondmentId = 'newId';

export default {
    name: 'SecondmentsIndex',

    components: {
        ToolButton,
        ListHeader,
        SplitView,
        SecondmentsList,
        SecondmentsFilter,        
        SecondmentEditor       
    },

    props: {
    },

    data() {
        return {
            panel: 'search',
            curSecondmentId: null,
            showDeleteDialog: false,
            loading: false,
            newSecondmentId: newSecondmentId
        };
    },

    computed: {
        ...mapGetters({
            secondments: 'secondments/sortedItems'
        }),
        secondmentsCount() {
            return this.$store.state.secondments.count;
        }
    },

    created() {
        this.$store.dispatch('secondments/fetchItems');
    },

    methods: {

        onEditSecondment(secondmentId) {
            this.curSecondmentId = secondmentId;
            this.panel = 'editor';            
        },

        onRemoveSecondment(secondmentId) {
            this.curSecondmentId = secondmentId;
            this.showDeleteDialog = true;            
        },

        onCreateSecondment() {
            const secondment = secondmentModel.create();
            secondment.id = newSecondmentId;
            this.$store.dispatch('secondments/createItem', {
                item: secondment,
                persist: false
            }).then(() => {
                this.curSecondmentId = newSecondmentId;
                this.panel = 'editor';
            });          
        },

        onSecondmentEditorConfirm(secondmentId) {
            if (this.panel === 'editor' && this.curSecondmentId !== null) {
                this.curSecondmentId = secondmentId;
                this.panel = 'search';            
                this.$store.dispatch('secondments/fetchItems');
            }            
        },

        onCancelSecondmentEdit() {
            if (this.panel === 'editor' && this.curSecondmentId !== null) { 
                this.panel = 'search';              
                if (this.curSecondmentId === newSecondmentId) {
                    this.curSecondmentId = null;                    
                } 
            }
        },

        onListFocusChange(secondmentId) {
            this.curSecondmentId = secondmentId;
        },

        onClearFilter() {
            this.$store.dispatch('secondments/resetFilter');
            this.$store.dispatch('secondments/fetchItems');
        },

        onConfirmDelete() {
            if (this.curSecondmentId !== null) {
                this.loading = true;
                this.$store.dispatch(
                    'secondments/destroyItem', this.curSecondmentId
                ).then(() => {
                    this.loading = false;
                    this.curSecondmentId = null;
                    this.panel = 'search';
                    this.showDeleteDialog = false;
                    this.$store.dispatch('secondments/fetchItems');
                });
            }
        }
    }
};
</script>

<style lang="scss">
</style>
