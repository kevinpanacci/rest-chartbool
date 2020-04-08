$(document).ready(function() {


    $('#aggiungi-oggetto').click(function(){
        apiPost();
        apiGet();
    });


});

function apiPost() {
    var nomeVenditore = $('#nome-dipendente').val();
    var amount = $('#amount').val();
    var amountDaAggiungere = parseInt(amount);
    console.log(amount);
    var date = $('#date').val();
    date = moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");

    // $.ajax({                 //CANCELLARE OGGETTO IN API
    // url: 'http://157.230.17.132:4026/sales/36',
    // method: 'DELETE',
    // success: function(result) {
    //     // Do something with the result
    // }
    // });


    $.ajax({
        url: 'http://157.230.17.132:4026/sales',
        type: 'POST',
        data: {
            salesman: nomeVenditore,
            amount: parseInt(amountDaAggiungere),
            date: date
        },
        success: function(result) {
        }
    });
}



function apiGet(){
    $.ajax({
        url: 'http://157.230.17.132:4026/sales',
        method: 'GET',
        success: function(data){
            var costruttore = costruttoreDati(data);
            creaGraficoLinea(costruttore);
        },
        error: function (err) {
            alert('BOOM');
        }
    });
}


function costruttoreDati(data) {
    var mainObj = {};
    for (var i = 0; i < data.length; i++) {
        var oggettoSingolo = data[i];           //associo a variabile ogni singolo oggetto contenuto in data
        var amount = oggettoSingolo.amount;    //Prendo amount di ogni oggetto nell'API
        var date = oggettoSingolo.date;          //prendo la data di ogni oggetto nell'API
        date = moment(date, "DD-MM-YYYY");      //cambio il formato della data
        // var year = date.year();                 //prendo l'anno di ogni oggetto nell'API
        var month = date.month() + 1;           //prendo il mese di ogni oggetto nell'API
        if (mainObj[month] === undefined) {     //inizializzo il mio mainObj creando le chiavi 'month':0;
            mainObj[month] = 0;
        }
        mainObj[month] += parseInt(amount);
    }
    var mesi = [];
    var valori = [];

    for (var key in mainObj) {
        // console.log(key);
        mesi.push(key);
        valori.push(mainObj[key]);
    }
    return valori;
}

function creaGraficoLinea(valori) {
    var ctx = document.getElementById('grafico');
    var chart = new Chart(ctx, {

        type: 'line',
        data: {
            labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
            datasets: [{
                label: 'Fatturato 2017',
                data: valori,

            }],
        }
    });
}
