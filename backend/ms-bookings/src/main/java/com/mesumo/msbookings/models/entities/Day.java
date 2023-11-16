package com.mesumo.msbookings.models.entities;

import lombok.Getter;

import java.time.DayOfWeek;

public enum Day {
    LUNES(DayOfWeek.MONDAY, "Lunes"),
    MARTES(DayOfWeek.TUESDAY, "Martes"),
    MIERCOLES(DayOfWeek.WEDNESDAY, "Miércoles"),
    JUEVES(DayOfWeek.THURSDAY, "Jueves"),
    VIERNES(DayOfWeek.FRIDAY, "Viernes"),
    SABADO(DayOfWeek.SATURDAY, "Sábado"),
    DOMINGO(DayOfWeek.SUNDAY, "Domingo");

    private final DayOfWeek javaDayOfWeek;

    Day(DayOfWeek javaDayOfWeek) {
        this.javaDayOfWeek = javaDayOfWeek;
    }

    public DayOfWeek toJavaDayOfWeek() {
        return javaDayOfWeek;
    }

    @Getter
    private String displayName;

    Day(DayOfWeek javaDayOfWeek, String displayName) {
        this.javaDayOfWeek = javaDayOfWeek;
        this.displayName = displayName;
    }

}