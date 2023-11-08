package com.mesumo.msusers.models.repository;

import com.mesumo.msusers.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    //@Query(value = "select * from user where email = :email", nativeQuery = true)
    //Optional<User> findByEmail (String email);

    Optional<User> findByEmail (String email);
}
