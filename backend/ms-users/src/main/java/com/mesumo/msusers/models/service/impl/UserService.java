package com.mesumo.msusers.models.service.impl;

import com.mesumo.msusers.exceptions.PasswordException;
import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.entities.dto.UserChangePassword;
import com.mesumo.msusers.models.entities.dto.UserDTO;
import com.mesumo.msusers.models.mappers.UserMapper;
import com.mesumo.msusers.models.repository.IUserRepository;
import com.mesumo.msusers.models.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUserRepository userRepository ;
    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper = new UserMapper();

    @Override
    public UserDTO findById(Long id) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()){
            throw new ResourceNotFoundException("User not found");
        }
        return userMapper.convertToDto(user.get());
    }

    @Override
    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll();
        List<UserDTO> list = new ArrayList<>();
        users.forEach(user -> {
            list.add(userMapper.convertToDto(user));
        });
        return list;
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

        if (user.getNameUser() != null) userExists.setUserName(user.getNameUser());
        if (user.getFirstName() != null) userExists.setFirstName(user.getFirstName());
        if (user.getLastName() != null) userExists.setLastName(user.getLastName());
        if (user.getEmail() != null) userExists.setEmail(user.getEmail());
        if (user.getNeighborhood() != null) userExists.setNeighborhood(user.getNeighborhood());

        return userRepository.save(userExists);
    }

    @Override
    public User changePassword(UserChangePassword user) throws ResourceNotFoundException, PasswordException {
        User userExists = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User id: " + user.getUserId() + " not found"));

        String oldPassword = userExists.getPassword();
        String newPassword = passwordEncoder.encode(user.getPassword());

        if (user.getPassword().length() < 6) throw new PasswordException("Password must be at least 6 characters long");
        if (user.getPassword().length() > 18) throw new PasswordException("Password must be at most 18 characters long");
        if (passwordEncoder.matches(user.getPassword(), oldPassword)) throw new PasswordException("New password must be different from old password");
        else userExists.setPassword(newPassword);

        return userRepository.save(userExists);
    }

    @Override
    public UserDTO findByEmail(String email) throws ResourceNotFoundException {
        Optional<User> userExists = userRepository.findByEmail(email);
        if (userExists.isEmpty()){
            throw new ResourceNotFoundException("User not found");
        }
        return userMapper.convertToDto(userExists.get());
    }

}
