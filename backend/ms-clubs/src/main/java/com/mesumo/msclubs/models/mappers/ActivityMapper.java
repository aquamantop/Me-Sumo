package com.mesumo.msclubs.models.mappers;

import com.mesumo.msclubs.models.dto.ActivityDTO;
import com.mesumo.msclubs.models.entities.Activity;
import org.modelmapper.ModelMapper;

public class ActivityMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public ActivityDTO convertToDto(Activity activity) {
        modelMapper.addConverter(new PersistentSetToSetConverter());
        return modelMapper.map(activity, ActivityDTO.class);
    }

    public Activity convertToEntity(ActivityDTO activityDTO) {
        return modelMapper.map(activityDTO, Activity.class);
    }

}