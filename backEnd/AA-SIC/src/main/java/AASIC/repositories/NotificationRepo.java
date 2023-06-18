package AASIC.repositories;



import AASIC.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface NotificationRepo extends JpaRepository<Notification, Integer>{
}