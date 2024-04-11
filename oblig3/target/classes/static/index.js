
$(document).ready(function() {


// Legg til klikkfunksjon for kjøp billett-knappen
        $("#kjopBillettBtn").click(function() {
            kjopBillett();
             //TomUtAlleBilletter();


        });

        // Legg til klikkfunksjon for slett alle billetter-knappen
        $("#slettAlleBiletterBtn").click(function() {
            slettAlleBilletter();
        });
    // Når siden lastes inn på nytt, slett alle billetter fra serveren
    slettAlleBilletter();
});
    var feilmelding = 0;
    function sjekkfornavn(){
        let fornavn = $("#fornavn").val();
        if (fornavn === "" || !isNaN(fornavn)) {
            $("#feilFornavn").html("Skriv inn et fornavn hvis tomt");
            $("#fornavn").val("");
            feilmelding++;
        } else {
            $("#feilFornavn").html("");
        }
    }


    function sjekketternavn(){
        let etternavn = $("#fornavn").val();
        if (etternavn === "" || !isNaN(fornavn)) {
            $("#feilEtternavn").html("Skriv inn et fornavn hvis tomt");
            $("#etternavn").val("");
            feilmelding++;
        } else {
            $("#feilEtternavn").html("");
        }
    }
    function sjekkAntall(){
        let antall = $("#antall").val();
        if (antall <= 0 || isNaN(Number(antall))) {
            $("#feilAntall").html("Skriv inn antall hvis tomt eller bostaver");
            $("#antall").val("");

            feilmelding++;
        } else {
            $("#feilAntall").html("");
        }
    }
    function sjekkTlf(){
        let telefonnr = $("#telefonnr").val();
        let telefonRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        if (!telefonnr || !telefonRegex.test(telefonnr)) {
            $("#feilTelefonnr").html("Skriv inn en telefonnummer hvis tomt");
            feilmelding++;
        } else {
            $("#feilTelefonnr").html("");
        }

    }
    function sjekkEpost(){
        let epost = $("#epost").val();
        let epostRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!epost || !epostRegex.test(epost)) {
            $("#feilEpost").html("Skriv inn epost adresse hvis tomt");
            feilmelding++;
        } else {
            $("#feilEpost").html("");
        }
    }
    function sjekkfilm(){
        let film = $("#film").val();
        if (film === "Velg film her") {
            $("#feilValg").html("Velg en film");
            feilmelding++;
        } else {
            $("#feilValg").html("");
        }
    }
    function kjopBillett() {
        let etternavn = $("#fornavn").val();
        let fornavn = $("#fornavn").val();
        let antall = $("#antall").val();
        let telefonnr = $("#telefonnr").val();
        let film = $("#film").val();
        let epost = $("#epost").val();
        console.log(feilmelding);
        if (feilmelding === 0) {
            // Lag en Billett-objekt
            const Billett = {
                film: film,
                antall: antall,
                fornavn: fornavn,
                etternavn: etternavn,
                telefonnr: telefonnr,
                epost: epost
            };

            // Utfør AJAX-postforespørsel for å kjøpe billett
            $.post("/lagre", Billett, function () {
                // Når billetten er kjøpt, oppdater listen over billetter
                visAlleBilletter();
            });
        }
    }

        function visAlleBilletter() {
            // Utfør AJAX-forespørsel for å hente alle billetter
            $.get("/visAlle", function (data) {
                // Når dataene er mottatt, formater dem og vis dem på siden
                formaterBilletter(data);
            });
        }

        function slettAlleBilletter() {
            // Utfør AJAX-forespørsel for å slette alle billetter
            $.post("/slettAlle", function () {
                // Når alle billetter er slettet, oppdater listen over billetter
                TomUtAlleBilletter();
                visAlleBilletter();
            });
        }

        function TomUtAlleBilletter() {
            $("#film").val("Velg film her");
            $("#antall").val("");
            $("#fornavn").val("");
            $("#etternavn").val("");
            $("#telefonnr").val(""); // Endret fra "#tlf" til "#telefonnr"
            $("#epost").val("");
        }


        function formaterBilletter(Billetter) {
            // Formater billettdataene til en HTML-tabell
            let ut = "<table> <tr> " +
                "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
            for (let enbillett of Billetter) {
                ut += "<tr>";
                ut += "<td>" + enbillett.film + "</td><td>" + enbillett.antall + "</td><td>" + enbillett.fornavn + "</td><td>" + enbillett.etternavn + "</td><td>" + enbillett.telefonnr + "</td><td>" + enbillett.epost + "</td>";
                ut += "</tr>";
            }
            ut += "</table>";

            // Oppdater HTML-elementet med ID-en "output" med den genererte tabellen
            $("#output").html(ut);
            TomUtAlleBilletter();
        }



