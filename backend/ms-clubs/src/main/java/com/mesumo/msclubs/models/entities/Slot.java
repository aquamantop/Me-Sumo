package com.mesumo.msclubs.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.sql.Time;
import java.time.LocalDate;
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
    @JsonIgnore
    private Court court;

    private int capacity;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "slot_day_entity",
            joinColumns = @JoinColumn(name = "slot_id"),
            inverseJoinColumns = @JoinColumn(name = "day_entity_id"))
    private Set<DayEntity> days;
  
    private Time startTime;
  
    private Time endTime;

}