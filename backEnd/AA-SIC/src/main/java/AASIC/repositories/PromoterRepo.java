package AASIC.repositories;

import AASIC.model.Promoter;


import AASIC.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PromoterRepo extends JpaRepository<Promoter, Integer>{
    Optional<Promoter> findPromoterByEmail(String email);
}