package model;

import models.Kunde;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Repositorie {

    @Autowired
    private JdbcTemplate db;

    public void lagreKunde(Kunde kunde) {
        String sql = "INSERT INTO Kunde (antall, film, fornavn, etternavn, epost, telefonnr) VALUES (?, ?, ?, ?, ?, ?)";
        db.update(sql,kunde.getAntall(), kunde.getFilm(), kunde.getFornavn(), kunde.getEtternavn(), kunde.getEpost(), kunde.getTelefonnr());
    }

    public List<Kunde> visAlleBilletter() {
        String sql = "SELECT * FROM Kunde";
        List<Kunde> alleKunder = db.query(sql, new BeanPropertyRowMapper<>(Kunde.class));
        return alleKunder;
    }

    public void slettAlle() {
        String sql = "DELETE FROM Kunde";
        db.update(sql);
    }
}
