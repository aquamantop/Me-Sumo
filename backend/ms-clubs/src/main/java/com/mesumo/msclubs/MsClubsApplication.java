package com.mesumo.msclubs;

//import com.mesumo.msclubs.models.entities.Activity;
//import com.mesumo.msclubs.models.entities.Amenity;
//import com.mesumo.msclubs.models.entities.Club;
//import com.mesumo.msclubs.models.entities.Neighborhood;
//import com.mesumo.msclubs.models.repository.IActivityRepository;
//import com.mesumo.msclubs.models.repository.IAmenityRepository;
//import com.mesumo.msclubs.models.repository.IClubRepository;
//import com.mesumo.msclubs.models.repository.INeighborhood;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import java.util.HashSet;
//import java.util.Set;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class MsClubsApplication {

	// TESTEANDO GITHUB ACTIONS
//	private final IClubRepository clubRepository;
//	private final INeighborhood neighborhoodRepository;
//	private final IAmenityRepository amenityRepository;
//	private final IActivityRepository activityRepository;

//	public MsClubsApplication(IClubRepository clubRepository, INeighborhood neighborhoodRepository, IAmenityRepository amenityRepository, IActivityRepository activityRepository) {
//		this.clubRepository = clubRepository;
//		this.neighborhoodRepository = neighborhoodRepository;
//		this.amenityRepository = amenityRepository;
//		this.activityRepository = activityRepository;
//	}

	public static void main(String[] args) {
		SpringApplication.run(MsClubsApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner loadData() {
//		return args -> {
//			// Crear objetos y guardarlos en la base de datos
//			Amenity amenity1 = new Amenity();
//			amenity1.setName("Piscina");
//			Amenity amenity2 = new Amenity();
//			amenity2.setName("Gimnasio");
//
//			Activity activity1 = new Activity();
//			activity1.setName("Futbol");
//			activity1.setType("5");
//			Activity activity2 = new Activity();
//			activity2.setName("Tenis");
//			activity2.setType("2");
//
//			Neighborhood neighborhood1 = new Neighborhood();
//			neighborhood1.setName("Monserrat");
//			neighborhoodRepository.save(neighborhood1);
//
//			Set<Amenity> amenities = new HashSet<>();
//			amenities.add(amenity1);
//			amenities.add(amenity2);
//			amenityRepository.save(amenity1);
//			amenityRepository.save(amenity2);
//
//			Set<Activity> activities = new HashSet<>();
//			activities.add(activity1);
//			activities.add(activity2);
//			activityRepository.save(activity1);
//			activityRepository.save(activity2);
//
//			Club club1 = new Club();
//			club1.setName("Belgrano");
//			club1.setAddress("Av. Cabildo 1234");
//			club1.setNeighborhood(neighborhood1);
//			club1.setActivities(activities);
//			club1.setAmenities(amenities);
//
//			// Guardar en la base de datos
//			clubRepository.save(club1);
//
//
//		};
//	}

}


