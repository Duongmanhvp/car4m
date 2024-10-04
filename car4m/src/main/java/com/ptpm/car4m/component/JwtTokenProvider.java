package com.ptpm.car4m.component;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.ptpm.car4m.dto.request.auth.IntrospectRequest;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.exception.AuthenticatedException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtTokenProvider {
	

	@NonFinal
	@Value("${jwt.signerKey}")
	protected String SIGNER_KEY;
	@NonFinal
	@Value("${jwt.valid-duration}")
	protected long VALID_DURATION;
	@NonFinal
	@Value("${jwt.refreshable-duration}")
	protected long REFRESHABLE_DURATION;
	
	AuthenticationComponent authenticationComponent;
	
	public String generateAccessToken(User user) {
		return generateToken(user, VALID_DURATION, false);
	}
	
	public String generateRefreshToken(User user) {
		return generateToken(user, REFRESHABLE_DURATION, true);
	}
	
	private String generateToken(User user, long validity, boolean isRefreshToken) {
		JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
		
		JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
				.subject(user.getUsername())
				.issuer("com.car4m")
				.issueTime(new Date())
				.claim("id", user.getId())
				.expirationTime(new Date(Instant.now().plus(validity, ChronoUnit.SECONDS).toEpochMilli()))
				.jwtID(String.valueOf(UUID.randomUUID()))
				.build();
		if (!isRefreshToken) {
			jwtClaimsSet = new JWTClaimsSet.Builder(jwtClaimsSet)
					.claim("scope", "ROLE_" + user.getRole())
					.build();
		}
		Payload payload = new Payload(jwtClaimsSet.toJSONObject());
		
		JWSObject jwsObject = new JWSObject(header, payload);
		
		try {
			jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
			return jwsObject.serialize();
		} catch (JOSEException e) {
			throw new RuntimeException(e);
		}
	}
	
	
	public String getUsernameFromToken(String token) throws ParseException, JOSEException {
		boolean isValid = authenticationComponent.introspect(IntrospectRequest.builder().token(token).build());
		
		SignedJWT signedJWT = SignedJWT.parse(token);
		JWSVerifier verifier = new MACVerifier(SIGNER_KEY);
		if (signedJWT.verify(verifier) && isValid) {
			JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
			return claims.getSubject();
		} else {
			throw new JOSEException("Token signature verification failed");
		}
	}
	
}