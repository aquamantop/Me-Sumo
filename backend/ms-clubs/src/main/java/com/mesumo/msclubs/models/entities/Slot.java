package com.mesumo.msclubs.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalTime;
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

    @ManyToOne (cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn (name = "court", nullable = false, referencedColumnName = "id")
    private Court court;

    @JsonIgnore
    public Court getCourt() {
        return court;
    }

    @JsonProperty("court")
    public void setCourt(Court court) {
        this.court = court;
    }

    private int capacity;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "slot_day_entity",
            joinColumns = @JoinColumn(name = "slot_id"),
            inverseJoinColumns = @JoinColumn(name = "day_entity_id"))
    private Set<DayEntity> days;
  
    private LocalTime startTime;

    private LocalTime endTime;

}