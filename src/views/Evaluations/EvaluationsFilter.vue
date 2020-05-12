<template>

<div class="evaluations-filter">
    <el-form
        label-position="top"
        :disabled="loading"
        size="small"
    >
        <el-form-item label="Ordenar por">
            <order-select
                :order-choices="orderChoices"
                :value="filter.orderBy"                    
                @change="val => onParamChange({orderBy: val})"
            ></order-select>           
        </el-form-item>

        <el-form-item label="Tipo de evaluación" prop="type">
            <el-select
                clearable
                multiple
                :value="filter.type"
                @change="val => onParamChange({type: val})"
            >
                <el-option
                    v-for="choice in typeChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Fecha de creación" class="range">
            <el-date-picker
                type="date"
                placeholder="Desde"
                :value="filter.minCreatedAt"
                @input="val => onParamChange({minCreatedAt: val})"  
            ></el-date-picker>
            <span class="px-2">—</span>
            <el-date-picker
                type="date"
                placeholder="Hasta"
                :value="filter.maxCreatedAt"
                @input="val => onParamChange({maxCreatedAt: val})"  
            ></el-date-picker>
        </el-form-item>

        <el-form-item label="Candidatos">
            <ab-query-select
                store="candidates"
                query="curp__icontains"
                popper-class="candidate-query"                
                :clearable="true"
                :preload="0"
                :fields="['name', 'last_name', 'curp']"
                :labels="['last_name', 'name']"
                :value="filter.candidates"
                @change="val => onParamChange({candidates: val})"
            >
                <template v-slot="{ choice }">
                    <div class="query-name">
                        {{ `${choice.last_name} ${choice.name}` }}
                    </div>
                    <div class="query-curp">
                        {{ choice.curp }}
                    </div>
                </template>
            </ab-query-select>
        </el-form-item>

        <el-form-item label="Nombre">
            <el-input
                clearable
                :value="filter.candidateName"                    
                @input="val => onParamChange({candidateName: val})"
            ></el-input>
        </el-form-item>

        <el-form-item label="Apellidos">
            <el-input
                clearable
                :value="filter.candidateLastName"                    
                @input="val => onParamChange({candidateLastName: val})"
            ></el-input>
        </el-form-item>

        <el-form-item label="CURP">
            <el-input
                clearable
                :value="filter.candidateCurp"                    
                @input="val => onParamChange({candidateCurp: val})"
            ></el-input>
        </el-form-item>

        <el-form-item label="Documento origen">
            <el-input
                clearable
                :value="filter.candidateDocument"                    
                @input="val => onParamChange({candidateDocument: val})"
            ></el-input>
        </el-form-item>

        <el-form-item label="Corporaciones">
            <ab-query-select
                store="corporations"
                :value="filter.applicationCorporations"
                @change="val => onParamChange({applicationCorporations: val})"
            ></ab-query-select>
        </el-form-item>

        <el-form-item label="Dependencias">
            <ab-query-select
                store="dependencies"
                :value="filter.applicationDependencies"
                @change="val => onParamChange({applicationDependencies: val})"
            ></ab-query-select>
        </el-form-item>

        <el-form-item label="Adscripciones">
            <ab-query-select
                store="secondments"
                :value="filter.applicationSecondments"
                @change="val => onParamChange({applicationSecondments: val})"
            ></ab-query-select>
        </el-form-item>

        <el-form-item label="Puestos">
            <ab-query-select
                store="positions"
                :value="filter.applicationPositions"
                @change="val => onParamChange({applicationPositions: val})"
            ></ab-query-select>
        </el-form-item>
    </el-form>
</div>

</template>

<script>

import OrderSelect from '@/components/OrderSelect';
import { 
    evaluationFilter, 
    evaluationModel 
} from '@/store/modules/evaluations/models';

const orderChoices = Object.keys(
    evaluationFilter.ORDER_CHOICES
).map(value => ({
    value: value,
    label: evaluationFilter.ORDER_CHOICES[value]
}));

const typeChoices = Object.keys(
    evaluationModel.TYPE_CHOICES
).map(value => ({
    value: value,
    label: evaluationModel.TYPE_CHOICES[value]
}));

export default {
    name: 'EvaluationsFilter',

    components: {
        OrderSelect
    },

    props: {
        params: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            loading: false,
            orderChoices: orderChoices,
            typeChoices: typeChoices
        };
    },

    computed: {
        filter() {
            return this.$store.state.evaluations.filter;
        }
    },

    methods: {

        update() {
            this.$store.dispatch('evaluations/fetchItems', this.params);
            this.$emit('change');
        },

        onParamChange(data) {
            this.$store.dispatch('evaluations/setFilter', data);
            this.update();
        }
    }
};
</script>

<style lang="scss">

@import '@/styles/components.scss';

</style>
