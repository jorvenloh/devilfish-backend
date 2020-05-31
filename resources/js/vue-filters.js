Vue.filter('numberFormat', function(value){
    if(!value)
        return '0';

    return Number(value).toLocaleString('en-US')
});

Vue.filter('toCurrency', function (value, showSymbol, code) {
	if (!value && value != 0) {
    	return 0;
    }

    if(showSymbol == false){
    	var formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2
        });
    }
    else{
    	var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MYR',
            minimumFractionDigits: 2
        });
    }

    return formatter.format(value);
});

Vue.filter('toStandardDateTime', function(value, showTime){

	var date = moment(value);
	if(!value || !moment(date, 'YYYY-MM-DD', true).isValid())
        return '--Not Stated--';
	else{
		return moment(value).format(showTime ? 'DD-MMM-YYYY, h:mm:ss a' : 'DD-MMM-YYYY');
	}

});
