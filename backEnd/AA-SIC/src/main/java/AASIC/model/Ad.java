package AASIC.model;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ad")
public class Ad{
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    @Column(name = "date")
    private LocalDateTime date;
    @Column(name = "ticket")
    private String ticket;
    @Column(name="price")
    private float price;
    @Column(name = "sold")
    private boolean sold;
    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "ticket_type_id", referencedColumnName = "id")
    private TicketType ticket_type;

    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;

}
