package AASIC.model;

import org.hibernate.mapping.Set;
import jakarta.persistence.*;

@Entity
@Table(name = "ticket_type")
public class TicketType{


    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private float price;

    @Column(name = "'range'")
    private float range;

    /* Getters */
    public int getId() {
        return id;
    }
    public float getPrice() {
        return price;
    }
    public float getRange() {
        return range;
    }
    public String getType() {
        return type;
    }

    /* Setters */
    public void setId(int id) {
        this.id = id;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    public void setRange(float range) {
        this.range = range;
    }
    public void setType(String type) {
        this.type = type;
    }

}