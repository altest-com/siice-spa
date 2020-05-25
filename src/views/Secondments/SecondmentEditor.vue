<template>

<div v-if="secondment" class="secondment-editor">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="secondment"            
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
                :value="secondment.name"                    
                @input="val => onParamChange({name: val})"                    
            />
        </el-form-item>

        <el-form-item label="Corporación" prop="corporation">
            <ab-query-select
                store="corporations"                
                :clearable="false"
                :value="corporation_ || secondment.corporation"
                @change="val => corporation_ = val"
            />
        </el-form-item>

        <el-form-item label="Dependencia" prop="dependency">
            <ab-query-select
                store="dependencies"
                :clearable="false"
                :params="queryParams"
                :value="secondment.dependency"
                @change="val => onParamChange({dependency: val})"
            />
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
        message: 'Por favor ingresa el nombre de la adscripción',
        trigger: 'blur'
    }],
    dependency: [{
        required: true,
        message: 'Por favor selecciona una dependencia',
        trigger: 'blur'
    }]
};

export default {
    name: 'SecondmentEditor',

    components: {
    },

    props: {
        secondmentId: {
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
            corporation_: null
        };
    },

    computed: {
        secondment() {
            const id = this.secondmentId;
            this.$store.dispatch('secondments/getItem', id);
            return this.$store.state.secondments.items[id];
        },
        queryParams() {
            const id = this.corporation_ || this.secondment.corporation;
            return id ? { 'corporation_id__in': [id] } : {};
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('secondments/updateItem', {
                item: { id: this.secondmentId, ...data }, 
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
                'secondments/updateItem' : 'secondments/createItem';
            this.$store.dispatch(action, {
                item: this.secondment,
                persist: true
            }).then(secondment => {                
                this.loading = false;
                this.$emit('confirm', secondment.id);
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
