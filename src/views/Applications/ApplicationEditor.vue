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

        <el-form-item label="Candidato" prop="candidate">
            <query-select
                :multiple="false"
                store="candidates"
                :value="application.candidate"
                @change="val => onParamChange({candidate: val})"
            ></query-select>
        </el-form-item>

        <el-form-item label="Corporación" prop="corporation">
            <query-select
                :multiple="false"
                store="corporations"
                :value="application.corporation"
                @change="val => onParamChange({corporation: val})"
            ></query-select>
        </el-form-item>

        <el-form-item label="Dependencia" prop="dependency">
            <query-select
                :multiple="false"
                store="dependencies"
                :value="application.dependency"
                @change="val => onParamChange({dependency: val})"
            ></query-select>
        </el-form-item>

        <el-form-item label="Adscripción" prop="secondment">
            <query-select
                :multiple="false"
                store="secondments"
                :value="application.secondment"
                @change="val => onParamChange({secondment: val})"
            ></query-select>
        </el-form-item>

        <el-form-item label="Documento origen" prop="document">
            <el-input
                :value="application.document"                    
                @input="val => onParamChange({document: val})"                    
            ></el-input>
        </el-form-item>

        <el-form-item label="Año del oficio" prop="year">
            <el-date-picker
                type="year"
                :value="application.year"                    
                @input="val => onParamChange({year: val})"                    
            ></el-date-picker>
        </el-form-item>

        <el-form-item label="Puesto" prop="position">
            <query-select
                :multiple="false"
                store="positions"
                :value="application.position"
                @change="val => onParamChange({position: val})"
            ></query-select>
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

import QuerySelect from '@/components/QuerySelect';

const rules = {
    candidate: [{
        required: true,
        message: 'Por favor selecciona un candidato',
        trigger: 'blur'
    }],
    corporation: [{
        required: true,
        message: 'Por favor selecciona una corporación',
        trigger: 'blur'
    }],
    dependency: [{
        required: true,
        message: 'Por favor selecciona una dependencia',
        trigger: 'blur'
    }],
    secondment: [{
        required: true,
        message: 'Por favor selecciona una adscripción',
        trigger: 'blur'
    }],
    document: [{
        required: true,
        message: 'Por favor ingresa un documento de origen',
        trigger: 'blur'
    }],
    year: [{
        required: true,
        message: 'Por favor selecciona el año del oficio',
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
        QuerySelect
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
            rules: rules
        };
    },

    computed: {
        application() {
            const id = this.applicationId;
            this.$store.dispatch('applications/getItem', id);
            return this.$store.state.applications.items[id];
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
                this.loading = false;
                this.$emit('confirm', application.id);
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
