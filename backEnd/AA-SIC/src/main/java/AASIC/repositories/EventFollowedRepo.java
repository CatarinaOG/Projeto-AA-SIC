package AASIC.repositories;

import AASIC.model.Admin;
import AASIC.model.EventFollowed;
import AASIC.model.EventSaved;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventFollowedRepo extends JpaRepository<EventFollowed, Integer> {
}