<template>

<div class="positions-filter">
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

import { positionFilter } from '@/store/modules/positions/models';

const orderChoices = Object.keys(
    positionFilter.ORDER_CHOICES
).map(value => ({
    value: value,
    label: positionFilter.ORDER_CHOICES[value]
}));

export default {
    name: 'PositionsFilter',

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
            orderChoices: orderChoices
        };
    },

    computed: {
        filter() {
            return this.$store.state.positions.filter;
        }
    },

    methods: {

        update() {
            this.$store.dispatch('positions/fetchItems', this.params);
            this.$emit('change');
        },

        onParamChange(data) {
            this.$store.dispatch('positions/setFilter', data);
            this.update();
        }
    }
};
</script>

<style lang="scss">
</style>
