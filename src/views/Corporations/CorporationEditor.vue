<template>

<div v-if="corporation" class="corporation-editor">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="corporation"            
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
                :value="corporation.name"                    
                @input="val => onParamChange({name: val})"                    
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
        message: 'Por favor ingresa el nombre de la corporación',
        trigger: 'blur'
    }]
};

export default {
    name: 'CorporationEditor',

    components: {
    },

    props: {
        corporationId: {
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
        corporation() {
            const id = this.corporationId;
            this.$store.dispatch('corporations/getItem', id);
            return this.$store.state.corporations.items[id];
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('corporations/updateItem', {
                item: { id: this.corporationId, ...data }, 
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
                'corporations/updateItem' : 'corporations/createItem';
            this.$store.dispatch(action, {
                item: this.corporation,
                persist: true
            }).then(corporation => {                
                this.loading = false;
                this.$emit('confirm', corporation.id);
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
