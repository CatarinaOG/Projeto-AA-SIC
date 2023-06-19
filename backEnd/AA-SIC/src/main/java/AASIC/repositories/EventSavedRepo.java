package AASIC.repositories;

import AASIC.model.Admin;
import AASIC.model.Event;
import AASIC.model.EventSaved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EventSavedRepo extends JpaRepository<EventSaved, Integer> {
    @Query(value = "SELECT * FROM event_saved WHERE event_saved.event_id = ?", nativeQuery = true)
    Optional<EventSaved> findEventSavedByEventId(Integer id);

    @Modifying
    @Query(value = "DELETE FROM event_saved WHERE id = ?", nativeQuery = true)
    void removeEventSavedById(Integer id);


}