package com.mesumo.msbookings.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;

@Entity
@Getter
@Setter
public class DayEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public DayOfWeek toJavaDayOfWeek() {
        switch (this.name) {
            case "Lunes":
                return DayOfWeek.MONDAY;
            case "Martes":
                return DayOfWeek.TUESDAY;
            case "Miercoles":
                return DayOfWeek.WEDNESDAY;
            case "Jueves":
                return DayOfWeek.THURSDAY;
            case "Viernes":
                return DayOfWeek.FRIDAY;
            case "Sabado":
                return DayOfWeek.SATURDAY;
            case "Domingo":
                return DayOfWeek.SUNDAY;
            default:
                return null;
        }
    }
}