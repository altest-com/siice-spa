<template>

<div v-if="candidate" class="candidate-info">
    <img :src="image" alt="">
    <div class="name mt-3">
        {{ fullName }}
    </div>
    <div class="info mt-1">
        <span class="curp"> CURP {{ candidate.curp }} </span>
        <router-link :to="evaluationsRoute">
            <el-button
                type="warning"
                size="mini" 
                icon="el-icon-view"
            >
                Historial
            </el-button>
        </router-link>
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
        },
        evaluationsRoute() {
            return {
                name: 'EvaluationsIndex',
                params: { section: 'none' },
                query: {
                    candidates: [this.candidateId]
                }
            };
        }
    }
};
</script>

<style lang="scss">

.candidate-info {    
    .name, .info {
        text-align: center;
    }
    .name {
        font-weight: 700;
    }
    .info {
        .curp {
            background-color: #eaedff;
            padding: 6px 12px;
            border-radius: 5px;
            color: #304aff;
            font-size: 12px;
            margin-right: 8px;
        }
        .el-button {
            padding: 6px 12px;
        }
        a {
            display: inline;
        }
    }
    img {
        width: 144px;
        height: 144px;
        border-radius: 50%;
        object-fit: cover;
        display: block;
        margin: auto;
    }
}

</style>
