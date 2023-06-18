package AASIC.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "event_saved")
public class EventSaved {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name ="user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;
}
