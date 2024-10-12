package com.ptpm.car4m.service;

import com.ptpm.car4m.dto.request.location.AddressRequest;
import com.ptpm.car4m.dto.request.location.GeocodingRequest;
import com.ptpm.car4m.dto.request.user.*;
import com.ptpm.car4m.dto.response.location.GeoLocationResponse;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.dto.response.user.UserInfoResponse;
import org.springframework.security.oauth2.jwt.Jwt;

public interface LocationService {
	
	GeoLocationResponse convertAddressToGeoLocation(AddressRequest request);
	
	String convertGeoLocationToAddress(GeocodingRequest request);
	
}
