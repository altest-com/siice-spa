<template>

<div v-if="application" class="application-editor">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="application"            
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

        <el-form-item label="Corporación" prop="corporation">
            <ab-query-select
                store="corporations"
                :clearable="false"       
                :value="corporation_ || application.corporation"
                @change="val => corporation_ = val"
            ></ab-query-select>
        </el-form-item>

        <el-form-item label="Dependencia" prop="dependency">
            <ab-query-select
                store="dependencies"
                :clearable="false"            
                :params="dependencyQueryParams"
                :value="dependency_ || application.dependency"
                @change="val => dependency_ = val"
            ></ab-query-select>
        </el-form-item>

        <el-form-item label="Adscripción" prop="secondment">
            <ab-query-select
                store="secondments"
                :clearable="false"
                :params="secondmentQueryParams"
                :value="secondment_ || application.secondment"
                @change="val => secondment_ = val"
            ></ab-query-select>
        </el-form-item>

        <el-form-item label="Puesto" prop="position">
            <ab-query-select
                store="positions"
                :clearable="false"
                :params="positionQueryParams"
                :value="application.position"
                @change="val => onParamChange({position: val})"
            ></ab-query-select>
        </el-form-item>  

        <el-form-item label="Documento origen" prop="document">
            <el-input
                :value="application.document"                    
                @input="val => onParamChange({document: val})"                    
            ></el-input>
        </el-form-item>

        <el-form-item label="Fecha del oficio" prop="date">
            <el-date-picker
                type="date"
                :value="application.date"                    
                @input="val => onParamChange({date: val})"                    
            ></el-date-picker>
        </el-form-item>

        <el-form-item label="Candidato" prop="candidate">
            <ab-query-select
                store="candidates"
                query="curp__icontains"
                popper-class="candidate-query"                
                :clearable="false"
                :preload="0"
                :fields="['name', 'last_name', 'curp']"
                :labels="['last_name', 'name']"
                :value="application.candidate"
                @change="val => onParamChange({candidate: val})"
            >
                <template v-slot="{ choice }">
                    <div class="query-name">
                        {{ `${choice.last_name} ${choice.name}` }}
                    </div>
                    <div class="query-curp">
                        {{ choice.curp }}
                    </div>
                </template>
            </ab-query-select>
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
    candidate: [{
        required: true,
        message: 'Por favor selecciona un candidato',
        trigger: 'blur'
    }],
    document: [{
        required: true,
        message: 'Por favor ingresa un documento de origen',
        trigger: 'blur'
    }],
    date: [{
        required: true,
        message: 'Por favor selecciona la fecha del oficio',
        trigger: 'blur'
    }],
    position: [{
        required: true,
        message: 'Por favor selecciona un puesto',
        trigger: 'blur'
    }],
    corporación: [{
        required: true,
        message: 'Por favor selecciona una corporación',
        trigger: 'blur'
    }]
};

export default {
    name: 'ApplicationEditor',

    components: {
    },

    props: {
        applicationId: {
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
            bulk: false,
            corporation_: null,
            dependency_: null,
            secondment_: null
        };
    },

    computed: {
        application() {
            const id = this.applicationId;
            this.$store.dispatch('applications/getItem', id);
            return this.$store.state.applications.items[id];
        },

        positionQueryParams() {
            const id = this.secondment_ || this.application.secondment;
            return id ? { 'secondment_id__in': [id] } : {};
        },

        secondmentQueryParams() {
            const id = this.dependency_ || this.application.dependency;
            return id ? { 'dependency_id__in': [id] } : {};
        },

        dependencyQueryParams() {
            const id = this.corporation_ || this.application.corporation;
            return id ? { 'corporation_id__in': [id] } : {};
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('applications/updateItem', {
                item: { id: this.applicationId, ...data }, 
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
                'applications/updateItem' : 'applications/createItem';
            this.$store.dispatch(action, {
                item: this.application,
                persist: true
            }).then(application => {
                this.$emit('confirm', application);
            }).catch((error) => {                
                this.$log.error(error);
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

@import '@/styles/components.scss';

</style>
