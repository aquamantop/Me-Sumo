package com.mesumo.msbookings.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FiltersDTO {

    Set<ActivityDTO> activities;

    Set<String> neighborhood;

    Set<Date> bookingDates;
}
