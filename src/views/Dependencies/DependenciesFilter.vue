<template>

<div class="dependencies-filter">
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
            <query-select
                :multiple="true"
                store="corporations"
                :value="filter.corporations"
                @change="val => onParamChange({corporations: val})"
            ></query-select>
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
import QuerySelect from '@/components/QuerySelect';
import { dependencyFilter } from '@/store/modules/dependencies/models';

const orderChoices = Object.keys(
    dependencyFilter.ORDER_CHOICES
).map(value => ({
    value: value,
    label: dependencyFilter.ORDER_CHOICES[value]
}));

export default {
    name: 'DependenciesFilter',

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
            orderChoices: orderChoices
        };
    },

    computed: {
        filter() {
            return this.$store.state.dependencies.filter;
        }
    },

    methods: {

        update() {
            this.$store.dispatch('dependencies/fetchItems', this.params);
            this.$emit('change');
        },

        onParamChange(data) {
            this.$store.dispatch('dependencies/setFilter', data);
            this.update();
        }
    }
};
</script>

<style lang="scss">
</style>
