package AASIC.repositories;

import AASIC.model.Admin;
import AASIC.model.Event;
import AASIC.model.EventFollowed;
import AASIC.model.EventSaved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface EventFollowedRepo extends JpaRepository<EventFollowed, Integer> {
    @Query(value = "SELECT * FROM event_followed WHERE event_followed.event_id = ?", nativeQuery = true)
    Optional<EventFollowed> findEventFollowedByEventId(Integer id);

    @Modifying
    @Query(value = "DELETE FROM event_followed es WHERE id = ?", nativeQuery = true)
    void removeEventFollowedById(Integer id);
}