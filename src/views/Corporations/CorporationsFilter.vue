<template>

<div class="corporations-filter">
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
import { corporationFilter } from '@/store/modules/corporations/models';

const orderChoices = Object.keys(
    corporationFilter.ORDER_CHOICES
).map(value => ({
    value: value,
    label: corporationFilter.ORDER_CHOICES[value]
}));

export default {
    name: 'CorporationsFilter',

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
            return this.$store.state.corporations.filter;
        }
    },

    methods: {

        update() {
            this.$store.dispatch('corporations/fetchItems', this.params);
            this.$emit('change');
        },

        onParamChange(data) {
            this.$store.dispatch('corporations/setFilter', data);
            this.update();
        }
    }
};
</script>

<style lang="scss">
</style>
