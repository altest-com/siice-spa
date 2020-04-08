<template>

<div v-if="image" class="image-upload">
    <div class="image mr-2 px-2" @click="onImagePreview">
        <i class="el-icon-paperclip"></i>
        <div class="name"> {{ name }} </div>
    </div>
    <el-upload
        class="upload-demo"
        :name="imageUploadName"
        :action="imageUploadUrl"
        :headers="imageUploadHeader"
        :before-upload="onBeforeUploadImage"
        :on-success="onSuccessImageUpload"
        :on-error="onImageUploadOnError"
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
        @click="onRemoveImage"
    >
    </el-button>
    
    <el-dialog :visible.sync="showImageDialog">
        <img class="dialog-image" :src="image.image" alt="">
    </el-dialog>       
</div>

</template>

<script>

import {API_URL, getHeader} from '@/api';
import { imageModel } from '@/store/modules/images/models';

const image = imageModel.create();

export default {
    name: 'ImageUpload',
    
    props: {
        value: {
            type: [Number, String],
            default: null
        }
    },

    data() {
        return {
            imageUploadName: 'image',
            imageUploadUrl: API_URL + 'images/',
            imageUploadHeader: getHeader(),            
            loading: false,
            showImageDialog: false,
            imageDialogUrl: ''
        };
    },

    computed: {
        name() {
            const url = this.image.image;
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

        image() {
            if (this.value !== null) {
                this.$store.dispatch('images/getItem', this.value);        
                return this.$store.state.images.items[this.value] || image;
            }
            return image;
        }
    },

    created() {
        if (this.value !== null) {
            this.$store.dispatch('images/getItem', this.value);
        }        
    },

    methods: {

        onBeforeUploadImage(file) {
            this.loading = true;
        },

        onSuccessImageUpload(response, file) {
            this.loading = false;
            this.$emit('input', response.id);                   
        },

        onImageUploadOnError(error, file, fileList) {
            this.loading = false;
            this.$log.error(error);
        },

        onImagePreview() {
            if (this.image.image) {
                this.showImageDialog = true;
            }            
        },

        onRemoveImage() {
            this.loading = true;
            this.$store.dispatch(
                'images/destroyItem', this.image.id
            ).then(() => {
                this.loading = false;              
                this.$emit('input', null);
            });
        }
    }
};
</script>

<style lang="scss">

.image-upload {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .el-upload {
        margin: 0;
    }
    .image {
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
    .dialog-image {
        max-height: 750px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
}

</style>
