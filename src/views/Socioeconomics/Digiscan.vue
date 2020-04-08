<template>

<div v-if="record" class="digiscan">
    <el-form
        ref="form"
        size="small"
        label-position="top"
        :rules="rules"
        :show-message="false"
        :model="record"            
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
            <image-view-uploader
                :multiple="false"
                :value="record.digiImage"                    
                @input="val => onParamChange({digiImage: val})"
            ></image-view-uploader>
        </el-form-item> 

        <el-form-item label="Digiscan" prop="digiEntry">
            <el-select
                :value="record.digiEntry"
                @change="val => onParamChange({digiEntry: val})"
            >
                <el-option
                    v-for="choice in entryChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Fecha" class="digiDate">
            <el-date-picker
                type="date"
                :value="record.digiDate"
                @input="val => onParamChange({digiDate: val})"  
            ></el-date-picker>
        </el-form-item>

        <el-form-item label="Documento de identificación" prop="digiIdType">
            <el-select
                :value="record.digiIdType"
                @change="val => onParamChange({digiIdType: val})"
            >
                <el-option
                    v-for="choice in idTypeChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Número del documento" prop="digiIdNumber">
            <el-input
                :value="record.digiIdNumber"                    
                @input="val => onParamChange({digiIdNumber: val})"                    
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

import ImageViewUploader from '@/components/ImageViewUploader';
import { socioeconomicModel } from '@/store/modules/socioeconomics/models';

const rules = {
    digiEntry: [{
        required: true,
        message: 'Por favor seleccione el tipo de Digiscan',
        trigger: 'blur'
    }],
    digiDate: [{
        required: true,
        message: 'Por favor seleccione la fecha del documento',
        trigger: 'blur'
    }],
    digiIdType: [{
        required: true,
        message: 'Por favor seleccione el tipo de documento',
        trigger: 'blur'
    }],
    digiIdNumber: [{
        required: true,
        message: 'Por favor ingrese el número del documento',
        trigger: 'blur'
    }], 
    digiImage: [{
        required: true,
        message: 'Por favor selecciona una imagen',
        trigger: 'blur'
    }]
};

const entryChoices = Object.keys(
    socioeconomicModel.DIGI_ENTRY_CHOICES
).map(value => ({
    value: value,
    label: socioeconomicModel.DIGI_ENTRY_CHOICES[value]
}));

const idTypeChoices = Object.keys(
    socioeconomicModel.ID_TYPE_CHOICES
).map(value => ({
    value: value,
    label: socioeconomicModel.ID_TYPE_CHOICES[value]
}));

export default {
    name: 'DigiscanEditor',

    components: {
        ImageViewUploader
    },

    props: {
        recordId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            loading: false,
            alert: null,
            rules: rules,
            entryChoices: entryChoices,
            idTypeChoices: idTypeChoices
        };
    },

    computed: {
        record() {
            const id = this.recordId;
            this.$store.dispatch('socioeconomics/getItem', id);
            return this.$store.state.socioeconomics.items[id];
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('socioeconomics/updateItem', {
                item: { id: this.recordId, ...data }, 
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
            this.$store.dispatch('socioeconomics/updateItem', {
                item: this.record,
                persist: true
            }).then(({ id }) => {                
                this.loading = false;
                this.$emit('confirm', id);
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
