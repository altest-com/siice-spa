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
        ></el-alert>        

        <el-form-item label="Tipo de evaluación" prop="type">
            <el-select
                :value="evaluation.type"
                @change="val => onParamChange({type: val})"
            >
                <el-option
                    v-for="choice in typeChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Fecha y hora programada">
            <el-date-picker
                type="datetime"
                :value="evaluation.scheduledAt"
                @input="val => onParamChange({scheduledAt: val})"  
            ></el-date-picker>
        </el-form-item>     
    </el-form>

    <div class="buttons mt-4 flex-row je ac">
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

const rules = {
};

export default {
    name: 'EvaluationEditor',

    components: {
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
            rules: rules
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
        }
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
