export default {

    mounted() {
        $('[data-toggle="tooltip"]').tooltip();
    },

    methods: {
        notEmptyObject(object) {
            return Object.keys(object).length
        }
    }

};
