<template>
    <div :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';
import { changeBright } from '@/lib/colors';

const defaultColor = '#555555';
const defaultName = 'Datos';

export default {
    name: 'BarChart',

    mixins: [resize],

    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '250px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            required: true
        },
        xlabel: {
            type: String,
            default: ''
        },
        ylabel: {
            type: String,
            default: ''
        },
        gradient: {
            type: Boolean,
            default: true
        },
        gridOptions: {
            type: Object,
            default: () => {} 
        },
        legendOptions: {
            type: Object,
            default: () => {}
        },
        xAxisOptions: {
            type: Object,
            default: () => {}
        },
        yAxisOptions: {
            type: Object,
            default: () => {}
        },
        barOptions: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            chart: null
        };
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                this.updateCharData();
            }
        },
        max() {
            this.updateCharData();
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
            this.setOptions();
        },
        setOptions() {
            const series = [];
            this.chartData.series.forEach((data, index) => {
                const color = data.color || defaultColor;

                let normal = color;
                let emphasis = changeBright(color, 25); 

                if (this.gradient) {
                    normal = new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            {offset: 0, color: changeBright(color, 40)},
                            {offset: 0.5, color: changeBright(color, 20)},
                            {offset: 1, color: color}
                        ]
                    );

                    emphasis = new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            {offset: 0, color: changeBright(color, -40)},
                            {offset: 0.7, color: color},
                            {offset: 1, color: color}
                        ]
                    );
                }

                series.push({
                    itemStyle: {                        
                        normal: { color: normal, barBorderRadius: data.radius },
                        emphasis: { color: emphasis }                        
                    },
                    type: 'bar',
                    stack: false,
                    barWidth: '12px',
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    name: data.name || (defaultName + index),
                    data: data.value,
                    ...this.barOptions
                });
            });

            this.chart.setOption({
                xAxis: {
                    name: this.xlabel,
                    nameLocation: 'center',
                    nameTextStyle: {
                        color: '#777',
                        fontWeight: 600
                    },
                    nameGap: 36,
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10,
                    data: this.chartData.label,
                    ...this.xAxisOptions
                },
                yAxis: {
                    name: this.ylabel,
                    nameLocation: 'center',
                    nameTextStyle: {
                        color: '#777',
                        fontWeight: 600
                    },
                    nameGap: 36,
                    splitLine: {
                        show: true
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    min: 0,
                    ...this.yAxisOptions
                },
                legend: {
                    show: true,
                    left: 'right',
                    itemWidth: 12,
                    itemHeight: 12,
                    ...this.legendOptions
                },
                grid: {
                    show: false,
                    left: 50,
                    right: 10,
                    containLabel: false,
                    ...this.gridOptions
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'none',
                        snap: false
                    },
                    padding: [5, 10]
                },
                series: series
            });
        },

        updateCharData() {
            if (this.chart) {
                const series = [];
                this.chartData.series.forEach((data, index) => {
                    series.push({
                        name: data.name || (defaultName + index),
                        data: data.value
                    });
                });

                this.chart.setOption({
                    xAxis: {
                        data: this.chartData.label
                    },
                    yAxis: {
                        min: 0
                    },
                    series: series
                });
            }            
        }
    }
};
</script>
