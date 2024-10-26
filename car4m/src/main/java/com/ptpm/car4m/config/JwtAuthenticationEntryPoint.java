package com.ptpm.car4m.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptpm.car4m.dto.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(
			HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
			throws IOException, ServletException {
		
		response.setStatus(401);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		
		ApiResponse<?> apiResponse = ApiResponse.builder()
				.success(false)
				.message(" Không có quyền truy cập")
				.build();
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
		response.flushBuffer();
	}
	
}