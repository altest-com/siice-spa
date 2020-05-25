<template>

<div v-if="candidate" class="candidate-info">
    <div class="flex-row js as">
        <img :src="image" alt="">
        <div class="ml-2">
            <div class="text-w6 mb-1">{{ fullName }}</div>
            <div>{{ candidate.curp }}</div>
        </div>
    </div>
</div>

</template>

<script>

const defaultImage = require('@/assets/images/user.png');

export default {
    name: 'CandidateInfo',

    components: {
    },
    
    props: {
        candidateId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
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
    }, 

    methods: {
    }
};
</script>

<style lang="scss">

.candidate-info {
    img {
        height: 96px;
        border-radius: 4px;
    }
}

</style>
