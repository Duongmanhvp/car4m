package com.ptpm.car4m.service;

import com.ptpm.car4m.dto.request.car.CarCreationRequest;
import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.PageResponse;
import com.ptpm.car4m.dto.response.car.CarResponse;
import com.ptpm.car4m.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface CarService {
	
	// OWNER API
	CarResponse addCar(Jwt principal, CarCreationRequest request);
	
	// PUBLIC API
	PageResponse<CarResponse> getAllCars(int pageNo, int pageSize);
	
	PageResponse<CarResponse> searchCarByLocation(int pageNo, int pageSize, double radius, String location);
	
	PageResponse<CarResponse> searchCarByType(int pageNo, int pageSize, String type);
	
	PageResponse<CarResponse> searchCarByPrice(long minPrice, long maxPrice, int pageNo, int pageSize);
	
	PageResponse<CarResponse> searchCarByFuel(int pageNo, int pageSize, String fuel);
	
	PageResponse<CarResponse> searchCarBySeats(int pageNo, int pageSize, int seats);
	
	PageResponse<CarResponse> searchCarByTransmission(int pageNo, int pageSize, String transmission);
	
	PageResponse<CarResponse> searchFilteredCar(int pageNo, int pageSize, CarSearchFilterRequest request);
	
}
