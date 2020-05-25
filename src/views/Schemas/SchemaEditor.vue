<template>

<schema-editor :schema-id="schemaId"></schema-editor>

</template>

<script>

export default {
    props: {
        schemaId: {
            type: [Number, String],
            required: true
        }
    }
};

</script>
