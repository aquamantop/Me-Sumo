package com.mesumo.msusers.models.entities.dto;

import com.mesumo.msusers.models.entities.Neighborhood;
import com.mesumo.msusers.models.entities.Role;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO implements Comparable<UserDTO>{

    private Long userId;

    private Role role;

    private String userName;

    private String firstName;

    private String lastName;

    private String email;

    private Neighborhood neighborhood;

    @Override
    public int compareTo(UserDTO otherUser) {
        return Long.compare(this.userId, otherUser.userId);
    }

}
