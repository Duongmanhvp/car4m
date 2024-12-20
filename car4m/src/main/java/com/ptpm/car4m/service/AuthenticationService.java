package com.ptpm.car4m.service;

import com.nimbusds.jose.JOSEException;
import com.ptpm.car4m.dto.request.auth.IntrospectRequest;
import com.ptpm.car4m.dto.request.auth.ResetPasswordRequest;
import com.ptpm.car4m.dto.request.auth.UserLoginRequest;
import com.ptpm.car4m.dto.request.auth.UserLogoutRequest;
import com.ptpm.car4m.dto.response.auth.UserLoginResponse;

import java.text.ParseException;

public interface AuthenticationService {

	UserLoginResponse authenticate(UserLoginRequest request);
	
	String requestAccessToken(IntrospectRequest request) throws ParseException, JOSEException;

	Boolean isTokenValid(IntrospectRequest request) throws ParseException, JOSEException;
	
	void logout(UserLogoutRequest request) throws ParseException, JOSEException;
	
	void resetPassword(ResetPasswordRequest request);
}
