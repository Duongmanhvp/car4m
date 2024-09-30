package com.ptpm.car4m.service.impl;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import com.ptpm.car4m.component.AuthenticationComponent;
import com.ptpm.car4m.component.JwtTokenProvider;
import com.ptpm.car4m.dto.request.auth.IntrospectRequest;
import com.ptpm.car4m.dto.request.auth.UserLoginRequest;
import com.ptpm.car4m.dto.response.auth.UserLoginResponse;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.exception.AuthenticatedException;
import com.ptpm.car4m.exception.NotFoundException;
import com.ptpm.car4m.repository.UserRepository;
import com.ptpm.car4m.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.text.ParseException;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
	
	private final AuthenticationComponent authenticationComponent;
	@NonFinal
	@Value("${jwt.signerKey}")
	protected String SIGNER_KEY;
	
	final UserRepository userRepository;
	final PasswordEncoder passwordEncoder;
	final JwtTokenProvider jwtTokenProvider;
	
	@Override
	public UserLoginResponse authenticate(UserLoginRequest request)  {
		User user = userRepository.findByUsername(request.getUsername())
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản!"));
		
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new
					AuthenticatedException("Mật khẩu không đúng!");
		}
		
		String accessToken = jwtTokenProvider.generateAccessToken(user);
		String refreshToken = jwtTokenProvider.generateRefreshToken(user);
		
		return UserLoginResponse.builder()
				.id(user.getId())
				.username(user.getUsername())
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.build();
	}
	
	@Override
	public String requestAccessToken(IntrospectRequest request) throws JOSEException, ParseException {
		
		if (!authenticationComponent.introspect(request)) {
			throw new AuthenticatedException("Token không hợp lệ!");
		}
		
		String username = SignedJWT.parse(request.getToken()).getJWTClaimsSet().getSubject();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản!"));
		
		return jwtTokenProvider.generateAccessToken(user);
	}
	
	@Override
	public Boolean isTokenValid(IntrospectRequest request) throws ParseException, JOSEException {
		return authenticationComponent.introspect(request);
	}
	
}
