package AASIC.repositories;

import AASIC.model.User;


import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepo extends JpaRepository<User, Integer>{
    
}