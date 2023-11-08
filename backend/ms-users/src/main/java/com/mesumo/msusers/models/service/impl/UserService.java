package com.mesumo.msusers.models.service.impl;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.repository.IUserRepository;
import com.mesumo.msusers.models.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements IUserService {
    @Autowired
    IUserRepository userRepository ;

    @Override
    public User findById(Long id) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()){
            throw new ResourceNotFoundException("Activity not found");
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
        User userExists = userRepository.findByEmail(user.getEmail());
        if(userExists == null) {
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

        userExists.setUserName(user.getUserName());
        userExists.setFirstName(user.getFirstName());
        userExists.setLastName(user.getLastName());
        userExists.setEmail(user.getEmail());

        return userRepository.save(userExists);
    }

    @Override
    public User findByEmail(String email) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user==null){
            throw new ResourceNotFoundException("User not found");
        }
        return user;
    }
}
