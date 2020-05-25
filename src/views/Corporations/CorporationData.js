export default {
    props: {
        corporationId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {

        data() {
            return {
                name: {
                    type: 'text',
                    value: this.corporation.name
                },
                createdAt: {
                    type: 'date',
                    value: this.corporation.createdAt
                }
            };
        },

        isReady() {
            return !!this.corporation;
        },

        corporation() {
            this.$store.dispatch('corporations/getItem', this.corporationId);
            return this.$store.state.corporations.items[this.corporationId];
        }
    }
};
