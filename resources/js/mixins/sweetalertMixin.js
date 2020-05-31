export default {

    methods: {

        alert(options) {
            this.$swal.fire(options)
        },

        alertSuccess({
            title = "Success!",
            text = "That's all done!",
            timer = 1000,
            showConfirmationButton = false
        } = {}) {
            this.alert({
                title: title,
                text: text,
                timer: timer,
                showConfirmButton: showConfirmationButton,
                icon: 'success'
            });
        },

        alertError(options = {}, errors = {}) {

            const { message: error_message } = errors;

            options = Object.assign({
                title: "Error!",
                text: error_message ? error_message : "Oops...Something went wrong" ,
                icon: 'error'
            }, options);

            this.alert(options);
        },

        confirm(callback, options) {
            options = Object.assign({
                title: "Are you sure?",
                text: "Are you sure you want to do that?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                confirmButtonText: "Yes",
            }, options);

            this.$swal.fire(options).then((result) => {
                if (result.value) {
                    if(callback)
                        return callback(result.value);
                }
            })
        },

        async confirmWithPassword(callback, options) {
            options = Object.assign({
                title: 'Enter your password',
                input: 'password',
                inputPlaceholder: 'Enter your password',
                showCancelButton: true,
                inputAttributes: {
                    maxlength: 20,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                inputValidator: (value) => {
                    if (!value) {
                        return 'Password cannot be empty'
                    }
                }
            }, options);

            const {
                value: password
            } = await this.$swal.fire(options);

            if (password) {
                return callback(password);
            }
        }

    }

};
