package com.ptpm.car4m.component;


import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import com.ptpm.car4m.dto.request.auth.IntrospectRequest;
import com.ptpm.car4m.exception.AuthenticatedException;
import com.ptpm.car4m.repository.InvalidTokenRepository;
import com.ptpm.car4m.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthenticationComponent {
   
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;
    
    
    final UserRepository userRepository;
    
    final InvalidTokenRepository invalidTokenRepository;



    public boolean introspect(IntrospectRequest request) throws ParseException, JOSEException {
         var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token);
        }
        catch (AuthenticatedException e) {
            isValid = false;
        }

        return isValid;
    }

    public SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date()))) {
            throw new AuthenticatedException("Unauthenticated");
        }
        if(invalidTokenRepository.existsByToken(token)) throw new AuthenticatedException("Token không hợp lệ");
        return signedJWT;
    }
    
    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void deleteExpiredToken() {

        invalidTokenRepository.deleteByExpiryTimeBefore(LocalDateTime.now());
    }
    

}
