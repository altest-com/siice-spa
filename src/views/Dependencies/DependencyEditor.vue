<template>

<div v-if="dependency" class="dependency-editor">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="dependency"            
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

        <el-form-item label="Nombre" prop="name">
            <el-input
                :value="dependency.name"                    
                @input="val => onParamChange({name: val})"                    
            ></el-input>
        </el-form-item>

        <el-form-item label="Corporación" prop="corporation">
            <ab-query-select
                store="corporations"
                :clearable="false"
                :value="dependency.corporation"
                @change="val => onParamChange({corporation: val})"
            ></ab-query-select>
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
    name: [{
        required: true,
        message: 'Por favor ingresa el nombre de la dependecia',
        trigger: 'blur'
    }],
    corporation: [{
        required: true,
        message: 'Por favor selecciona una corporación',
        trigger: 'blur'
    }]
};

export default {
    name: 'DependencyEditor',

    props: {
        dependencyId: {
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
        dependency() {
            const id = this.dependencyId;
            this.$store.dispatch('dependencies/getItem', id);
            return this.$store.state.dependencies.items[id];
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('dependencies/updateItem', {
                item: { id: this.dependencyId, ...data }, 
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
                'dependencies/updateItem' : 'dependencies/createItem';
            this.$store.dispatch(action, {
                item: this.dependency,
                persist: true
            }).then(dependency => {                
                this.loading = false;
                this.$emit('confirm', dependency.id);
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
