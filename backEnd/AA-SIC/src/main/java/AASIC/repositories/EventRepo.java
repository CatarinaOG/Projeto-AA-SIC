package AASIC.repositories;

import AASIC.model.Event;


import AASIC.model.Promoter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;


public interface EventRepo extends JpaRepository<Event, Integer>{
    @Query(value = "SELECT * FROM event WHERE event.promoter_id = ?", nativeQuery = true)
    List<Event> findEventsByPromoter(Integer id);
}