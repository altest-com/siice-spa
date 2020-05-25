<template>

<div class="evaluators-list">
    <h2 class="text-md text-w6 mb-3">
        Evaluadores
    </h2>
    <el-card
        v-for="person in persons" 
        :key="person.id"
        class="mb-2"
    >
        <el-row :gutter="8" align="middle" type="flex">
            <el-col :span="3">
                <img class="avatar" :src="person.image" alt="">
            </el-col>
            <el-col :span="10">
                <div class="label"> Nombre </div>
                <div class="value"> {{ person.name }} </div>
            </el-col>
            <el-col :span="6">
                <div class="label"> Departamento </div>
                <div class="value"> {{ person.department }} </div>
            </el-col>
            <el-col :span="5">
                <div class="label"> Evaluaciones </div>
                <div class="value"> {{ person.evalCount }} </div>
            </el-col>
        </el-row>
    </el-card>
</div>

</template>

<script>

export default {
    name: 'EvaluatorsList',

    components: {  
    },

    props: {
    },

    data() {
        return {
        };
    },

    computed: {
        persons() {
            return [{
                id: 0,
                name: 'Diana García Rivas',
                image: 'https://image.flaticon.com/icons/svg/145/145862.svg',
                department: 'Médico',
                evalCount: 45
            }, {
                id: 1,
                name: 'Alberto López Romero',
                image: 'https://image.flaticon.com/icons/svg/145/145859.svg',
                department: 'Socioeconómico',
                evalCount: 13
            }, {
                id: 2,
                name: 'José Fuentes Ríos',
                image: 'https://image.flaticon.com/icons/svg/145/145867.svg',
                department: 'Médico',
                evalCount: 32
            }, {
                id: 3,
                name: 'Flor Díaz Campos',
                image: 'https://image.flaticon.com/icons/svg/145/145864.svg',
                department: 'Toxicológico',
                evalCount: 24
            }, {
                id: 4,
                name: 'Fernando del Bosque Hernández',
                image: 'https://image.flaticon.com/icons/svg/167/167750.svg',
                department: 'Poligráfico',
                evalCount: 18
            }, {
                id: 5,
                name: 'Alejandra Carbajal Liendre',
                image: 'https://image.flaticon.com/icons/svg/145/145852.svg',
                department: 'Médico',
                evalCount: 51
            }];
        },
        headers() {
            return ['', 'Nombre', 'Departamento', 'Evaluaciones'];
        }
    },

    created() {
    },

    methods: {
    }
};
</script>

<style lang="scss">

.evaluators-list {

    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #ecf5ff;
        padding: 4px;
    }

    .el-card__body {
        padding: 12px;
    }

    .label {
        font-size: 12px;
        font-weight: 300;
        color: #606266;
    }

    .value {
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
    }
}

</style>

