<template>

<div 
    v-if="candidate" 
    class="candidate-card" 
    :class="{'focus': focus}" 
    @click="$emit('click')"
>
    <el-card>
        <div class="flex-row js as mb-2">
            <img class="image mr-2" :src="image" alt="">                   
            <div class="header">
                <div class="text-w7 text-lg title">
                    {{ fullName }}
                </div>
                <div class="text-sm text-w3">
                    {{ candidate.curp }}
                </div>                    
            </div>                
        </div>

        <div class="mb-2">
            <div class="text-w3 text-sm mb-1">
                Creada el <span class="text-w4 pl-1">
                    {{ candidate.createdAt | dateFilter }}
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

    &:hover {
        cursor: pointer;
    }

    &.focus .el-card {
        background-color: #ecf6ed;
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
