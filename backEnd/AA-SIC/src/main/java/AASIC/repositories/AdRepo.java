package AASIC.repositories;

import AASIC.model.Ad;


import org.springframework.data.jpa.repository.JpaRepository;


public interface AdRepo extends JpaRepository<Ad, Integer>{
    
}