<template>

<el-card class="data-pie-chart">
    <div class="total">
        <div class="value">{{ total }}</div>
        <div class="label"> {{ title }} </div>
    </div> 
    <pie-chart
        height="224px"
        width="142px"
        :series-options="{
            name: 'Evaluaciones',
            radius: [56, 64],
            center: ['50%', 78]
        }"
        :legend-options="{
            bottom: 0,
            left: 12
        }"           
        :chart-data="chart"            
    />
</el-card>

</template>

<script>

import PieChart from '@/components/charts/PieChart';

export default {
    name: 'DataPieChart',

    components: {   
        PieChart
    },

    props: {
        title: {
            type: String,
            default: ''
        },
        total: {
            type: String,
            default: ''
        },
        chart: {
            type: Object, 
            required: true
        }
    },

    data() {
        return {
        };
    },

    computed: {
    },

    created() {
    },

    methods: {
    }
};
</script>

<style lang="scss">

.data-pie-chart {
    .el-card__body {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .total {
            position: absolute;
            left: 0;
            top: -36px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            text-align: center;
            .value {
                font-size: 20px;
                font-weight: 600;
            }
            .label {
                font-size: 12px;
            }
        }
    }

}

</style>

