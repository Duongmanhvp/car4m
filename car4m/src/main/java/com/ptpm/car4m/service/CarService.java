package com.ptpm.car4m.service;

import com.ptpm.car4m.dto.request.car.CarAutoRefuseRequest;
import com.ptpm.car4m.dto.request.car.CarCreationRequest;
import com.ptpm.car4m.dto.request.car.CarRentalRequest;
import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.PageResponse;
import com.ptpm.car4m.dto.response.car.CarRentalResponse;
import com.ptpm.car4m.dto.response.car.CarResponse;
import com.ptpm.car4m.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.LocalDateTime;
import java.util.List;

public interface CarService {
	
	// OWNER API
	CarResponse addCar(Jwt principal, CarCreationRequest request);
	
	PageResponse<CarResponse> getMyLiked(int pageNo, int pageSize, Jwt principal);
	
	PageResponse<CarRentalResponse> getMyTrip(int pageNo, int pageSize, Jwt principal);
	
	void like(Jwt principal, long carId);
	
	CarResponse deleteCar(Jwt principal, long carId);
	
	CarRentalResponse rentCar(Jwt principal, CarRentalRequest request);
	
	void autoRefuse(Jwt principal, CarAutoRefuseRequest request);
	
	List<CarRentalResponse> getAllRentalByCarId(Jwt principal, long carId);
	
	List<CarRentalResponse> getAllRentalFinishedByCarId(Jwt principal, long carId);
	
	List<CarRentalResponse> getAllRentalProgressingByCarId(Jwt principal, long carId);
	
	List<CarRentalResponse> getAllRentalComingByCarId(Jwt principal, long carId);
	
	// PUBLIC API
	PageResponse<CarResponse> getCarsByUserId(int pageNo, int pageSize, long userId);
	
	List<CarRentalResponse> getRentalBetween(long carId, LocalDateTime startDate, LocalDateTime endDate);
	
	PageResponse<CarResponse> getAllCars(int pageNo, int pageSize);
	
	PageResponse<CarResponse> searchCarByLocation(int pageNo, int pageSize, double radius, String location);
	
	PageResponse<CarResponse> searchCarByType(int pageNo, int pageSize, String type);
	
	PageResponse<CarResponse> searchCarByPrice(long minPrice, long maxPrice, int pageNo, int pageSize);
	
	PageResponse<CarResponse> searchCarByFuel(int pageNo, int pageSize, String fuel);
	
	PageResponse<CarResponse> searchCarBySeats(int pageNo, int pageSize, int seats);
	
	PageResponse<CarResponse> searchCarByTransmission(int pageNo, int pageSize, String transmission);
	
	PageResponse<CarResponse> searchFilteredCar(int pageNo, int pageSize, CarSearchFilterRequest request);
	
	CarResponse getCarById(long carId);
	
	// ADMIN API
	PageResponse<CarResponse> getAllCarsNotAccepted(int pageNo, int pageSize);
	
	CarResponse acceptCar(long carId);
	
	CarResponse rejectCar(long carId);
}
