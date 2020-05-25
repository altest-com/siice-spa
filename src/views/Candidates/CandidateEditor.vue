<template>

<div v-if="candidate" class="candidate-editor">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="candidate"            
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

        <el-form-item label="Fotografía">
            <ab-image-uploader
                store="images"
                :multiple="false"
                :upload-url="uploadUrl"
                :upload-headers="uploadHeaders"
                button="block"
                display="carousel"
                :value="candidate.image"
                @input="val => onParamChange({image: val})"
            />
        </el-form-item>

        <el-form-item label="Nombre" prop="name">
            <el-input
                :value="candidate.name"                    
                @input="val => onParamChange({name: val})"                    
            />
        </el-form-item>

        <el-form-item label="Apellidos" prop="lastName">
            <el-input
                :value="candidate.lastName"                    
                @input="val => onParamChange({lastName: val})"                    
            />
        </el-form-item>

        <el-form-item label="CURP" prop="curp">
            <el-input
                :value="candidate.curp"                    
                @input="val => onParamChange({curp: val})"                    
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

import { imagesApi } from "@/store/modules/images";

const rules = {
    name: [{
        required: true,
        message: 'Por favor ingresa el nombre',
        trigger: 'blur'
    }],
    lastName: [{
        required: true,
        message: 'Por favor ingresa los apellidos',
        trigger: 'blur'
    }],
    curp: [{
        required: true,
        message: 'Por favor ingresa la CURP',
        trigger: 'blur'
    }]
};

export default {
    name: 'CandidateEditor',

    components: {
    },

    props: {
        candidateId: {
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
            uploadUrl: imagesApi.getUrl(),
            uploadHeaders: imagesApi.getHeader(),
        };
    },

    computed: {
        candidate() {
            const id = this.candidateId;
            this.$store.dispatch('candidates/getItem', id);
            return this.$store.state.candidates.items[id];
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('candidates/updateItem', {
                item: { id: this.candidateId, ...data }, 
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
                'candidates/updateItem' : 'candidates/createItem';
            this.$store.dispatch(action, {
                item: this.candidate,
                persist: true
            }).then(candidate => {                
                this.loading = false;
                this.$emit('confirm', candidate.id);
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
