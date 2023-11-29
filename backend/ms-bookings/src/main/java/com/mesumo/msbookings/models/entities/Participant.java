package com.mesumo.msbookings.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private Long userId;

        private String firstName;

        private String lastName;

        private String email;

    public Participant(Long id, String firstName, String lastName, String email) {
        this.userId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email=email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Participant )) return false;
        return userId != null && userId.equals(((Participant) o).getUserId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }
}
