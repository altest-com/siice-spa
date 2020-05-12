<template>

<el-dialog
    class="delete-dialog"
    title="Advertencia"
    :visible="visible"
    width="400px"
    @update:visible="val => $emit('update:visible', val)"
>
    <p>
        ¿Seguro deseas eliminar esta solicitud de forma permanente? 
        Se eliminará cualquier dato asociado.
    </p>
    <span slot="footer" class="dialog-footer">
        <el-button
            size="small"
            icon="el-icon-close"
            class="mr-2"
            @click="$emit('update:visible', false)"
        >
            Cancelar
        </el-button>
        <el-button 
            type="primary"
            :disabled="disabled"
            size="small"
            icon="el-icon-check"
            @click="$emit('confirm')"
        >
            Confirmar
        </el-button>
    </span>
</el-dialog>

</template>

<script>

export default {
    name: 'DeleteDialog',

    props: {
        visible: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Advertencia'
        },
        message: {
            type: String,
            default: 'Por favor confirme que desea eliminar este elemento.'
        }
    }
};
</script>

<style lang="scss">

.delete-dialog {
    .el-dialog__title {
        font-weight: 700;
    }
}

</style>
