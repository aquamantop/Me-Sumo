package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.dto.ActivityDTO;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.mappers.ActivityMapper;
import com.mesumo.msclubs.models.repository.IActivityRepository;
import com.mesumo.msclubs.models.service.IActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ActivityService implements IActivityService {

    @Autowired
    IActivityRepository activityRepository;

    private static final ActivityMapper activityMapper = new ActivityMapper();

    @Override
    public Activity findById(Long id) throws ResourceNotFoundException {
        Optional<Activity> activity = activityRepository.findById(id);
        if (activity.isEmpty()){
            throw new ResourceNotFoundException("Activity not found");
        }
        return activity.get();
    }

    @Override
    public Activity create(Activity activity) {
        return null;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {

    }

    @Override
    public Activity update(Activity activity) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public List<Activity> findAll() {
        return activityRepository.findAll();
    }

    @Override
    public ActivityDTO findByIdDTO(Long id) throws ResourceNotFoundException {
        Optional<Activity> activity = activityRepository.findById(id);

        if (activity.isEmpty()){
            throw new ResourceNotFoundException("ActivityDTO not found");
        }

        return activityMapper.convertToDto(activity.get());
    }

    @Override
    public List<ActivityDTO> findAllDTO() {
        List<Activity> activities = activityRepository.findAll();
        List<ActivityDTO> activityDTO = new ArrayList<>();

        for (Activity activity : activities) {
            ActivityDTO dto = activityMapper.convertToDto(activity);
            activityDTO.add(dto);
        }

        return activityDTO;
    }

}
