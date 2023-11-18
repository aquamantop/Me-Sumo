package com.mesumo.msusers.models.service.impl;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.Activity;
import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.repository.IUserRepository;
import com.mesumo.msusers.models.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class UserService implements IUserService {

    @Autowired
    IUserRepository userRepository ;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User findById(Long id) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()){
            throw new ResourceNotFoundException("User not found");
        }
        return user.get();
    }

    @Override
    public Set<User> findAll() {
        List<User> users = userRepository.findAll();
        return new HashSet<>(users);
    }

    @Override
    public User create(User user) throws ResourceAlreadyExistsException {
        Optional<User> userExists = userRepository.findByEmail(user.getEmail());
        if(userExists.isEmpty()) {
            user.setPassword(passwordEncoder.encode( user.getPassword()));
            return userRepository.save(user);
        }
        throw new ResourceAlreadyExistsException("User already exists");
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()){
            throw new ResourceNotFoundException("User not found");
        }
        userRepository.deleteById(id);
        System.out.println("User deleted with id: " + id);
    }

    @Override
    public User update(User user) throws ResourceNotFoundException {

        User userExists = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User id: " + user.getUserId() + "not found"));

        if (user.getUsername() != null) userExists.setUserName(user.getUsername());
        if (user.getFirstName() != null) userExists.setFirstName(user.getFirstName());
        if (user.getLastName() != null) userExists.setLastName(user.getLastName());
        if (user.getEmail() != null) userExists.setEmail(user.getEmail());
        if(user.getPhoneNumber() != null) userExists.setPhoneNumber(user.getPhoneNumber());
        if (user.getActivity() != null) {
            Set<Activity> list = userExists.getActivity();
            Set<Activity> newList = user.getActivity();
            newList.forEach(activity -> {
                AtomicInteger cont = new AtomicInteger();
                list.forEach(activity1 -> {
                    if(activity.getId() == activity1.getId()){
                        cont.getAndIncrement();
                    }
                });
                if(cont.get() == 0) {
                    list.add(activity);
                }
            });
        }
        if (user.getNeighborhood() != null) userExists.setNeighborhood(user.getNeighborhood());

        return userRepository.save(userExists);
    }

    @Override
    public User findByEmail(String email) throws ResourceNotFoundException {
        Optional<User> userExists = userRepository.findByEmail(email);
        if (userExists.isEmpty()){
            throw new ResourceNotFoundException("User not found");
        }
        return userExists.get();
    }

}
