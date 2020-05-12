<template>

<div v-if="evaluation" class="evaluation-editor">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="evaluation"            
        :disabled="loading"
        @validate="validate"
    >
        <el-alert
            v-if="alert"
            :title="alert.text"
            :type="alert.type"
            show-icon
            class="mb-3"
        />

        <el-form-item label="Origen de recursos">
            <el-select 
                :value="evaluation.resources" 
                @change="val => onParamChange({resources: val})"
            >
                <el-option
                    v-for="choice in resourcesChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Esquema de evaluación">
            <el-select 
                :value="evaluation.schema" 
                @change="val => onParamChange({schema: val})"
            >
                <el-option
                    v-for="choice in schemaChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Motivo de evaluación">
            <el-select 
                :value="evaluation.reason" 
                @change="val => onParamChange({reason: val})"
            >
                <el-option
                    v-for="choice in reasonChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <div v-for="section in sections" :key="section.key">
            <eval-scheduler :section-id="section.id" :section="section.key" />
        </div>
    </el-form>

    <div class="buttons mt-4">
        <el-button
            type="primary"
            size="small"
            icon="el-icon-check"
            :disabled="loading"
            @click.prevent="onConfirm"            
        >
            Confirmar
        </el-button>      
    </div> 
</div>

</template>

<script>

import { evaluationModel } from '@/store/modules/evaluations/models';
import EvalScheduler from './EvalScheduler';
import params from '../params';

const typeChoices = Object.keys(
    evaluationModel.TYPE_CHOICES
).map(value => ({
    value: value,
    label: evaluationModel.TYPE_CHOICES[value]
}));

const resourcesChoices = Object.keys(
    evaluationModel.RESOURCES_CHOICES
).map(value => ({
    value: value,
    label: evaluationModel.RESOURCES_CHOICES[value]
}));

const schemaChoices = Object.keys(
    evaluationModel.SCHEMA_CHOICES
).map(value => ({
    value: value,
    label: evaluationModel.SCHEMA_CHOICES[value]
}));

const reasonChoices = Object.keys(
    evaluationModel.REASON_CHOICES
).map(value => ({
    value: value,
    label: evaluationModel.REASON_CHOICES[value]
}));

const rules = {
};

const slots = [{
    lower: '09:00',
    upper: '10:00',
    count: 2
}, {
    lower: '10:00',
    upper: '11:00',
    count: 1
}, {
    lower: '11:00',
    upper: '12:00',
    count: 3
}, {
    lower: '02:00',
    upper: '03:00',
    count: 10
}];

export default {
    name: 'EvaluationEditor',

    components: {
        EvalScheduler
    },

    props: {
        evaluationId: {
            type: [Number, String],
            required: true
        },
        edit: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            loading: false,
            alert: null,
            rules: rules,
            typeChoices: typeChoices,
            resourcesChoices: resourcesChoices,
            schemaChoices: schemaChoices,
            reasonChoices: reasonChoices,
            showCalendar: false,
            currSection: null
        };
    },

    computed: {
        evaluation() {
            this.$store.dispatch('evaluations/getItem', this.evaluationId);
            return this.$store.state.evaluations.items[this.evaluationId];
        },

        application() {
            const applicationId = this.evaluation.application;
            this.$store.dispatch('applications/getItem', applicationId);
            return this.$store.state.applications.items[applicationId];
        },

        sections() {
            return Object.keys(params).map(key => ({
                key: key,
                id: this.evaluation[key]
            }));
        }
    },

    created() {
        this.$options.slots = slots;
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('evaluations/updateItem', {
                item: { id: this.evaluationId, ...data }, 
                persist: false
            });
        },

        onConfirm() {
            const form = this.$refs.form;
            if (form) {
                form.validate((valid, fields) => {
                    if (valid) {
                        this.submit();
                    }
                }); 
            }
        },

        submit() {
            const action = this.edit ? 
                'evaluations/updateItem' : 'evaluations/createItem';
            this.$store.dispatch(action, {
                item: this.evaluation,
                persist: true
            }).then(evaluation => {                
                this.loading = false;
                this.$emit('confirm', evaluation.id);
            }).catch((error) => {                
                this.$log.error(error);
                this.loading = false;
            });
        },

        validate(prop, valid, errorMsg) {
            if (!valid) {
                this.alert = {
                    type: 'error',
                    text: errorMsg
                };
            } else {
                this.alert = null;
            }
        }
    }   
};

</script>

<style lang="scss">
</style>
