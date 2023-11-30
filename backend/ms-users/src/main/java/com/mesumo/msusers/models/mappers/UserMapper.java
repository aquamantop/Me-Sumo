package com.mesumo.msusers.models.mappers;

import com.mesumo.msusers.models.entities.User;
import com.mesumo.msusers.models.entities.dto.UserDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;

public class UserMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    static {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.addMappings(new PropertyMap<User, UserDTO>() {
            @Override
            protected void configure() {
                map().setUserName(source.getNameUser());
            }
        });
    }

    public UserDTO convertToDto(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public User convertToEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}
