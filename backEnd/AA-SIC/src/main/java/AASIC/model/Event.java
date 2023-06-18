package AASIC.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

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
    private LocalDateTime date_start;
    @Column(name = "date_end")
    private LocalDateTime date_end;
    @Column(name = "accepted")
    private boolean accepted;
    @Column(name = "number_of_followers")
    private int number_of_followers;
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<EventFollowed> users;

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