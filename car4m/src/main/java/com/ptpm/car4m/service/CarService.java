package com.ptpm.car4m.service;

import com.ptpm.car4m.dto.request.car.CarCreationRequest;
import com.ptpm.car4m.dto.request.car.CarRentalRequest;
import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.PageResponse;
import com.ptpm.car4m.dto.response.car.CarRentalResponse;
import com.ptpm.car4m.dto.response.car.CarResponse;
import com.ptpm.car4m.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface CarService {
	
	// OWNER API
	CarResponse addCar(Jwt principal, CarCreationRequest request);
	
	PageResponse<CarResponse> getMyCars(int pageNo, int pageSize, Jwt principal);
	
	PageResponse<CarResponse> getMyLiked(int pageNo, int pageSize, Jwt principal);
	
	PageResponse<CarRentalResponse> getMyTrip(int pageNo, int pageSize, Jwt principal);
	
	void like(Jwt principal, long carId);
	
	CarResponse deleteCar(Jwt principal, long carId);
	
	CarRentalResponse rentCar(Jwt principal, CarRentalRequest request);
	
	// PUBLIC API
	PageResponse<CarResponse> getAllCars(int pageNo, int pageSize);
	
	PageResponse<CarResponse> searchCarByLocation(int pageNo, int pageSize, double radius, String location);
	
	PageResponse<CarResponse> searchCarByType(int pageNo, int pageSize, String type);
	
	PageResponse<CarResponse> searchCarByPrice(long minPrice, long maxPrice, int pageNo, int pageSize);
	
	PageResponse<CarResponse> searchCarByFuel(int pageNo, int pageSize, String fuel);
	
	PageResponse<CarResponse> searchCarBySeats(int pageNo, int pageSize, int seats);
	
	PageResponse<CarResponse> searchCarByTransmission(int pageNo, int pageSize, String transmission);
	
	PageResponse<CarResponse> searchFilteredCar(int pageNo, int pageSize, CarSearchFilterRequest request);
	
	// ADMIN API
	
	CarResponse acceptCar(long carId);
	
	CarResponse rejectCar(long carId);
}
