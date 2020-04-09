<template>

<div v-if="file" class="file-uploader">
    <div class="file mr-2 px-2">
        <i class="el-icon-paperclip"></i>
        <div class="name"> {{ name }} </div>
    </div>
    <el-upload
        class="upload-demo"
        :name="fileUploadName"
        :action="fileUploadUrl"
        :headers="fileUploadHeader"
        :before-upload="onBeforeUploadFile"
        :on-success="onSuccessFileUpload"
        :on-error="onFileUploadOnError"
        :multiple="false"
        :show-file-list="false"
    >
        <el-button size="small" type="primary" icon="el-icon-upload">
        </el-button>
    </el-upload>
    <el-button
        class="ml-1"
        size="small" 
        type="info" 
        icon="el-icon-close"
        @click="onRemoveFile"
    >
    </el-button>      
</div>

</template>

<script>

import {API_URL, getHeader} from '@/api';
import { fileModel } from '@/store/modules/files/models';

const file = fileModel.create();

export default {
    name: 'FileUpload',
    
    props: {
        value: {
            type: [Number, String],
            default: null
        }
    },

    data() {
        return {
            fileUploadName: 'file',
            fileUploadUrl: API_URL + 'files/',
            fileUploadHeader: getHeader(),            
            loading: false
        };
    },

    computed: {
        name() {
            const url = this.file.file;
            if (url) {
                const parts = new URL(url).pathname.split('/');
                for (let i = parts.length - 1; i >= 0; i--) {
                    if (parts[i]) {
                        return parts[i];
                    }                    
                }
            }
            return url;            
        },

        file() {
            if (this.value !== null) {
                this.$store.dispatch('files/getItem', this.value);        
                return this.$store.state.files.items[this.value] || file;
            }
            return file;
        }
    },

    created() {
        if (this.value !== null) {
            this.$store.dispatch('files/getItem', this.value);
        }        
    },

    methods: {

        onBeforeUploadFile(file) {
            this.loading = true;
        },

        onSuccessFileUpload(response, file) {
            this.loading = false;
            this.$emit('input', response.id);                   
        },

        onFileUploadOnError(error, file, fileList) {
            this.loading = false;
            this.$log.error(error);
        },

        onRemoveFile() {
            this.loading = true;
            this.$store.dispatch(
                'files/destroyItem', this.file.id
            ).then(() => {
                this.loading = false;              
                this.$emit('input', null);
            });
        }
    }
};
</script>

<style lang="scss">

.file-uploader {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .el-upload {
        margin: 0;
    }
    .file {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;
        height: 37px;
        background-color: #f4f4f5;
        color: #606266;
        border-radius: 6px;        
        &:hover {
            cursor: pointer;
        }
        i {
            white-space: nowrap;
            display: block;
            padding-right: 4px;
        }
        .name {
            flex: 1;  
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .dialog-file {
        max-height: 750px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
}

</style>
