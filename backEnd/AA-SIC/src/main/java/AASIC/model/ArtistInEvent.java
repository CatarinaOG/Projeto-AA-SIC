package AASIC.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="artist_in_event")
public class ArtistInEvent {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "artist_list", referencedColumnName = "id")
    private Artist artist;

    @ManyToOne
    @JoinColumn(name = "event_list", referencedColumnName = "id")
    private Event event;

}
