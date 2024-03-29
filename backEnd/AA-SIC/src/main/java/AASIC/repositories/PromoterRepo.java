package AASIC.repositories;

import AASIC.model.Promoter;


import AASIC.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;


public interface PromoterRepo extends JpaRepository<Promoter, Integer>{
    Optional<Promoter> findPromoterByEmail(String email);

    @Modifying
    @Query(value = "DELETE FROM promoter p WHERE p.id = ?", nativeQuery = true)
    void removePromoterById(Integer id);
}