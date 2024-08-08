package com.example.tutorial1.controller;

import com.example.tutorial1.entity.User;
import com.example.tutorial1.exception.UserNotFoundException;
import com.example.tutorial1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = "http://localhost:3000")
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UsersRepository usersRepository;

    @PostMapping("/addUser")
    public User newUser(@RequestBody User newUser) {
        return usersRepository.save(newUser);
    }

    @GetMapping("/getUsers")
    public Iterable<User> getUsers() {
        return usersRepository.findAll();
    }

    //Get user by id
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return usersRepository.findById(id). orElseThrow(()-> new UserNotFoundException(id));
    }

    //Get user by name
    @GetMapping("/users/")
    public Optional<User> getUserByName(@RequestParam String name) {
        return this.usersRepository.findByName(name);
    }

    //Update user
    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updateUser) {

        return usersRepository.findById(id)
                .map(user -> {
                    user.setName(updateUser.getName());
                    user.setUsername(updateUser.getUsername());
                    user.setEmail(updateUser.getEmail());
                    return usersRepository.save(user);
                }).orElseThrow(()-> new UserNotFoundException(id));

    }

    @DeleteMapping("/deleteUser/{id}")
    public User deleteUser(@PathVariable Long id) {
        Optional<User> userOptional = usersRepository.findById(id);
        if (userOptional.isPresent()) {
            usersRepository.delete(userOptional.get());
            System.out.println("User with ID " +id+ " has been deleted successfully.");
            return null;
        } else {
            throw new UserNotFoundException(id);
        }
    }
}
