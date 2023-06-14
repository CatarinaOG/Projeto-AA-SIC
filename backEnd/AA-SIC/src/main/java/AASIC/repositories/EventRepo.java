package AASIC.repositories;

import AASIC.model.Event;


import org.springframework.data.jpa.repository.JpaRepository;


public interface EventRepo extends JpaRepository<Event, Integer>{
    
}