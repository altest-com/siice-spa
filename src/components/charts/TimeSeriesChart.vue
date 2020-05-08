<template>
    <div :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';

const defaultColor = '#555555';
const defaultName = 'Datos';
const defaultSymbol = 'none';
const defaultAreaColor = 'transparent';

export default {
    name: 'TimeSeriesChart',

    mixins: [resize],

    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        symbolSize: {
            type: Number,
            default: 8
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            required: true
        },
        max: {
            type: Number,
            default: null
        },
        yGrid: {
            type: Boolean,
            default: true
        },
        xlabel: {
            type: String,
            default: ''
        },
        ylabel: {
            type: String,
            default: ''
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
        xlabel: function() {
            this.updateXlabel();
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
        buildSeries() {
            const series = [];
            this.chartData.series.forEach((data, index) => {
                series.push({
                    symbol: data.symbol || defaultSymbol,
                    symbolSize: this.symbolSize,
                    itemStyle: {
                        color: data.color || defaultColor,
                        lineStyle: {                                
                            width: 4
                        }
                    },
                    areaStyle: {
                        color: data.areaColor || defaultAreaColor
                    },
                    smooth: true,
                    type: 'line',
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    name: data.name || (defaultName + index),
                    data: data.value
                });
            });
            return series;
        },
        setOptions() {
            this.chart.setOption({
                xAxis: {
                    /* type: 'time', */
                    name: this.xlabel,
                    data: this.chartData.label,
                    nameLocation: 'center',
                    nameTextStyle: {
                        color: '#777'
                    },
                    nameGap: 32,
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
                    z: 10               
                },
                grid: {
                    show: false,
                    left: 44,
                    right: 10,
                    bottom: 48,
                    top: 10,
                    containLabel: false
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    padding: [5, 10]
                },
                yAxis: {
                    type: 'value',
                    name: this.ylabel,
                    nameLocation: 'center',
                    nameTextStyle: {
                        color: '#777'
                    },
                    nameGap: 30,
                    splitLine: {
                        show: this.yGrid
                    },
                    splitArea: {
                        show: this.yGrid
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
                    }/*,
                    min: 0,
                    max: Math.ceil(this.max) */
                },
                series: this.buildSeries()
            });
        },

        updateCharData() {
            if (this.chart) {
                this.chart.setOption({
                    xAxis: {
                        data: this.chartData.label,
                        name: this.xlabel
                    },
                    series: this.buildSeries()
                });                
            }            
        },

        updateXlabel() {
            if (this.chart) {
                this.chart.setOption({
                    xAxis: {
                        name: this.xlabel
                    }
                });                
            }            
        }
    }
};
</script>
