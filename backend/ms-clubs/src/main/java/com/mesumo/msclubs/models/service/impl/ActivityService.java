package com.mesumo.msclubs.models.service.impl;

import com.mesumo.msclubs.exceptions.ResourceNotFoundException;
import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.repository.IActivityRepository;
import com.mesumo.msclubs.models.service.IActivityService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class ActivityService implements IActivityService {

    @Autowired
    IActivityRepository activityRepository;

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
    public Set<Activity> findAll() {

        List<Activity> activities = activityRepository.findAll();

        return new HashSet<>(activities);
    }
}
