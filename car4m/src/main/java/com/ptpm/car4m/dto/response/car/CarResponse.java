package com.ptpm.car4m.dto.response.car;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ptpm.car4m.entity.Location;
import com.ptpm.car4m.enums.CarStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CarResponse {
	
	Long id;
	
	Long userId;
	
	String name;
	
	Long rentalFee;
	
	CarStatus status;
	
	String type;
	
	Location location;
	
	CarDetailResponse carDetail;
	
	Boolean isAccepted;
	
}
