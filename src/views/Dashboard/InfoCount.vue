<template>

<el-card class="info-count">
    <div class="flex-row as js">
        <svg-icon :icon-class="icon" class="shrink-0"/>
        <div class="ml-3">
            <div class="label mb-1"> {{ label }} </div>
            <div class="count"> {{ count }} </div>
        </div>
    </div>
</el-card>

</template>

<script>

export default {
    name: 'InfoCount',
    
    props: {
        icon: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
        };
    },

    computed: {
        count() {
            return (2000 * Math.random()).toFixed(0);
        }
    },

    methods: {
    }
};
</script>

<style lang="scss">

.info-count {
    .svg-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        fill: #304aff;
        background-color: #ecf5ff;
    }
    .label {
        font-size: 14px;
    }
    .count {
        font-weight: 600;
        font-size: 20px;
    }
}

</style>

