package AASIC.model;

import lombok.Data;
import org.hibernate.mapping.Set;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "ticket_type")
public class TicketType{


    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    @Column(name = "type")
    private String type;
    @Column(name = "start_date")
    private Date start_date;
    @Column(name = "end_date")
    private Date end_date;
    @Column(name = "price")
    private float price;
    @Column(name = "'range'")
    private float range;
    @OneToMany(mappedBy = "ticket_type" , cascade = CascadeType.ALL)
    private List<Ad> ads;

    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;

}