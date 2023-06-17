package AASIC.model;

import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.mapping.Set;

import java.util.Date;

@Entity
@Data
@Table(name = "event")
public class Event{
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "date_start")
    private Date date_start;
    @Column(name = "date_end")
    private Date date_end;
    @Column(name = "accepted")
    private boolean accepted;
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<EventWanted> users;

    @OneToMany(mappedBy = "event" , cascade = CascadeType.ALL)
    private List<Ad> ads;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    private Admin admin;

    @ManyToOne
    @JoinColumn(name = "promoter_id", referencedColumnName = "id")
    private Promoter promoter;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<TicketType> ticket_type_list;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<ArtistInEvent> artist_list;


}