package com.ptpm.car4m.dto.request.car;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ptpm.car4m.enums.Fuel;
import com.ptpm.car4m.enums.Transmission;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarRentalRequest {

	Long carId;
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	LocalDateTime receiveDate;
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	LocalDateTime returnDate;
	
}
