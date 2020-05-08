<template>

<div v-if="candidate" class="candidate-details">
     <info-list :items="infoItems"></info-list>
</div>

</template>

<script>

const defaultImage = require('@/assets/images/user.png');
import InfoList from '../components/InfoList';

export default {
    name: 'CandidateDetails',

    components: {
        InfoList
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
        infoItems() {
            const item = this.candidate;
            return [{
                value: this.image,
                type: 'image',
                class: 'candidate-image'
            }, {
                label: 'Nombre completo',
                value: `${item.lastName} ${item.name}`,
                type: 'text'
            }, {
                label: 'CURP',
                value: item.curp,
                type: 'text'
            }, {
                label: 'Fecha de registro',
                value: item.createdAt,
                type: 'date'
            }];
        }
    }, 

    methods: {
    }
};
</script>

<style lang="scss">

.candidate-details {
    .candidate-image {
        margin-bottom: 24px;
    }
}

</style>
