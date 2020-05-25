<template>

<div class="candidates-filter">
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

        <el-form-item label="Nombre" prop="name">
            <el-input
                clearable
                :value="filter.name"                    
                @input="val => onParamChange({name: val})"                    
            />
        </el-form-item>

        <el-form-item label="Apellidos" prop="lastName">
            <el-input
                clearable
                :value="filter.lastName"                    
                @input="val => onParamChange({lastName: val})"                    
            />
        </el-form-item>

        <el-form-item label="CURP" prop="curp">
            <el-input
                clearable
                :value="filter.curp"                    
                @input="val => onParamChange({curp: val})"                    
            />
        </el-form-item>

        <el-form-item label="Fecha de creación" class="range">
            <el-date-picker
                type="date"
                clearable
                placeholder="Desde"
                :value="filter.minCreatedAt"
                @input="val => onParamChange({minCreatedAt: val})"  
            ></el-date-picker>
            <span class="px-2">—</span>
            <el-date-picker
                type="date"
                clearable
                placeholder="Hasta"
                :value="filter.maxCreatedAt"
                @input="val => onParamChange({maxCreatedAt: val})"  
            ></el-date-picker>
        </el-form-item>
    </el-form>
</div>

</template>

<script>

import { candidateFilter as filter } from '@/store/modules/candidates/models';

const orderChoices = Object.keys(
    filter.ORDER_CHOICES
).map(value => ({
    value: value,
    label: filter.ORDER_CHOICES[value]
}));

export default {
    name: 'CandidatesFilter',

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
            return this.$store.state.candidates.filter;
        }
    },

    methods: {

        update() {
            this.$store.dispatch('candidates/fetchItems', this.params);
            this.$emit('change');
        },

        onParamChange(data) {
            this.$store.dispatch('candidates/setFilter', data);
            this.update();
        }
    }
};
</script>

<style lang="scss">
</style>
