package AASIC.model;


import jakarta.persistence.*;

@Entity
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




    /* Getters */
    public String getAddress() {
        return address;
    }
    public int getCapacity() {
        return capacity;
    }
    public int getId() {
        return id;
    }
    public String getMap() {
        return map;
    }
    public String getName() {
        return name;
    }




    /* Setters */
    public void setAddress(String address) {
        this.address = address;
    }
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setMap(String map) {
        this.map = map;
    }
    public void setName(String name) {
        this.name = name;
    }




}