package com.mesumo.msclubs.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @ManyToMany(mappedBy = "activities")
    @JsonIgnore
    private Set<Club> clubs;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "activity")
    private Set<Court> courts;
}
