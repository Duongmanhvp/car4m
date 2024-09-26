package com.ptpm.car4m.service.impl;

import com.ptpm.car4m.dto.request.user.UserCreationRequest;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.exception.AlreadyExistsException;
import com.ptpm.car4m.repository.UserRepository;
import com.ptpm.car4m.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	final UserRepository userRepository;
	
	final PasswordEncoder passwordEncoder;
	
	@Override
	public UserCreationResponse createUser(UserCreationRequest request) {
		
		userRepository.findByUsername(request.getUsername())
				.ifPresent(user -> {
					throw new AlreadyExistsException("Username already exists");
				});
		userRepository.findByEmail(request.getEmail())
				.ifPresent(user -> {
					throw new AlreadyExistsException("Email already exists");
				});
		userRepository.findByPhone(request.getPhone())
				.ifPresent(user -> {
					throw new AlreadyExistsException("Phone already exists");
				});
		
		User user = new User();
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setPhone(request.getPhone());
		user.setEmail(request.getEmail());
		
		userRepository.save(user);
		
		return UserCreationResponse.builder()
				.username(user.getUsername())
				.phone(user.getPhone())
				.email(user.getEmail())
				.build();
		
	}
}
