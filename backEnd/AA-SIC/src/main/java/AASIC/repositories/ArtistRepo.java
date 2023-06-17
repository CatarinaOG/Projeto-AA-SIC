package AASIC.repositories;

import AASIC.model.Artist;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ArtistRepo extends JpaRepository<Artist, Integer>{
        Optional<Artist> findByName(String name);
}