<template>

<div v-if="evalSection" class="eval-result">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="evalSection"            
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
        
        <el-form-item label="Resultado" prop="passed">
            <div class="flex-row je ae">
                <el-select 
                    :value="evalSection.passed"
                    @input="val => onParamChange({passed: val})"
                >
                    <el-option
                        label="Aprobado"
                        :value="true"
                    ></el-option>
                    <el-option
                        label="No aprobado"
                        :value="false"
                    ></el-option>
                </el-select>

                <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-check"
                    :disabled="loading"
                    class="ml-2"
                    @click.prevent="onConfirm"          
                >
                    Confirmar
                </el-button>
            </div>
        </el-form-item> 

        <el-form-item label="Resumen de evaluación" prop="result">
            <el-input           
                type="textarea"
                :rows="10"
                :value="evalSection.result"
                @input="val => onParamChange({result: val})"                           
            />
        </el-form-item>
    </el-form>
</div>

</template>

<script>

const rules = {
    result: [{
        required: true,
        message: 'Por favor completa el resumen de la evaluación',
        trigger: 'blur'
    }],
    passed: [{
        type: 'boolean',
        required: true,
        message: 'Por selecciona el resultado de la evaluación',
        trigger: 'blur'
    }]
};

const stores = {
    'socioeconomic': 'socioeconomics',
    'medical': 'medicals',
    'polygraphic': 'polygraphics',
    'psychological': 'psychologicals',
    'toxicological': 'toxicologicals'
};

export default {
    name: 'EvalResult',

    components: {
    },

    props: {
        evaluationId: {
            type: [Number, String],
            required: true
        },
        section: {
            type: String,
            required: true,
            validator: value => Object.keys(stores).includes(value)
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
        evalSection() {
            const evalSectionId = this.evaluation[this.section];
            const store = stores[this.section];
            this.$store.dispatch(`${store}/getItem`, evalSectionId);
            return this.$store.state[store].items[evalSectionId];
        }
    },

    methods: {
        onParamChange(data) {
            const store = stores[this.section];
            this.$store.dispatch(`${store}/updateItem`, {
                item: { id: this.evalSection.id, ...data }, 
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
            const store = stores[this.section];

            this.$store.dispatch(`${store}/updateItem`, {
                item: {
                    id: this.evalSection.id,
                    result: this.evalSection.result,
                    passed: this.evalSection.passed
                },
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
