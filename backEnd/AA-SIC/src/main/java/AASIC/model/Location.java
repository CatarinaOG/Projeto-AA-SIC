package AASIC.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "location")
public class Location{
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "address")
    private String address;
    @Column(name = "capacity")
    private int capacity;
    @Column(name = "map")
    private String map;
    @Column(name="latitude")
    private String latitude;
    @Column(name="longitude")
    private String longitude;
    @Column(name="city")
    private String city;
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Event> events;

}