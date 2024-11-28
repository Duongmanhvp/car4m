package com.ptpm.car4m.service.impl;

import com.ptpm.car4m.component.OpenCageGeocoding;
import com.ptpm.car4m.dto.request.location.AddressRequest;
import com.ptpm.car4m.dto.request.user.*;
import com.ptpm.car4m.dto.response.location.GeoLocationResponse;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.dto.response.user.UserInfoResponse;
import com.ptpm.car4m.entity.DrivingLicense;
import com.ptpm.car4m.entity.IdentityCard;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.enums.Role;
import com.ptpm.car4m.exception.AlreadyExistsException;
import com.ptpm.car4m.exception.AuthenticatedException;
import com.ptpm.car4m.exception.NotFoundException;
import com.ptpm.car4m.exception.SQLIntegrityConstraintViolationException;
import com.ptpm.car4m.repository.DrivingLicenseRepository;
import com.ptpm.car4m.repository.IdentityCardRepository;
import com.ptpm.car4m.repository.UserRepository;
import com.ptpm.car4m.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	final UserRepository userRepository;
	
	final IdentityCardRepository identityCardRepository;
	
	final DrivingLicenseRepository drivingLicenseRepository;
	
	final PasswordEncoder passwordEncoder;
	
	final OpenCageGeocoding openCageGeocoding;
	
	@Override
	public UserCreationResponse createUser(UserCreationRequest request) {
		
		userRepository.findByUsername(request.getUsername())
				.ifPresent(user -> {
					throw new AlreadyExistsException("Username đã tồn tại");
				});
		userRepository.findByEmail(request.getEmail())
				.ifPresent(user -> {
					throw new AlreadyExistsException("Email đã được sử dụng");
				});
		userRepository.findByPhone(request.getPhone())
				.ifPresent(user -> {
					throw new AlreadyExistsException("Số điện thoại đã được sử dụng");
				});
		
		User user = new User();
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setPhone(request.getPhone());
		user.setEmail(request.getEmail());
		user.setRole(Role.USER);
		
		userRepository.save(user);
		
		return UserCreationResponse.builder()
				.username(user.getUsername())
				.phone(user.getPhone())
				.email(user.getEmail())
				.build();
		
	}
	
	@Override
	public void changePassword(ChangePasswordRequest request, Jwt principal) {
		
		String username = principal.getSubject();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản"));
		
		if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
			throw new AuthenticatedException("Mật khẩu cũ không đúng");
		}
		
		user.setPassword(passwordEncoder.encode(request.getNewPassword()));
		userRepository.save(user);
		
	}
	
	@Override
	public UserInfoResponse getMyInfo(Jwt principal) {
		
		String username = principal.getSubject();
		
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản"));
		
		return UserInfoResponse.builder()
				.id(user.getId())
				.username(user.getUsername())
				.email(user.getEmail())
				.phone(user.getPhone())
				.address(user.getAddress())
				.role(user.getRole())
				.image(user.getImage())
				.drivingLicense(user.getDrivingLicense())
				.identityCard(user.getIdentityCard())
				.build();
	}
	
	@Override
	public void updateIdentityCard(Jwt principal, UpdateIdentityCardRequest request) {
		
		String username = principal.getSubject();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản."));
		
		if (user.getIdentityCard() != null) {
			throw new AlreadyExistsException("Bạn đã cập nhật thông tin trước đó rồi.");
		}
		
		IdentityCard identityCard = new IdentityCard();
		identityCard.setFullName(request.getFullName());
		identityCard.setNo(request.getNo());
		identityCard.setSex(request.getSex());
		identityCard.setNationality(request.getNationality());
		identityCard.setDateOfBirth(request.getDateOfBirth());
		identityCard.setImageUrl(request.getImageUrl());
		
		identityCardRepository.save(identityCard);
		
		user.setIdentityCard(identityCard);
		userRepository.save(user);
		
	}
	
	@Override
	public void updateDrivingLicense(Jwt principal, UpdateDrivingLicenseRequest request) {
		String username = principal.getSubject();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản."));
		
		DrivingLicense drivingLicense = new DrivingLicense();
		drivingLicense.setNo(request.getNo());
		drivingLicense.setLicenseClass(request.getLicenseClass());
		drivingLicense.setImageUrl(request.getImageUrl());
		
		
		drivingLicenseRepository.save(drivingLicense);
		
		user.setDrivingLicense(drivingLicense);
		userRepository.save(user);
		
	}
	
	@Override
	public UserInfoResponse updateMyInfo(Jwt principal, UpdateInfoRequest request) {
		String username = principal.getSubject();
		
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản."));
		
		if (request.getPhone() != null) {
			if (request.getPhone().equals(user.getPhone()))
				throw new AlreadyExistsException("Vui lòng nhập số điện thoại khác với số hiện tại");
			else {
				userRepository.findByPhone(request.getPhone())
						.ifPresent(u -> {
							throw new AlreadyExistsException("Số điện thoại đã được sử dụng");
						});
			}
			user.setPhone(request.getPhone());
		}
		
		if (request.getEmail() != null) {
			if (request.getEmail().equals(user.getEmail()))
				throw new AlreadyExistsException("Vui lòng nhập email khác với email hiện tại");
			else {
				userRepository.findByEmail(request.getEmail())
						.ifPresent(u -> {
							throw new AlreadyExistsException("Số điện thoại đã được sử dụng");
						});
			}
			user.setEmail(request.getEmail());
			
		}
		
		userRepository.save(user);
		
		return UserInfoResponse.builder()
				.id(user.getId())
				.username(user.getUsername())
				.email(user.getEmail())
				.phone(user.getPhone())
				.address(user.getAddress())
				.role(user.getRole())
				.image(user.getImage())
				.drivingLicense(user.getDrivingLicense())
				.identityCard(user.getIdentityCard())
				.build();
	}
	
	@Override
	public UserInfoResponse getAnotherUserInfo(Long id) {
		
		User user = userRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản"));
		
		return UserInfoResponse.builder()
				.id(user.getId())
				.username(user.getUsername())
				.email(user.getEmail())
				.phone(user.getPhone())
				.address(user.getAddress())
				.image(user.getImage())
				.build();
	}
	
	
}
