package com.ptpm.car4m.dto.response.car;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ptpm.car4m.entity.Location;
import com.ptpm.car4m.enums.Fuel;
import com.ptpm.car4m.enums.Transmission;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarDetailResponse {
	

	Transmission transmission;
	
	Fuel fuel;
	
	Integer seats;
	
	String fuelConsumption;
	
	String description;
	
	Set<String> comforts;
	
	String images;
	
	
}
