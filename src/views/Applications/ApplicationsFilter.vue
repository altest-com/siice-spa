<template>

<div class="applications-filter">
    <el-form
        label-position="top"
        :disabled="loading"
        size="small"
    >
        <el-form-item label="Ordenar por">
            <ab-order-select
                :order-choices="orderChoices"
                :value="filter.orderBy"                    
                @change="val => onParamChange({orderBy: val})"
            />
        </el-form-item>

        <el-form-item label="Nombre">
            <el-input
                clearable
                :value="filter.name"                    
                @input="val => onParamChange({name: val})"
            />
        </el-form-item>

        <el-form-item label="Apellidos">
            <el-input
                clearable
                :value="filter.lastName"                    
                @input="val => onParamChange({lastName: val})"
            />
        </el-form-item>

        <el-form-item label="CURP">
            <el-input
                clearable
                :value="filter.curp"                    
                @input="val => onParamChange({curp: val})"
            />
        </el-form-item>

        <el-form-item label="Documento origen">
            <el-input
                clearable
                :value="filter.document"                    
                @input="val => onParamChange({document: val})"
            />
        </el-form-item>

        <el-form-item label="Fecha del oficio" class="range">
            <el-date-picker
                type="date"
                clearable
                placeholder="Desde"
                :value="filter.minDate"
                @input="val => onParamChange({minDate: val})"  
            ></el-date-picker>
            <span class="px-2">—</span>
            <el-date-picker
                type="date"
                clearable
                placeholder="Hasta"
                :value="filter.maxDate"
                @input="val => onParamChange({maxDate: val})"  
            ></el-date-picker>
        </el-form-item>

        <el-form-item label="Estado de la solicitud">
            <el-select
                multiple
                clearable
                :value="filter.status"
                @input="val => onParamChange({status: val})"
            >
                <el-option
                    v-for="choice in statusChoices"
                    :key="choice.value"
                    :label="choice.label"
                    :value="choice.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Corporaciones">
            <ab-query-select
                store="corporations"
                :value="filter.corporations"
                @change="val => onParamChange({corporations: val})"
            />
        </el-form-item>

        <el-form-item label="Dependencias">
            <ab-query-select
                store="dependencies"
                :value="filter.dependencies"
                @change="val => onParamChange({dependencies: val})"
            />
        </el-form-item>

        <el-form-item label="Adscripciones">
            <ab-query-select
                store="secondments"
                :value="filter.secondments"
                @change="val => onParamChange({secondments: val})"
            />
        </el-form-item>

        <el-form-item label="Puestos">
            <ab-query-select
                store="positions"
                :value="filter.positions"
                @change="val => onParamChange({positions: val})"
            />
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
    </el-form>
</div>

</template>

<script>

import { 
    applicationFilter, 
    applicationModel 
} from '@/store/modules/applications/models';

const orderChoices = Object.keys(
    applicationFilter.ORDER_CHOICES
).map(value => ({
    value: value,
    label: applicationFilter.ORDER_CHOICES[value]
}));

const statusChoices = Object.keys(
    applicationModel.STATUS_CHOICES
).map(value => ({
    value: value,
    label: applicationModel.STATUS_CHOICES[value]
}));

export default {
    name: 'ApplicationsFilter',

    components: {
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
            statusChoices: statusChoices
        };
    },

    computed: {
        filter() {
            return this.$store.state.applications.filter;
        }
    },

    methods: {

        update() {
            this.$store.dispatch('applications/fetchItems', this.params);
            this.$emit('change');
        },

        onParamChange(data) {
            this.$store.dispatch('applications/setFilter', data);
            this.update();
        }
    }
};
</script>

<style lang="scss">
</style>
