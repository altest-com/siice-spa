<template>

<scroll-view class="dashboard-index">
    <el-row :gutter="24" class="px-2 py-3">
        <el-col :span="14">
            <div class="flex-row ac jb h-expand mb-4">
                <h2 class="text-lg text-w6">
                    Estadísticas
                </h2>
                <period-choices v-model="period" />
            </div>

            <el-row :gutter="8">
                <el-col :span="8">
                    <info-count icon="candidate" label="Candidatos" />
                </el-col>
                <el-col :span="8">
                    <info-count icon="application" label="Solicitudes" />
                </el-col>
                <el-col :span="8">
                    <info-count icon="evaluation" label="Evaluaciones" />
                </el-col>
            </el-row>

            <data-bar-chart
                title="Gráfico de evaluaciones"
                xlabel="Fecha de evaluación"
                ylabel="Número de evaluaciones"
                :data="evaluationsChart"
                class="mt-5" 
            />

            <data-bar-chart
                title="Gráfico de solicitudes"
                xlabel="Fecha de solicitud"
                ylabel="Número de solicitudes"
                :data="applicationsChart"
                class="mt-4" 
            />

            <el-row :gutter="8" class="mt-4">
                <el-col :span="8">
                    <info-count icon="corporation" label="Corporaciones" />
                </el-col>
                <el-col :span="8">
                    <info-count icon="dependency" label="Dependencias" />
                </el-col>
                <el-col :span="8">
                    <info-count icon="secondment" label="Adscripciones" />
                </el-col>
            </el-row>

        </el-col>

        <el-col :span="10">
            <el-row :gutter="8" class="mb-2">
                <el-col :span="12">
                    <data-pie-chart
                        title="Evaluaciones"
                        :total="4568"
                        :chart="evaluationsPie"
                    />
                </el-col>
                <el-col :span="12">
                    <data-pie-chart
                        title="Solicitudes"
                        :total="5147"
                        :chart="applicationsPie"
                    />
                </el-col>
            </el-row>

            <evaluators-list class="mt-5" />            
        </el-col>
    </el-row>
</scroll-view>

</template>

<script>

import ScrollView from '@/layout/components/ScrollView';
import InfoCount from './InfoCount';
import DataBarChart from './DataBarChart';
import EvaluatorsList from './EvaluatorsList';
import DataPieChart from './DataPieChart';
import PeriodChoices from './PeriodChoices';

import filters from '@/filters';

export default {
    name: 'DashboardIndex',

    components: {
        ScrollView,
        InfoCount,
        DataBarChart,
        EvaluatorsList,
        DataPieChart,
        PeriodChoices
    },

    data() {
        return {
            period: '1m'
        };
    },

    computed: {
        evaluationsChart() {
            /* Fake data */
            const now = new Date();
            const nDays = 30;
            const labels = [];

            for (let i = 0; i < nDays; i++) {
                const date = new Date();
                date.setDate(now.getDate() - 1);
                labels.push(filters.dateFilter(date));
            }

            return {
                label: labels,
                series: [{
                    name: 'Ordinarias',
                    color: '#304aff',
                    value: labels.map(
                        label => (20 * Math.random()).toFixed(0)
                    )
                }, {
                    name: 'Extraordinarias',
                    color: '#bbc4eb',
                    radius: [4, 4, 0, 0],
                    value: labels.map(
                        label => (20 * Math.random()).toFixed(0)
                    )
                }]
            };
        },

        applicationsChart() {
            /* Fake data */
            const now = new Date();
            const nDays = 30;
            const labels = [];

            for (let i = 0; i < nDays; i++) {
                const date = new Date();
                date.setDate(now.getDate() - 1);
                labels.push(filters.dateFilter(date));
            }

            return {
                label: labels,
                series: [{
                    name: 'Pendientes',
                    color: '#304aff',
                    value: labels.map(
                        label => (20 * Math.random()).toFixed(0)
                    )
                }, {
                    name: 'Aceptadas',
                    color: '#6fd1f6',
                    value: labels.map(
                        label => (20 * Math.random()).toFixed(0)
                    )
                }, {
                    name: 'Rechazadas',
                    color: '#bbc4eb',
                    radius: [4, 4, 0, 0],
                    value: labels.map(
                        label => (20 * Math.random()).toFixed(0)
                    )
                }]
            };
        },

        evaluationsPie() {
            return [{
                name: 'Aprobados: 856', 
                value: 856,
                itemStyle: {
                    color: '#84aaff'
                }
            }, {
                name: 'No aprobados: 125', 
                value: 125,
                itemStyle: {
                    color: '#f99300'
                }
            }, {
                name: 'Pendientes: 254', 
                value: 254,
                itemStyle: {
                    color: '#bbc4eb'
                }
            }];
        },

        applicationsPie() {
            return [{
                name: 'Aprobadas: 914', 
                value: 914,
                itemStyle: {
                    color: '#304aff'
                }
            }, {
                name: 'Rechazadas: 65', 
                value: 65,
                itemStyle: {
                    color: '#6fd1f6'
                }
            }, {
                name: 'Pendientes: 489', 
                value: 489,
                itemStyle: {
                    color: '#bbc4eb'
                }
            }];
        }
    },

    created() {
    },

    methods: {
    }
};
</script>

<style lang="scss">

$color-primary: #304aff;
$color-secondary: #f99300;
$color-light-1: #84aaff;
$color-light-2: #bbc4eb;
$color-light-3: #6fd1f6;
$color-light-4: #ecf5ff;

</style>
