<template>

<div 
    v-if="candidate" 
    class="candidate-card" 
    :class="{'focus': focus}" 
    @click="$emit('click')"
>
    <el-card shadow="never">
        <div class="flex-row js as mb-2">
            <img class="image mr-3" :src="image" alt="">                   
            <div class="header">
                <div class="text-w7 title mb-1">
                    {{ fullName }}
                </div>
                <div class="text-sm text-w3">
                    <span class="text-w7">CURP:</span>  {{ candidate.curp }}
                </div>                    
            </div>                
        </div>

        <div class="mb-2">
            <div class="text-w3 text-sm mb-1">
                Registrado el <span class="text-w4 pl-1">
                    {{ candidate.createdAt | dateTimeFilter }}
                </span>
            </div>
        </div>
    </el-card>              
</div>

</template>

<script>

const defaultImage = require('@/assets/images/user.png');

export default {
    name: 'CandidateCard',

    props: {
        candidateId: {
            type: [Number, String],
            required: true
        },
        focus: {
            type: Boolean,
            default: false
        } 
    },

    data: function() {
        return {
        };
    },

    computed: {

        candidate() {
            this.$store.dispatch('candidates/getItem', this.candidateId);
            return this.$store.state.candidates.items[this.candidateId];
        },

        image() {
            const imageId = this.candidate.image;
            if (imageId) {
                this.$store.dispatch('images/getItem', imageId);
                const image = this.$store.state.images.items[imageId];
                if (image) {
                    return image.image;
                }
            }
            return defaultImage;
        },

        fullName() {
            return `${this.candidate.lastName} ${this.candidate.name}`;
        }
    }
};
</script>

<style lang="scss">

.candidate-card {

    .el-card__body {
        padding: 16px;
    }

    &:hover {
        cursor: pointer;
    }

    &.focus .el-card {
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    }

    .image {
        height: 56px;
        width: 56px;
        border-radius: 50%;
    }

    .header {
        flex: 1;
        min-width: 0;
    }

    .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 1px;
        padding-right: 22px;
    }
}
</style>
