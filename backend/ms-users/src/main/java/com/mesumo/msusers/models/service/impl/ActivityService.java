package com.mesumo.msusers.models.service.impl;

import com.mesumo.msusers.exceptions.ResourceAlreadyExistsException;
import com.mesumo.msusers.exceptions.ResourceNotFoundException;
import com.mesumo.msusers.models.entities.Activity;
import com.mesumo.msusers.models.repository.IActivityRepository;
import com.mesumo.msusers.models.service.IActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ActivityService implements IActivityService {

    @Autowired
    IActivityRepository activityRepository ;

    @Override
    public Activity findById(Long id) throws ResourceNotFoundException {
        Optional<Activity> activity = activityRepository.findById(id);
        if (activity.isEmpty()){
            throw new ResourceNotFoundException("Activity not found");
        }
        return activity.get();
    }

    @Override
    public Set<Activity> findAll() {
        List<Activity> activities = activityRepository.findAll();
        return new HashSet<>(activities);
    }

    @Override
    public Activity create(Activity activity) throws ResourceAlreadyExistsException {
        Activity activityExists = activityRepository.findByName(activity.getName());
        if(activityExists == null) {
            return activityRepository.save(activity);
        }
        throw new ResourceAlreadyExistsException("Activity already exists");
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Activity> activity = activityRepository.findById(id);

        if (activity.isEmpty()){
            throw new ResourceNotFoundException("Activity not found");
        }
        activityRepository.deleteById(id);
        System.out.println("Activity deleted with id: " + id);
    }

    @Override
    public Activity update(Activity activity) throws ResourceNotFoundException {
        System.out.println(activity.getId());
        Activity activityExists = activityRepository.findById(activity.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Activity id: " + activity.getId() + "not found"));

        activityExists.setName(activity.getName());
        return activityRepository.save(activityExists);
    }

    @Override
    public Activity findByName(String name) throws ResourceNotFoundException {
        Activity activity = activityRepository.findByName(name);
        if (activity==null){
            throw new ResourceNotFoundException("Activity not found");
        }
        return activity;
    }



}
