package com.ptpm.car4m.service.impl;

import com.ptpm.car4m.component.OpenCageGeocoding;
import com.ptpm.car4m.dto.request.location.AddressRequest;
import com.ptpm.car4m.dto.request.location.GeocodingRequest;
import com.ptpm.car4m.dto.request.user.*;
import com.ptpm.car4m.dto.response.location.GeoLocationResponse;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.dto.response.user.UserInfoResponse;
import com.ptpm.car4m.entity.DrivingLicense;
import com.ptpm.car4m.entity.IdentityCard;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.enums.Role;
import com.ptpm.car4m.exception.AlreadyExistsException;
import com.ptpm.car4m.exception.AuthenticatedException;
import com.ptpm.car4m.exception.NotFoundException;
import com.ptpm.car4m.repository.DrivingLicenseRepository;
import com.ptpm.car4m.repository.IdentityCardRepository;
import com.ptpm.car4m.repository.UserRepository;
import com.ptpm.car4m.service.LocationService;
import com.ptpm.car4m.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
	
	final OpenCageGeocoding openCageGeocoding;
	
	
	@Override
	public GeoLocationResponse convertAddressToGeoLocation(AddressRequest request) {
		return openCageGeocoding.getGeoLocation(request.getAddress());
	}
	
	@Override
	public String convertGeoLocationToAddress(GeocodingRequest request) {
		return openCageGeocoding.getAddress(request.getLatitude(), request.getLongitude());
	}
}
