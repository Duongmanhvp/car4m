package com.ptpm.car4m;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@SpringBootApplication
@EnableScheduling
public class Car4mApplication {

	public static void main(String[] args) {
		SpringApplication.run(Car4mApplication.class, args);
	}

}
