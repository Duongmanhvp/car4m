package com.ptpm.car4m.service;

import com.ptpm.car4m.dto.request.location.AddressRequest;
import com.ptpm.car4m.dto.request.user.*;
import com.ptpm.car4m.dto.response.location.GeoLocationResponse;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.dto.response.user.UserInfoResponse;
import org.springframework.security.oauth2.jwt.Jwt;

public interface UserService {
	UserCreationResponse createUser(UserCreationRequest request);
	
	void changePassword(ChangePasswordRequest request, Jwt principal);
	
	UserInfoResponse getMyInfo(Jwt principal);
	
	void updateIdentityCard(Jwt principal, UpdateIdentityCardRequest request);
	
	void updateDrivingLicense(Jwt principal, UpdateDrivingLicenseRequest request);
	
	UserInfoResponse updateMyInfo(Jwt principal, UpdateInfoRequest request);
	
	UserInfoResponse getAnotherUserInfo(Long id);
	
}
