package com.mesumo.msusers.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Neighborhood {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long neighborhoodId;
    String name;
}
