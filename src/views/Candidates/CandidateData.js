const defaultImage = require('@/assets/images/user.png');

export default {
    props: {
        candidateId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {

        data() {
            return {
                name: {
                    type: 'text',
                    value: this.candidate.name
                },
                lastName: {
                    type: 'text',
                    value: this.candidate.lastName
                },
                curp: {
                    type: 'text',
                    value: this.candidate.curp
                },
                createdAt: {
                    type: 'date',
                    value: this.candidate.createdAt
                }
            };
        },

        isReady() {
            return !!this.candidate;
        },

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
