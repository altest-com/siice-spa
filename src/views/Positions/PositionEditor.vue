<template>

<div v-if="position" class="position-editor">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="position"            
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
                :value="position.name"                    
                @input="val => onParamChange({name: val})"                    
            ></el-input>
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
        message: 'Por favor ingresa el nombre de la posición',
        trigger: 'blur'
    }]
};

export default {
    name: 'PositionEditor',

    components: {
    },

    props: {
        positionId: {
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
        position() {
            const id = this.positionId;
            this.$store.dispatch('positions/getItem', id);
            return this.$store.state.positions.items[id];
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('positions/updateItem', {
                item: { id: this.positionId, ...data }, 
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
                'positions/updateItem' : 'positions/createItem';
            this.$store.dispatch(action, {
                item: this.position,
                persist: true
            }).then(position => {                
                this.loading = false;
                this.$emit('confirm', position.id);
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
