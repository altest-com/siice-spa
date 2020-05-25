<template>

<div class="data-bar-chart">
    <h2 class="text-lg text-w6 mb-3">
        {{ title }}
    </h2>
    <el-card>
        <bar-chart                            
            height="300px"
            :xlabel="xlabel"
            :ylabel="ylabel"
            :chart-data="data"
            :gradient="false"
            :bar-options="{
                stack: true,
                barWidth: '8px'
            }"
        />  
    </el-card>
</div>

</template>

<script>

import BarChart from '@/components/charts/BarChart';

export default {
    name: 'DataBarChart',

    components: {
        BarChart    
    },

    props: {
        title: {
            type: String,
            default: ''
        },
        xlabel: {
            type: String,
            default: ''
        },
        ylabel: {
            type: String,
            default: ''
        },
        data: {
            type: Object, 
            required: true
        }
    },

    data() {
        return {
        };
    },

    computed: {
    }
};
</script>

<style lang="scss">
</style>

