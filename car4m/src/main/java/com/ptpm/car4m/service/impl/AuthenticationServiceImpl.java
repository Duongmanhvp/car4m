package com.ptpm.car4m.service.impl;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import com.ptpm.car4m.component.AuthenticationComponent;
import com.ptpm.car4m.component.JavaMail;
import com.ptpm.car4m.component.JwtTokenProvider;
import com.ptpm.car4m.dto.request.auth.IntrospectRequest;
import com.ptpm.car4m.dto.request.auth.ResetPasswordRequest;
import com.ptpm.car4m.dto.request.auth.UserLoginRequest;
import com.ptpm.car4m.dto.request.auth.UserLogoutRequest;
import com.ptpm.car4m.dto.response.auth.UserLoginResponse;
import com.ptpm.car4m.entity.InvalidToken;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.exception.AuthenticatedException;
import com.ptpm.car4m.exception.NotFoundException;
import com.ptpm.car4m.repository.InvalidTokenRepository;
import com.ptpm.car4m.repository.UserRepository;
import com.ptpm.car4m.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.ZoneId;

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
	final InvalidTokenRepository invalidTokenRepository;
	final JavaMail javaMail;
	
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
	
	@Override
	public void logout(UserLogoutRequest request) throws ParseException, JOSEException {
		
		var signToken = authenticationComponent.verifyToken(request.getToken());
		
		LocalDateTime expiryTime = (signToken.getJWTClaimsSet().getExpirationTime())
				.toInstant()
				.atZone(ZoneId.systemDefault())
				.toLocalDateTime();
		
		InvalidToken invalidToken = InvalidToken.builder()
				.token(request.getToken())
				.createdAt(LocalDateTime.now())
				.expiryTime(expiryTime)
				.build();
		
		invalidTokenRepository.save(invalidToken);
	}
	
	@Override
	public void resetPassword(ResetPasswordRequest request) {
		User user = userRepository.findByUsernameAndEmail(request.getUsername(), request.getEmail())
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản!"));
		
		String newPassword = generateRandomPassword();
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
		
		// send email
		javaMail.sendDefaultPassword(user.getEmail(), newPassword);
		
	}
	
	private String generateRandomPassword() {
		return RandomStringUtils.randomAlphanumeric(8);
	}
	
}
