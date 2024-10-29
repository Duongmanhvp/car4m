package com.ptpm.car4m.component;

import com.ptpm.car4m.entity.Car;
import com.ptpm.car4m.exception.EmailException;
import com.ptpm.car4m.exception.NotFoundException;
import com.ptpm.car4m.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component("carComponent")
@RequiredArgsConstructor
@Slf4j
public class CarComponent {
	
	private final CarRepository carRepository;
	
	public boolean isCarOwner(Long carId, Jwt principal) {
		Long userId = (Long) principal.getClaims().get("id");
		
		Car car = carRepository.findById(carId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy xe"));
		
		return userId.equals(car.getOwner().getId());
	}
	
}
