package AASIC.repositories;

import AASIC.model.Artist;


import org.springframework.data.jpa.repository.JpaRepository;


public interface ArtistRepo extends JpaRepository<Artist, Integer>{
    
}