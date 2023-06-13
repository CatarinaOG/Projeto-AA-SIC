package AASIC.model;

import java.sql.Timestamp;

import org.hibernate.mapping.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "event")
public class Event{


    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "duration")
    private String duration;

    @Column(name = "location")
    private String location;

    @Column(name = "accepted")
    private boolean accepted;


    /* Getters */
    public Timestamp getDate() {
        return date;
    }
    public String getDuration() {
        return duration;
    }
    public int getId() {
        return id;
    }
    public String getLocation() {
        return location;
    }
    public String getName() {
        return name;
    }
    public boolean getAccepted() {
        return accepted;
    }




    /* Setters */
    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
    public void setDate(Timestamp date) {
        this.date = date;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public void setName(String name) {
        this.name = name;
    }




}