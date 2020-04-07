$(document).ready(function() {


    $.ajax({
        url: 'http://157.230.17.132:4026/sales',
        method: 'GET',
        success: function(data){
            var monthToName = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
            // monthToName[ind-1]
            var mainObj = {};
            for (var i = 0; i < data.length; i++) {
                var oggettoSingolo = data[i];           //associo a variabile ogni singolo oggetto contenuto in data
                var amount = oggettoSingolo.amount;    //Prendo amount di ogni oggetto nell'API
                var date = oggettoSingolo.date;          //prendo la data di ogni oggetto nell'API
                date = moment(date, "DD-MM-YYYY");      //cambio il formato della data
                var year = date.year();                 //prendo l'anno di ogni oggetto nell'API
                var month = date.month() + 1;           //prendo il mese di ogni oggetto nell'API
                if (mainObj[month] === undefined) {     //inizializzo il mio mainObj creando le chiavi 'month':0;
                    mainObj[month] = 0;
                }
                mainObj[month] += amount;
            }
                var mesi = [];
                var valori = [];

                for (var key in mainObj) {
                    // console.log(key);
                    mesi.push(key);
                    valori.push(mainObj[key]);
                }


            var ctx = document.getElementById('grafico');
            var chart = new Chart(ctx, {

                type: 'line',
                data: {
                    labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
                    datasets: [{
                        data: valori,

                    }],
                }
            });

        },
        error: function (err) {
            alert('BOOM');
        }
    });

});
