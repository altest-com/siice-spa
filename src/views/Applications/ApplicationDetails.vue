<template>

<div v-if="application" class="application-details">
    <candidate-info 
        :candidate-id="application.candidate"
        class="mb-4"
    ></candidate-info>

    <el-form
        v-if="!checked"
        size="small"
        label-position="top"           
        :disabled="loading"
    >
        <el-form-item label="Tipo de evaluación">
            <el-select v-model="evalType">
                <el-option
                    v-for="choice in typeChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>
    </el-form>

    <div v-if="!checked" class="flex-row mt-4">
        <el-button
            :disabled="loading || !evalType"
            class="block mr-2"
            type="primary"
            icon="el-icon-check"
            size="small"
            @click="onAccept"
        >
            Aceptar
        </el-button>
        <el-button
            :disabled="loading"
            class="block"
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="showRejectDialog = true"
        >
            Rechazar
        </el-button>
    </div>
    
    <el-dialog
        v-if="!checked"
        title="Advertencia"
        :visible.sync="showRejectDialog"
        width="400px"
        center
    >
        <p>
            Por favor confirme que desea rechazar esta solicitud 
            Se eliminará cualquier dato asociado.
        </p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showRejectDialog = false">
                Cancelar
            </el-button>
            <el-button 
                type="primary" 
                :disabled="loading"
                @click="onReject"
            >
                Confirmar
            </el-button>
        </span>
    </el-dialog>
</div>

</template>

<script>

import CandidateInfo from '@/components/CandidateInfo';
import { evaluationModel } from '@/store/modules/evaluations/models';

const typeChoices = Object.keys(
    evaluationModel.TYPE_CHOICES
).map(value => ({
    value: value,
    label: evaluationModel.TYPE_CHOICES[value]
}));

export default {
    name: 'ApplicationDetails',

    components: {
        CandidateInfo
    },
    
    props: {
        applicationId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            loading: false,
            typeChoices: typeChoices,
            evalType: null,
            showRejectDialog: false
        };
    },

    computed: {        
        application() {
            this.$store.dispatch('applications/getItem', this.applicationId);
            return this.$store.state.applications.items[this.applicationId];
        },
        checked() {
            return (
                this.application.evaluation || 
                this.application.evaluation === 0
            );
        }
    }, 

    methods: {
        onAccept() {            
            this.loading = true;

            const evaluation = evaluationModel.create();
            evaluation.type = this.evalType;
            evaluation.application = this.applicationId;
            this.$store.dispatch('evaluations/createItem', {
                item: evaluation,
                persist: true
            }).then(() => {
                this.loading = false;
                this.$emit('accept');
            });
        },

        onReject() {
            this.$store.dispatch(
                'applications/destroyItem', this.applicationId
            ).then(() => {
                this.loading = false;
                this.$emit('reject');
            });
        }
    }
};
</script>

<style lang="scss">
</style>
