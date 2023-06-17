package AASIC.repositories;

import AASIC.model.SuggestedEvent;
import AASIC.model.TicketType;


import org.springframework.data.jpa.repository.JpaRepository;


public interface SuggestedEventRepo extends JpaRepository<SuggestedEvent, Integer>{

}