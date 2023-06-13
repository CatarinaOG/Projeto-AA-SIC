package AASIC.repositories;

import AASIC.model.TicketType;


import org.springframework.data.jpa.repository.JpaRepository;


public interface TicketTypeRepo extends JpaRepository<TicketType, Integer>{
    
}