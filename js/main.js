$(document).ready(function() {


    $.ajax({
        url: 'http://157.230.17.132:4026/sales',
        method: 'GET',
        success: function(data){
            // console.log(data);
            var mainObj = {};
            var sommaAmount = 0;
            for (var i = 0; i < data.length; i++) {
                var oggettoSingolo = data[i];
                var amount = oggettoSingolo.amount;    //Prendo amount di ogni oggetto nell'API

                var date = oggettoSingolo.date;          //prendo la data di ogni oggetto nell'API
                date = moment(date, "DD-MM-YYYY");      //cambio il formato della data
                var year = date.year();                 //prendo l'anno di ogni oggetto nell'API
                var month = date.month() + 1;           //prendo il mese di ogni oggetto nell'API
            }
        },
        error: function (err) {
            alert('BOOM');
        }
    });

});
