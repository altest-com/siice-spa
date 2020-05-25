<template>

<div v-if="application" class="application-details">
    <candidate-info :candidate-id="application.candidate" />

    <info-list class="mt-4" :items="infoItems" />

    <el-form
        v-if="!checked"
        size="small"
        label-position="top"
        class="mt-4"           
        :disabled="loading"
    >
        <div class="flex-row js ae">
            <el-form-item class="grow-1">
                <el-select 
                    v-model="evalType" 
                    placeholder="Tipo de evaluación"
                > 
                    <el-option
                        v-for="choice in typeChoices"
                        :key="choice.value"
                        :label="choice.label"
                        :value="choice.value"
                    />
                </el-select>
            </el-form-item>
        </div>
    </el-form>

    <div v-if="!checked" class="flex-row">
        <el-button
            :disabled="loading || !evalType"
            class="block mr-2"
            type="primary"
            round
            icon="el-icon-check"
            size="small"
            @click="onAccept"
        >
            Aceptar
        </el-button>
        <el-button
            :disabled="loading"
            class="block"
            type="primary"
            plain
            round
            icon="el-icon-delete"
            size="small"
            @click="showRejectDialog = true"
        >
            Rechazar
        </el-button>
    </div>

    <ab-delete-dialog
        message="Por favor confirme que desea rechazar esta solicitud 
            Se eliminará cualquier dato asociado."
        :visible.sync="showRejectDialog"
        :disabled="loading"
        @confirm="onReject"
    />
</div>

</template>

<script>

import InfoList from '@/components/InfoList';
import ApplicationData from './ApplicationData';
import { evaluationModel } from '@/store/modules/evaluations/models';
import CandidateInfo from '../Candidates/CandidateInfo';

const typeChoices = Object.keys(
    evaluationModel.TYPE_CHOICES
).map(value => ({
    value: value,
    label: evaluationModel.TYPE_CHOICES[value]
}));

const headers = [
    'status',
    'document',
    'date',
    'corporation',
    'dependency',
    'secondment',
    'position'
];

export default {
    name: 'ApplicationDetails',

    components: {
        InfoList,
        CandidateInfo
    },

    mixins: [ApplicationData],
    
    props: {
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
        checked() {
            return (
                this.application.evaluation || 
                this.application.evaluation === 0
            );
        },
        infoItems() {
            return headers.map(header => this.data[header]);
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

.application-details {
}

</style>
