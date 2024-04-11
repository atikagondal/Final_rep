package model;

import models.Kunde;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class KundeController {

    @Autowired
    Repositorie rep;

    @PostMapping("/lagre")
    public void lagreKunde(Kunde kunde){
        rep.lagreKunde(kunde);
    }
    @GetMapping("/visAlle")
    public List<Kunde> visAlle(){
        return rep.visAlleBilletter();
    }

    @PostMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlle();
    }
}