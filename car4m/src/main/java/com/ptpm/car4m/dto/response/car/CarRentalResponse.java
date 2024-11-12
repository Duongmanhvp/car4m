package com.ptpm.car4m.dto.response.car;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ptpm.car4m.entity.Location;
import com.ptpm.car4m.enums.CarStatus;
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
	
	Long carId;
	
	Long rentalId;
	
	Long userId;
	
	String name;
	
	Long rentalFee;
	
	CarStatus status;
	
	String type;
	
	Location location;
	
	CarDetailResponse carDetail;
	
	LocalDateTime rentalDate;
	
	LocalDateTime receiveDate;
	
	LocalDateTime returnDate;
	
	Integer totalHours;
	
	Long totalFee;
	
}
