package com.mesumo.msclubs;

import com.mesumo.msclubs.models.entities.Activity;
import com.mesumo.msclubs.models.entities.Amenity;
import com.mesumo.msclubs.models.entities.Club;
import com.mesumo.msclubs.models.entities.Neighborhood;
import com.mesumo.msclubs.models.repository.IClubRepository;
import com.mesumo.msclubs.models.repository.INeighborhood;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class MsClubsApplication {

	private final IClubRepository clubRepository;
	private final INeighborhood neighborhoodRepository;

	public MsClubsApplication(IClubRepository clubRepository, INeighborhood neighborhoodRepository) {
		this.clubRepository = clubRepository;
		this.neighborhoodRepository = neighborhoodRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(MsClubsApplication.class, args);
	}

	@Bean
	public CommandLineRunner loadData() {
		return args -> {
			// Crear objetos y guardarlos en la base de datos
			Amenity amenity1 = new Amenity();
			amenity1.setName("Piscina");
			Amenity amenity2 = new Amenity();
			amenity2.setName("Gimnasio");

			Activity activity1 = new Activity();
			activity1.setName("Futbol");
			Activity activity2 = new Activity();
			activity2.setName("Tenis");

			Neighborhood neighborhood1 = new Neighborhood();
			neighborhood1.setName("Monserrat");
			neighborhoodRepository.save(neighborhood1);


			Club club1 = new Club();
			club1.setName("Belgrano");
			club1.setAddress("Av. Cabildo 1234");
			club1.setNeighborhood(neighborhood1);
			Set<Amenity> amenities = new HashSet<>();
			amenities.add(amenity1);
			amenities.add(amenity2);
			club1.setAmenities(amenities);

			Set<Activity> activities = new HashSet<>();
			activities.add(activity1);
			activities.add(activity2);
			club1.setActivities(activities);

			// Guardar en la base de datos
			clubRepository.save(club1);


		};
	}
};


