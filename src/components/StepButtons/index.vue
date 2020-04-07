<template>
    <div class="step-buttons">
        <el-button
            :disabled="disablePrev || value <= 0"
            @click="prevStep"
        >
            <i class="el-icon-arrow-left"></i> Anterior                
        </el-button>

        <el-button
            :disabled="disableNext || value >= (nsteps - 1)"
            type="primary"
            @click="nextStep"
        >
            Siguiente <i class="el-icon-arrow-right"></i>
        </el-button>         
    </div>
</template>

<script>

export default {
    name: "StepButtons",
    
    props: {
        nsteps: {
            type: Number,
            required: true
        },
        value: {
            type: Number,
            default: 0
        },
        disablePrev: {
            type: Boolean,
            required: false,
            default: false
        },
        disableNext: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            step: this.value
        }
    },

    methods: {

        nextStep() {
            if (this.step < (this.nsteps - 1)) {
                this.step += 1 
                this.$emit('input', this.step);
            }                                
        },

        prevStep() {
            if (this.value > 0) {
                this.step -= 1 
                this.$emit('input', this.step);
            } 
        },
    }
};
</script>

<style lang="scss">
    .step-buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
</style>
