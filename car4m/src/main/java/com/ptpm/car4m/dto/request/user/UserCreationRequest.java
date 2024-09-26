package com.ptpm.car4m.dto.request.user;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
	
	@NotEmpty
	@Email(message = "Email is not valid")
	String username;
	
	@NotEmpty
	@Size(min = 8, message = "Password is not valid")
	String password;
	
	String phone;
	
	String email;
}