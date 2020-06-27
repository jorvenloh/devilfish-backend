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

        navigate(url, method = "_self", domain = 'local') {
            if (domain == 'local')
                window.open(process.env.MIX_APP_URL + url, method)
            else
                window.open(process.env.MIX_FRONTEND_BASE_URL + url, method)
        },

        async makeApiRequest(url, method = 'get', params = {}, headers = {}) {
            const config = {
                method: method,
                url: url,
                headers: headers,
                params: params,
                paramsSerializer: params => {
                    return qs.stringify(params)
                }
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
