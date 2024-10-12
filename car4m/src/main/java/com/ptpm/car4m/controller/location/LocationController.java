package com.ptpm.car4m.controller.location;


import com.ptpm.car4m.dto.request.location.AddressRequest;
import com.ptpm.car4m.dto.request.location.GeocodingRequest;
import com.ptpm.car4m.dto.request.user.*;
import com.ptpm.car4m.dto.response.ApiResponse;
import com.ptpm.car4m.dto.response.location.GeoLocationResponse;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.dto.response.user.UserInfoResponse;
import com.ptpm.car4m.service.LocationService;
import com.ptpm.car4m.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/address")
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class LocationController {
	final LocationService locationService;
	
	
	@PostMapping("/to-geo")
	public ApiResponse<GeoLocationResponse> toGeo(
			@RequestBody AddressRequest request) {
		return ApiResponse.success(locationService.convertAddressToGeoLocation(request));
	}
	
	@PostMapping("/to-address")
	public ApiResponse<String> toAddress(
			@RequestBody GeocodingRequest request) {
		return ApiResponse.success(locationService.convertGeoLocationToAddress(request));
	}
	
}
