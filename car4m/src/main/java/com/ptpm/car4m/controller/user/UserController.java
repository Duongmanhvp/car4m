package com.ptpm.car4m.controller.user;


import com.ptpm.car4m.dto.request.location.AddressRequest;
import com.ptpm.car4m.dto.request.user.*;
import com.ptpm.car4m.dto.response.ApiResponse;
import com.ptpm.car4m.dto.response.location.GeoLocationResponse;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.dto.response.user.UserInfoResponse;
import com.ptpm.car4m.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
	
	@PostMapping("/change-password")
	public ApiResponse<Boolean> changePassword(
			@AuthenticationPrincipal Jwt principal,
			@RequestBody ChangePasswordRequest request) {
		userService.changePassword( request, principal);
		return ApiResponse.ok("Đổi mật khẩu thành công");
	}
	
	@GetMapping("/me")
	public ApiResponse<UserInfoResponse> getMyInfo(@AuthenticationPrincipal Jwt principal) {
		return ApiResponse.success(userService.getMyInfo(principal));
	}
	
	@PostMapping("/update-identity-card")
	public ApiResponse<Boolean> updateIdentityCard(
			@AuthenticationPrincipal Jwt principal,
			@RequestBody UpdateIdentityCardRequest request) {
		userService.updateIdentityCard(principal, request);
		return ApiResponse.ok("Cập nhật thành công");
	}
	
	@PostMapping("/update-driving-license")
	public ApiResponse<Boolean> updateDrivingLicense(
			@AuthenticationPrincipal Jwt principal,
			@RequestBody UpdateDrivingLicenseRequest request) {
		userService.updateDrivingLicense(principal, request);
		return ApiResponse.ok("Cập nhật thành công");
	}
	
	@PostMapping("/update-my-info")
	public ApiResponse<UserInfoResponse> updateMyInfo(
			@AuthenticationPrincipal Jwt principal,
			@RequestBody UpdateInfoRequest request) {
		return ApiResponse.success(userService.updateMyInfo(principal, request));
	}

	@GetMapping("/detail-user")
	public ApiResponse<UserInfoResponse> getAnotherUserInfo(@RequestParam Long id) {
		return ApiResponse.success(userService.getAnotherUserInfo(id));
	}
	
}
