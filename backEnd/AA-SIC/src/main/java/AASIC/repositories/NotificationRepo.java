package AASIC.repositories;



import AASIC.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface NotificationRepo extends JpaRepository<Notification, Integer>{

    @Modifying
    @Query(value = "DELETE FROM notification WHERE id = ?", nativeQuery = true)
    void removeNotificationById(Integer id);
}