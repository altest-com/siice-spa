<template>

<split-view v-if="evaluation" class="polygraphics-index">
    <template v-slot:main>
        <el-card shadow="never">
            <el-tabs v-model="section">
                <el-tab-pane label="Alertas de Riesgo" name="alerts">
                    <alerts-timeline 
                        :evaluation-id="evaluationId"
                        section="polygraphic"
                    ></alerts-timeline>
                </el-tab-pane>
                <el-tab-pane label="Resultado" name="results">
                    <eval-result 
                        :evaluation-id="evaluationId"
                        section="polygraphic"
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

export default {
    name: 'PolygraphicsIndex',

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
        }
    },

    data() {
        return {
            section: 'digiscan',
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
        polygraphic() {
            const polygraphicId = this.evaluation.polygraphic;
            this.$store.dispatch('polygraphics/getItem', polygraphicId);
            return this.$store.state.polygraphics.items[polygraphicId];
        }, 
        application() {
            const applicationId = this.evaluation.application;
            this.$store.dispatch('applications/getItem', applicationId);
            return this.$store.state.applications.items[applicationId];
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

.polygraphics-index {
    .main-form {
        max-width: 450px;
    }
}

</style>
