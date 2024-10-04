package com.ptpm.car4m.controller.user;

import com.nimbusds.jose.JOSEException;
import com.ptpm.car4m.dto.request.auth.IntrospectRequest;
import com.ptpm.car4m.dto.request.auth.UserLoginRequest;
import com.ptpm.car4m.dto.request.auth.UserLogoutRequest;
import com.ptpm.car4m.dto.response.ApiResponse;
import com.ptpm.car4m.dto.response.auth.UserLoginResponse;
import com.ptpm.car4m.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@Slf4j
@RestController
@RequestMapping("v1/auths")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class AuthenticateController {
  
    AuthenticationService authenticationService;
    
    @PostMapping("/")
    public ApiResponse<UserLoginResponse> login(@RequestBody UserLoginRequest request)  {
        return ApiResponse.success(authenticationService.authenticate(request));
    }
    
    @PostMapping("/refresh")
    public ApiResponse<String> refresh(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        return ApiResponse.success(authenticationService.requestAccessToken(request));
    }
    
    @PostMapping("/validate")
    public ApiResponse<Boolean> validate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
       return ApiResponse.success(authenticationService.isTokenValid(request));
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@RequestBody UserLogoutRequest request) throws ParseException, JOSEException {
       authenticationService.logout(request);
       return ApiResponse.ok("Đăng xuất thành công");
    }
}
