
function slettAlleBilletter() {
    $.get("/slettAlleBilletter", function () {
        visAlleBilletter();
    });
}
function visAlleBilletter() {
    $.get("/visAlleBilletter", function (data) {
        formaterBilletter(data)
    });
}

function TomUtAlleBilletter() {
    $("#Velgfilmher").val("Velg film her")
    $("#Antall").val("")
    $("#Fornavn").val("")
    $("#Etternavn").val("")
    $("#Telefonnr").val("")
    $("#Epost").val("")
}
function kjopBillett() {
    let film = $("#film").val();
    let antall = $("#Antall").val();
    let fornavn = $("#Fornavn").val();
    let etternavn = $("#Etternavn").val();
    let telefonnr = $("#Telefonnr").val();
    let epost = $("#Epost").val();
    //const Billett=["Film, Antall, Fornavn,Etternavn, Telefonnr, Epost"];
    //Billett.sort(kjopBillett.etternavn);

    let feilmelding = 0;
    if (film === "Velg film her") {
        $("#feilValg").html("Velg en film")
        feilmelding++;
    } else {
        $("#feilValg").html("");
    }
    if (antall <= 0 || isNaN(Number(antall))) {
        $("#feilAntall").html("Skriv inn antall hvis tomt")
        feilmelding++;
    } else {
        $("#feilAntall").html("");

    }
    if (fornavn === "") {
        $("#feilFornavn").html("Skriv inn et fornavn hvis tomt")
        feilmelding++
    } else {
        $("#feilFornavn").html("");
    }
    if (etternavn === "") {
        $("#feilEtternavn").html("Skriv inn et etternavn hvis tomt")
        feilmelding++
    } else {
        $("#feilEtternavn").html("");
    }
    if (telefonnr === "") {
        $("#feilTelefonnr").html("Skriv inn en telefonnummer hvis tomt")
        feilmelding++
    } else {
        $("#feilTelefonnr").html("");
    }
    if (epost === "") {
        $("#feilEpost").html("Skriv inn epost adresse hvis tomt")
        feilmelding++
    } else {
        $("#feilEpost").html("");
    }

    if (feilmelding === 0) {
        const Billett = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            epost: epost

        }
        console.log(Billett)
        $.post("/kjopBillett", Billett, function () {
            visAlleBilletter();
            /* Billett.sort(etternavn);*/
        })
        console.log(Billett + "tidlig")
        TomUtAlleBilletter()


    }

    function formaterBilletter(Billetter) {
        console.log(Billetter)
        let ut = "<table> <tr> " +
            "<th>Velg film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
        for (let enbillett of Billetter) {
            ut += "<tr>";
            ut += "<td>" + enbillett.film + "</td><td>" + enbillett.fornavn + "</td><td>" + enbillett.etternavn + "</td><td>" + enbillett.telefonnr
                + "</td><td>" + enbillett.epost + "</td>";

            ut += "</tr>";
        }
        $("#billettliste").html(ut);
    }
}


/*    function sorterEtternavn() {
        $.get("/sorterEtternavn", function () {
        visAlleBilletter();
        })*/
