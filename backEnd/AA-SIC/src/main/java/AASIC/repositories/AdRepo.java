package AASIC.repositories;

import AASIC.model.Ad;


import AASIC.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface AdRepo extends JpaRepository<Ad, Integer>{
    @Query(value = "SELECT * FROM ad WHERE ad.user_id = ?", nativeQuery = true)
    List<Ad> findAdsByUser(Integer id);

    @Modifying
    @Query(value = "DELETE FROM ad a WHERE a.id = ?", nativeQuery = true)
    void removeAdById(Integer id);
}