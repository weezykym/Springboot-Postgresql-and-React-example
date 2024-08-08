package com.example.tutorial1.repository;

import com.example.tutorial1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Long> {

    Optional<User> findByName(String name);

}
