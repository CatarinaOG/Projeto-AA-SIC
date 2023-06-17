package AASIC.repositories;

import AASIC.model.Admin;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AdminRepo extends JpaRepository<Admin, Integer>{
    Optional<Admin> findAdminByEmail(String email);
}