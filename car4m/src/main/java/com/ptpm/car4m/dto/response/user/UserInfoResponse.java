package com.ptpm.car4m.dto.response.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ptpm.car4m.entity.DrivingLicense;
import com.ptpm.car4m.entity.IdentityCard;
import com.ptpm.car4m.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserInfoResponse {
	
	Long id;
	
	String username;
	
	String address;
	
	String phone;
	
	String email;
	
	String image;
	
	Role role;
	
	DrivingLicense drivingLicense;
	
	IdentityCard identityCard;
}
