package com.ptpm.car4m.dto.request.car;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ptpm.car4m.enums.Fuel;
import com.ptpm.car4m.enums.Transmission;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class CarCreationRequest {
	
	@NotBlank
	String name;
	
	Long rentalFee;
	
	String type;
	
	String location;
	
	Transmission transmission;
	
	Fuel fuel;
	
	Integer seats;
	
	String fuelConsumption;
	
	String description;
	
	Set<Integer> comfortIds;
	
	List<String> images;
}
