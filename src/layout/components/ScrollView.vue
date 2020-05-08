<template>

<div class="scroll-view">
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <slot></slot>             
    </el-scrollbar>
</div>

</template>

<script>

export default {
    name: 'ScrollView'
};
</script>

<style lang="scss">

.scroll-view {
    height: 100%;
    
    .el-scrollbar {
        height: 100%;
    }

    .scrollbar-wrapper {
        overflow-x: hidden !important;
    }

    .el-scrollbar__view {
        padding: 1rem;
    }
}

</style>
