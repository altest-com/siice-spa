<template>

<div class="period-choices">
    <el-radio-group 
        :value="value" 
        @input="val => $emit('input', val)"
    >
        <el-radio 
            v-for="period in periodChoices"
            :key="period.value" 
            :label="period.value"
        >
            {{ period.label }}
        </el-radio>
    </el-radio-group>
</div>

</template>

<script>

const periodChoices = [{
    label: '2s',
    value: '2s'
}, {
    label: '1m',
    value: '1m'
}, {
    label: '3m',
    value: '3m'
}, {
    label: '6m',
    value: '6m'
}, {
    label: '1a',
    value: '1a'
}];

export default {
    name: 'PeriodChoices',

    props: {
        value: {
            type: String,
            default: '1m'
        }
    },

    data() {
        return {
            periodChoices: periodChoices
        };
    }
};
</script>

<style lang="scss">

.period-choices {
    .el-radio {
        margin-right: 1.5rem;
    }
    .el-radio__input {
        display: none;
    }
    .el-radio__label {
        padding: 0;
        font-size: 14px;
        font-weight: 700;
        color: #c3c3c3ff;
    }
    .el-radio__input.is-checked+.el-radio__label {
        color: #304aff;
    }
}

</style>

