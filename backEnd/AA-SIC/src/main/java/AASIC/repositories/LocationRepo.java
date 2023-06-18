package AASIC.repositories;

import AASIC.model.Artist;
import AASIC.model.Location;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface LocationRepo extends JpaRepository<Location, Integer>{
    Optional<Location> findByName(String name);

}