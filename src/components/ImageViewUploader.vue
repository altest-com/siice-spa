<template>

<div class="image-view-uploader">    
    <empty
        v-if="images.length === 0"
        v-loading="loading"
        title="Imagen"
        message=""
        icon-size="3em"
        :height="height"
        icon="el-icon-camera-solid"
        background="#eee"
    ></empty>
    
    <el-carousel 
        v-else-if="multiple"
        :autoplay="false"
        :height="height"
    >
        <el-carousel-item
            v-for="image in images"
            :key="image.id"
        >
            <image-overlay 
                :image="image.image" 
                :height="height"
                width="100%"
            >
                <el-button
                    icon="el-icon-delete" 
                    type="text"
                    @click="onRemoveImage(image.id)"
                >
                    Eliminar
                </el-button>
            </image-overlay>
        </el-carousel-item>
    </el-carousel>

    <image-overlay
        v-else
        :image="images[0].image" 
        :height="height"
        width="100%"
    >
        <el-button
            icon="el-icon-delete" 
            type="text"
            @click="onRemoveImage(images[0].id)"
        >
            Eliminar
        </el-button>
    </image-overlay>

    <el-upload
        class="upload"
        drag
        :multiple="multiple"
        :name="imageUploadName"
        :action="imageUploadUrl"
        :headers="imageUploadHeader"
        :before-upload="onBeforeUploadImage"
        :on-success="onSuccessImageUpload"
        :on-error="onImageUploadOnError"
        :disabled="loading"
        :show-file-list="false"
        accept="image/png, image/jpeg"
    >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
            Arrasta una imagen aquí o <em>haz click para seleccionar</em>
        </div>
    </el-upload>
</div>

</template>

<script>

import Empty from '@/components/Empty';
import ImageOverlay from '@/components/ImageOverlay';
import {API_URL, getHeader} from '@/api';

export default {
    name: 'ImageViewUploader',

    components: {
        Empty,
        ImageOverlay
    },
    
    props: {
        value: {
            type: [Number, String, Array],
            default: null
        },
        multiple: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: '300px'
        }
    },

    data() {
        return {
            imageUploadName: 'image',
            imageUploadUrl: API_URL + 'images/',
            imageUploadHeader: getHeader(),            
            loading: false,
            alertMessage: null
        };
    },

    computed: {

        images() {
            const images = [];
            let value = [];
            if (this.multiple && Array.isArray(this.value)) {
                value = this.value;
            } else if (this.value || this.value === 0) {
                value = [this.value];
            }

            value.forEach(imageId => {
                this.$store.dispatch('images/getItem', imageId);
                const image = this.$store.state.images.items[imageId];
                if (image) {
                    images.push(image);
                }
            });
            return images;
        }
    },

    methods: {

        onBeforeUploadImage(file) {
            this.loading = true;
        },

        onSuccessImageUpload(response, file) {
            this.loading = false;
            if (this.multiple) {
                this.$emit('input', [...this.value, response.id]); 
            } else {
                this.$emit('input', response.id);   
            }                               
        },

        onImageUploadOnError(error, file, fileList) {
            this.loading = false;
            self.alertMessage = {
                type: 'error',
                text: 'Ha ocurrido un error y no se ha podido cargar la imagen.' 
            };
            this.$log(error);
        },

        onRemoveImage(imageId) {
            this.loading = true;
            this.$store.dispatch(
                'images/destroyItem', imageId
            ).then(() => {  
                this.loading = false;
                if (this.multiple) {
                    this.$emit('input', this.value.filter(
                        val => val !== imageId
                    )); 
                } else {
                    this.$emit('input', null); 
                }
            });
        }
    }
};
</script>

<style lang="scss">

.image-view-uploader {
    margin-bottom: 12px;
    .image-overlay img {
        height: 100%;
        width: 100%;
        background-color: #000000;
        object-fit: contain;
    }
    .el-carousel__item {
        text-align: center;
    }
    .el-carousel__indicators {
        display: none;
    }
}

</style>
