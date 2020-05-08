<template>

<div class="secondments-filter">
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

        <el-form-item label="Corporaciones">
            <ab-query-select
                store="corporations"
                :value="filter.corporations"
                @change="val => onParamChange({corporations: val})"
            ></ab-query-select>
        </el-form-item>

        <el-form-item label="Dependencias">
            <ab-query-select
                store="dependencies"
                :value="filter.dependencies"
                @change="val => onParamChange({dependencies: val})"
            ></ab-query-select>
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

import OrderSelect from '@/components/OrderSelect';
import { secondmentFilter } from '@/store/modules/secondments/models';

const orderChoices = Object.keys(
    secondmentFilter.ORDER_CHOICES
).map(value => ({
    value: value,
    label: secondmentFilter.ORDER_CHOICES[value]
}));

export default {
    name: 'SecondmentsFilter',

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
            orderChoices: orderChoices
        };
    },

    computed: {
        filter() {
            return this.$store.state.secondments.filter;
        }
    },

    methods: {

        update() {
            this.$store.dispatch('secondments/fetchItems', this.params);
            this.$emit('change');
        },

        onParamChange(data) {
            this.$store.dispatch('secondments/setFilter', data);
            this.update();
        }
    }
};
</script>

<style lang="scss">
</style>
