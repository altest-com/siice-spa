<template>
    <div :style="{ height: height, width: width }">
    </div>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';

export default {
    mixins: [resize],
    props: {
        width: {
            type: String,
            default: '250px'
        },
        height: {
            type: String,
            default: '300px'
        },
        chartData: {
            type: Array,
            required: true
        },
        legendOptions: {
            type: Object,
            default: () => {}
        },
        seriesOptions: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
        };
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                this.updateCharData();
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }        
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons');

            this.chart.setOption({
                legend: {
                    orient: 'vertical',
                    bottom: 0,
                    left: 0,
                    itemWidth: 12,
                    itemHeight: 12,
                    ...this.legendOptions
                },
                series: [{
                    type: 'pie',
                    animationEasing: 'cubicInOut',
                    animationDuration: 2600,
                    hoverAnimation: false,
                    label: {
                        show: false
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.chartData,
                    ...this.seriesOptions
                }]
            });
        },
        updateCharData() {
            if (this.chart) {
                this.chart.setOption({
                    series: [{
                        data: this.chartData
                    }]
                });
            }            
        }
    }
};
</script>
