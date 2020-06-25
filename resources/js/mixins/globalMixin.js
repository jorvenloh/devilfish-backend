export default {
    data() {
        return {
            global_loading: false,
        }
    },
    mounted() {
        $('[data-toggle="tooltip"]').tooltip();
    },

    methods: {
        notEmptyObject(object) {
            return Object.keys(object).length
        },

        async makeApiRequest(url, method = 'get', params = {}, headers = {}) {
            const config = {
                method: method,
                url: url,
                headers: headers,
                params: params
            }

            this.global_loading = true;
            return new Promise((resolve, reject) => {
                axios(config)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        this.alertError();
                        reject(error.response);
                    })
                    .finally(() => {
                        this.global_loading = false;
                    });
            });
        }
    }

};
