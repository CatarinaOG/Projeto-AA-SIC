package AASIC.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue
    private int id;
    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Event> events;
}
