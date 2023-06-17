package AASIC.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "suggested_events")
public class SuggestedEvent {
    @Id
    @GeneratedValue
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name="start_date")
    private LocalDateTime start_date;
    @Column(name="end_date")
    private LocalDateTime end_date;
    @Column(name="location")
    private String location;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
