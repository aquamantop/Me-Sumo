package com.mesumo.msusers;

import com.mesumo.msusers.models.entities.Activity;
import com.mesumo.msusers.models.service.IActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MsUsersApplication {

	@Autowired
	IActivityService activityService;

	public static void main(String[] args) {
		SpringApplication.run(MsUsersApplication.class, args);
	}

	/*
	@Bean
	public CommandLineRunner loadData() {
		return args -> {
			// Crear objetos y guardarlos en la base de datos


			Activity activity1 = new Activity();
			activity1.setName("Fútbol");
			activityService.create(activity1);

			Activity activity2 = new Activity();
			activity2.setName("Tenis");
			activityService.create(activity2);

			Activity activity3 = new Activity();
			activity3.setName("Voley");
			activityService.create(activity3);

			Activity activity4 = new Activity();
			activity4.setName("Basquet");
			activityService.create(activity4);

		};
	}*/

}
