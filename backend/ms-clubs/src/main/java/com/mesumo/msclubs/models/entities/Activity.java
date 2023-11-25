package com.mesumo.msclubs.models.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "activity")
    private Set<Court> courts;

}
