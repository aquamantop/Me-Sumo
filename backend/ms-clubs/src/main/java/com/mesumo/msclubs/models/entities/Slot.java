package com.mesumo.msclubs.models.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne (cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn (name = "court", nullable = false, referencedColumnName = "id")
    private Court court;
    private int capacity;
    private Set<Day> days;
    private Time startTime;
    private Time endTime;

}