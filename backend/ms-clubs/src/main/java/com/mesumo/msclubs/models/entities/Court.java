package com.mesumo.msclubs.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

public class Court {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int number;
    private String urlImage;
    @ManyToOne (cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn (name = "activy", nullable = false, referencedColumnName = "id")
    @JsonIgnore
    private Activity activity;
    @Enumerated(EnumType.STRING)
    @Column(name="court_type")
    private CourtType court_type;
    private boolean inside;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "court")
    private Set<Slot> slots;

}