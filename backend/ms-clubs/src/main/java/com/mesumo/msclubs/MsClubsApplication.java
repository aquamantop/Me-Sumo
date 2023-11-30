package com.mesumo.msclubs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsClubsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsClubsApplication.class, args);
	}

}


