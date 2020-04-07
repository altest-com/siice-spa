<template>

<tr v-if="candidate" :class="{'focus': focus}" @click="$emit('click')">
    <td v-for="header in headers" :key="header">
        <div class="cell">
            {{ rowData[header] }}
        </div>
    </td>
</tr>

</template>

<script>

import filters from '@/filters';

const defaultImage = require('@/assets/images/user.png');

export default {
    name: 'CandidateRow',

    props: {
        candidateId: {
            type: [Number, String],
            required: true
        },
        focus: {
            type: Boolean,
            default: false
        },
        headers: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
        };
    },

    computed: {

        rowData() {
            const candidate = this.candidate;
            return {
                name: candidate.name,
                lastName: candidate.lastName,
                curp: candidate.curp,
                createdAt: filters.dateFilter(candidate.createdAt)
            };
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
        }
    },

    methods: {
    }   
};
</script>}

<style lang="scss">
</style>
