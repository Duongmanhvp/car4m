package com.ptpm.car4m.config;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SecurityConfig {
	
	CustomJwtDecoder customJwtDecoder;
	
	final String[] PUBLIC_GET_ENDPOINTS = {"v1/users/test", "v1/users/detail-user",
			"v1/cars/get-all",
			"v1/cars/get-by-type","v1/cars/get-by-fuel", "v1/cars/get-by-seats",
			"v1/cars/get-by-transmission", "v1/cars/get-by-price", "v1/cars/get-by-location",
			"v1/cars/get", "v1/cars/search",
			"v1/cars/get-rental-between", "v1/cars/get-by-user"
	};
	final String[] PUBLIC_POST_ENDPOINTS = {
			"v1/users/", "v1/auths/**",
//			"v1/auths/refresh","v1/auths/validate", "v1/auths/logout",
			"v1/images/",
			"v1/cars/"};
	final String[] SWAGGER_ENDPOINTS = {"/swagger-ui/**",
			"/swagger-resources/*",
			"/v3/api-docs/**"};
	
	
	@Value("${jwt.signerKey}")
	String signerKey;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity, OAuth2ResourceServerProperties oAuth2ResourceServerProperties) throws Exception {
		
		httpSecurity
				.authorizeHttpRequests(request
						-> request.requestMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINTS).permitAll()
						.requestMatchers(HttpMethod.POST, PUBLIC_POST_ENDPOINTS).permitAll()
						.requestMatchers(SWAGGER_ENDPOINTS).permitAll()
						.anyRequest()
						.authenticated());
		
		httpSecurity.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer
						.decoder(customJwtDecoder)
						.jwtAuthenticationConverter(jwtAuthenticationConverter())
				)
				.authenticationEntryPoint(new JwtAuthenticationEntryPoint()));
		
		httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.csrf(AbstractHttpConfigurer::disable);
		return httpSecurity.build();
	}
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Origin được phép
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Các method được phép
		corsConfiguration.setAllowedHeaders(Arrays.asList("*")); // Cho phép tất cả các header
		corsConfiguration.setAllowCredentials(true); // Cho phép gửi thông tin xác thực (cookies)
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration); // Đường dẫn áp dụng CORS
		return source;
	}
	
	@Bean
	JwtAuthenticationConverter jwtAuthenticationConverter() {
		JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
		jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
		
		JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
		jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
		
		return jwtAuthenticationConverter;
	}
	
	// Password encoder
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10);
	}
	
}
