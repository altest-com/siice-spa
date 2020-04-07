<template>

<div class="candidates-filter">
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

        <el-form-item label="Nombre" prop="name">
            <el-input
                :value="filter.name"                    
                @input="val => onParamChange({name: val})"                    
            ></el-input>
        </el-form-item>

        <el-form-item label="Apellidos" prop="lastName">
            <el-input
                :value="filter.lastName"                    
                @input="val => onParamChange({lastName: val})"                    
            ></el-input>
        </el-form-item>

        <el-form-item label="CURP" prop="curp">
            <el-input
                :value="filter.curp"                    
                @input="val => onParamChange({curp: val})"                    
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
import { candidateFilter } from '@/store/modules/candidates/models';

export default {
    name: 'CandidatesFilter',

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
            orderChoices: candidateFilter.order
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
