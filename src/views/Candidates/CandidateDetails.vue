<template>

<div v-if="candidate" class="candidate-details">
     <candidate-info 
        :candidate-id="candidateId"
        class="mb-4"
    ></candidate-info>
</div>

</template>

<script>

const defaultImage = require('@/assets/images/user.png');
import CandidateInfo from '@/components/CandidateInfo';

export default {
    name: 'CandidateDetails',

    components: {
        CandidateInfo
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

.candidate-details {
    .candidate {
        img {
            height: 96px;
            border-radius: 8px;
        }
    }
}

</style>
