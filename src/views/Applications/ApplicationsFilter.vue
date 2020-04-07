<template>

<div class="applications-filter">
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
import { applicationFilter } from '@/store/modules/applications/models';

export default {
    name: 'ApplicationsFilter',

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
            orderChoices: applicationFilter.order
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
