package AASIC.model;

import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ad")
public class Ad{

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "ticket")
    private String ticket;



    /* Getters */

    public Timestamp getDate() {
        return date;
    }
    public int getId() {
        return id;
    }
    public String getTicket() {
        return ticket;
    }

    /* Setters */

    public void setDate(Timestamp date) {
        this.date = date;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setTicket(String ticket) {
        this.ticket = ticket;
    }
    

}
