<template>

<div 
    v-if="evaluation" 
    class="evaluation-card" 
    :class="{'focus': focus}" 
    @click="$emit('click')"
>
    <el-card shadow="never">
        <div class="flex-row js as mb-3">
            <img class="image mr-3" :src="image" alt="">                   
            <div class="header">
                <div class="text-w7 flow mb-2">
                    {{ fullName }}
                </div>
                <div class="text-sm text-w3">
                    CURP {{ data.curp.value }}
                </div>                    
            </div>                
        </div>

        <div class="footer pl-2">
            <div class="text-w3 text-sm mb-2">
                Oficio 
                <span class="text-w4">
                    {{ application.document }}
                </span> — 
                {{ application.date | dateFilter }}
            </div>
            <div class="flex-row js ac">
                <el-tag size="mini" class="block mr-2"> 
                    {{ data.status.value }}
                </el-tag>
                <div class="text-w4 text-sm flow pr-3">
                    {{ data.schema.value }}
                </div>
            </div>
            <div class="flex-row js ac mt-2 text-w6 text-sm color-g3">
                <div class="pr-2">
                    {{ data.type.value }}
                </div>
                ·
                <div class="flow pr-3 pl-2">
                    {{ data.position.value }}
                </div>
            </div>
            
        </div>
    </el-card>              
</div>

</template>

<script>

import EvaluationData from './EvaluationData';

export default {
    name: 'EvaluationCard',

    mixins: [EvaluationData],

    props: {
        focus: {
            type: Boolean,
            default: false
        } 
    }
};
</script>

<style lang="scss">

.evaluation-card {

    .el-card__body {
        padding: 16px;
    }

    &:hover {
        cursor: pointer;
    }

    &.focus .el-card {
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    }

    .image {
        height: 56px;
        width: 56px;
        border-radius: 50%;
    }

    .header {
        flex: 1;
        min-width: 0;
    }

    .footer {
        background-color: #f5f7fa;
        padding: 10px 8px;
        border-radius: 6px;
    }
}
</style>
