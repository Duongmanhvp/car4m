package com.ptpm.car4m.dto.response.car;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ptpm.car4m.entity.Location;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarRentalResponse {
	
	Long id;
	
	Long userId;
	
	String name;
	
	Long rentalFee;
	
	String status;
	
	String type;
	
	Location location;
	
	CarDetailResponse carDetail;
	
	LocalDateTime rentalDate;
	
	LocalDateTime receiveDate;
	
	LocalDateTime returnDate;
	
}
