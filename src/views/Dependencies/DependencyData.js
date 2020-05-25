export default {
    props: {
        dependencyId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {

        data() {
            return {
                name: {
                    type: 'text',
                    value: this.dependency.name
                },
                corporation: {
                    type: 'text',
                    value: this.corporation.name
                },
                createdAt: {
                    type: 'date',
                    value: this.dependency.createdAt
                }
            };
        },

        isReady() {
            return !!(this.dependency && this.corporation);
        },

        dependency() {
            return this.$store.state.dependencies.items[this.dependencyId];
        },

        corporation() {
            const corporationId = this.dependency.corporation;
            return this.$store.state.corporations.items[corporationId];
        }
    },

    methods: {
    }   
};

