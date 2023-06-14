package AASIC.repositories;

import AASIC.model.Location;


import org.springframework.data.jpa.repository.JpaRepository;


public interface LocationRepo extends JpaRepository<Location, Integer>{
    
}