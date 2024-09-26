package com.ptpm.car4m.controller.user;


import com.ptpm.car4m.dto.request.user.UserCreationRequest;
import com.ptpm.car4m.dto.response.ApiResponse;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users")
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class UserController {
	final UserService userService;
	
	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.ok("Test");
	}

	@PostMapping("/")
	public ApiResponse<UserCreationResponse> createUser(@RequestBody UserCreationRequest request) {
		return ApiResponse.success(userService.createUser(request));
	}
}
