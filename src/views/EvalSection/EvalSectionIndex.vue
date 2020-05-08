<template>

<split-view v-if="evaluation" class="eval-section-index">
    <template v-slot:main>
        <el-card shadow="never">
            <el-tabs v-model="tab">
                <el-tab-pane v-if="hasEvalData" label="Evaluación" name="eval">
                    <item-editor 
                        :item-id="evalSection.evalData" 
                        form-width="450px"
                    ></item-editor>
                </el-tab-pane>
                <el-tab-pane label="Alertas de Riesgo" name="alerts">
                    <alerts-timeline 
                        :evaluation-id="evaluationId"
                        :section="section"
                    ></alerts-timeline>
                </el-tab-pane>
                <el-tab-pane label="Resultado" name="results">
                    <eval-result 
                        :evaluation-id="evaluationId"
                        :section="section"
                    ></eval-result>                    
                </el-tab-pane>
            </el-tabs> 
        </el-card>               
    </template>

    <template v-slot:side-actions>
        <div class="text-lg text-w6">Evaluación</div>
    </template>

    <template v-slot:side-content>
        <candidate-info 
            v-if="application"  
            :candidate-id="application.candidate"
            class="mb-4"
        ></candidate-info>
        <div class="flex-row">
            <el-button 
                class="block mr-2" 
                type="primary"
                size="small"
                icon="el-icon-right"
                @click="onRegisterAttend"
            >
                Registrar asistencia
            </el-button>
            <el-button 
                class="block"
                size="small"
                icon="el-icon-back"
                @click="onRegisterFinish"
            >
                Registrar salida
            </el-button>
        </div>

        <router-link :to="printRoute">
            <el-button 
                type="primary" 
                class="block mt-4"
                size="small"
                icon="el-icon-document"
            >
                Imprimir reporte
            </el-button>
        </router-link>      
    </template>

    <el-dialog
        title="Confirmar "
        :visible.sync="showConfirmDialog"
        width="400px"
        center
    >
        <p v-if="confirm === 'attend'">
            Por favor haga click en el botón "Aceptar" para confirmar la 
            asistencia del candidato a la evaluación.
        </p>
        <p v-else-if="confirm === 'finish'">
            Por favor haga click en el botón "Aceptar" para confirmar la 
            salida del candidato a la evaluación.
        </p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showConfirmDialog = false">
                Cancelar
            </el-button>
            <el-button 
                type="primary" 
                :disabled="loading"
                @click="onConfirm"
            >
                Confirmar
            </el-button>
        </span>
    </el-dialog>
</split-view>

</template>

<script>

import CandidateInfo from '@/components/CandidateInfo';
import AlertsTimeline from '@/components/AlertsTimeline';
import EvalResult from '@/components/EvalResult';
import SplitView from '@/layout/components/SplitView';
import params from '../params';

export default {
    name: 'EvalSectionIndex',

    components: {
        SplitView,
        CandidateInfo,
        AlertsTimeline,
        EvalResult
    },

    props: {
        evaluationId: {
            type: [Number, String],
            required: true
        },
        section: {
            type: String,
            required: true,
            validator: val => val in params
        }
    },

    data() {
        return {
            tab: 'eval',
            showConfirmDialog: false,
            confirm: '',
            loading: false
        };
    },

    computed: {
        evaluation() {            
            this.$store.dispatch('evaluations/getItem', this.evaluationId);
            return this.$store.state.evaluations.items[this.evaluationId];
        },
        evalSection() {
            const evalSectionId = this.evaluation[this.section];
            const store = params[this.section].store;
            this.$store.dispatch(`${store}/getItem`, evalSectionId);
            return this.$store.state[store].items[evalSectionId];
        }, 
        application() {
            const applicationId = this.evaluation.application;
            this.$store.dispatch('applications/getItem', applicationId);
            return this.$store.state.applications.items[applicationId];
        },
        hasEvalData() {
            return this.evalSection && (
                this.evalSection.evalData || 
                this.evalSection.evalData === 0
            );
        },
        printRoute() {
            return { 
                name: 'ReportsIndex', 
                params: { 
                    evaluationId: this.evaluationId,
                    section: this.section
                }
            };
        }
    },

    methods: {
        onRegisterAttend() {
            this.confirm = 'attend';
            this.showConfirmDialog = true;
        },
        onRegisterFinish() {
            this.confirm = 'finish';
            this.showConfirmDialog = true;
        },
        onConfirm() {
            this.confirm = '';
            this.showConfirmDialog = false;
        }
    }
};
</script>

<style lang="scss">

.eval-section-index {
    .main-form {
        max-width: 450px;
    }
}

</style>
