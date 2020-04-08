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

        <el-form-item label="Fecha y hora programada" class="range">
            <el-date-picker
                type="datetime"
                placeholder="Desde"
                :value="filter.minScheduledAt"
                @input="val => onParamChange({minScheduledAt: val})"  
            ></el-date-picker>
            <span class="px-2">—</span>
            <el-date-picker
                type="datetime"
                placeholder="Hasta"
                :value="filter.maxScheduledAt"
                @input="val => onParamChange({maxScheduledAt: val})"  
            ></el-date-picker>
        </el-form-item>

        <el-form-item label="Nombre">
            <el-input
                clearable
                :value="filter.name"                    
                @input="val => onParamChange({name: val})"
            ></el-input>
        </el-form-item>

        <el-form-item label="Apellidos">
            <el-input
                clearable
                :value="filter.lastName"                    
                @input="val => onParamChange({lastName: val})"
            ></el-input>
        </el-form-item>

        <el-form-item label="CURP">
            <el-input
                clearable
                :value="filter.curp"                    
                @input="val => onParamChange({curp: val})"
            ></el-input>
        </el-form-item>

        <el-form-item label="Documento origen">
            <el-input
                clearable
                :value="filter.document"                    
                @input="val => onParamChange({document: val})"
            ></el-input>
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

        <el-form-item label="Corporaciones">
            <query-select
                store="corporations"
                :value="filter.corporations"
                @change="val => onParamChange({corporations: val})"
            ></query-select>
        </el-form-item>

        <el-form-item label="Dependencias">
            <query-select
                store="dependencies"
                :value="filter.dependencies"
                @change="val => onParamChange({dependencies: val})"
            ></query-select>
        </el-form-item>

        <el-form-item label="Adscripciones">
            <query-select
                store="secondments"
                :value="filter.secondments"
                @change="val => onParamChange({secondments: val})"
            ></query-select>
        </el-form-item>

        <el-form-item label="Puestos">
            <query-select
                store="positions"
                :value="filter.positions"
                @change="val => onParamChange({positions: val})"
            ></query-select>
        </el-form-item>
    </el-form>
</div>

</template>

<script>

import OrderSelect from '@/components/OrderSelect';
import QuerySelect from '@/components/QuerySelect';
import { 
    evaluationFilter, 
    evaluationModel 
} from '@/store/modules/evaluations/models';

const typeChoices = Object.keys(
    evaluationModel.TYPE_CHOICES
).map(value => ({
    value: value,
    label: evaluationModel.TYPE_CHOICES[value]
}));

export default {
    name: 'EvaluationsFilter',

    components: {
        OrderSelect,
        QuerySelect
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
            orderChoices: evaluationFilter.order,
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
</style>
