package com.ptpm.car4m.controller.car;


import com.ptpm.car4m.dto.request.car.CarCreationRequest;
import com.ptpm.car4m.dto.request.car.CarRentalRequest;
import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.ApiResponse;
import com.ptpm.car4m.dto.response.PageResponse;
import com.ptpm.car4m.dto.response.car.CarRentalResponse;
import com.ptpm.car4m.dto.response.car.CarResponse;
import com.ptpm.car4m.enums.Fuel;
import com.ptpm.car4m.enums.Transmission;
import com.ptpm.car4m.service.CarService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/v1/cars")
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class CarController {
	
	final CarService carService;
	
	@PostMapping("/")
	public ApiResponse<CarResponse> addCar(@AuthenticationPrincipal Jwt principal,
	                                       @Valid @RequestBody CarCreationRequest request) {
		return ApiResponse.success(carService.addCar(principal,request));
	}
	
	@GetMapping("/get-my-cars")
	public ApiResponse<PageResponse<CarResponse>> getMyCars(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@AuthenticationPrincipal Jwt principal) {
		return ApiResponse.success(carService.getMyCars(pageNo, pageSize, principal));
	}
	
	@GetMapping("/get-my-liked")
	public ApiResponse<PageResponse<CarResponse>> getMyLiked(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@AuthenticationPrincipal Jwt principal) {
		return ApiResponse.success(carService.getMyLiked(pageNo, pageSize, principal));
	}
	
	@GetMapping("/get-my-trip")
	public ApiResponse<PageResponse<CarRentalResponse>> getMyTrip(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@AuthenticationPrincipal Jwt principal) {
		return ApiResponse.success(carService.getMyTrip(pageNo, pageSize, principal));
	}
	
	@PostMapping("/like")
	public ApiResponse<String> like(
			@AuthenticationPrincipal Jwt principal,
			@RequestParam long carId) {
		carService.like(principal, carId);
		return ApiResponse.ok("Liked");
	}
	
	@PostMapping("/delete")
	public ApiResponse<CarResponse> deleteCar(
			@AuthenticationPrincipal Jwt principal,
			@RequestParam long carId) {
		return ApiResponse.success(carService.deleteCar(principal, carId));
	}
	
	@PostMapping("/rent")
	public ApiResponse<CarRentalResponse> rentCar(
			@AuthenticationPrincipal Jwt principal,
			@Valid @RequestBody CarRentalRequest request) {
		return ApiResponse.success(carService.rentCar(principal, request));
	}
	
	@GetMapping("/get-rental-between")
	public ApiResponse<List<CarRentalResponse>> getRentalBetween(
			@RequestParam long carId,
			@RequestParam LocalDateTime startDate,
			@RequestParam LocalDateTime endDate) {
		return ApiResponse.success(carService.getRentalBetween(carId, startDate, endDate));
	}
	
	@GetMapping("/get-all")
	public ApiResponse<PageResponse<CarResponse>> getAllCars(
			@RequestParam int pageNo,
			@RequestParam int pageSize) {
		return ApiResponse.success(carService.getAllCars(pageNo, pageSize));
	}
	
	@GetMapping("/get-by-type")
	public ApiResponse<PageResponse<CarResponse>> getAllCarsByType(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam String type) {
		return ApiResponse.success(carService.searchCarByType(pageNo, pageSize,type));
	}
	
	@GetMapping("/get-by-fuel")
	public ApiResponse<PageResponse<CarResponse>> getAllCarsByFuel(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam String fuel) {
		return ApiResponse.success(carService.searchCarByFuel(pageNo, pageSize,fuel));
	}
	
	@GetMapping("/get-by-seats")
	public ApiResponse<PageResponse<CarResponse>> getAllCarsBySeats(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam int seats) {
		return ApiResponse.success(carService.searchCarBySeats(pageNo, pageSize,seats));
	}
	
	@GetMapping("/get-by-transmission")
	public ApiResponse<PageResponse<CarResponse>> getAllCarsByTransmission(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam String transmission) {
		return ApiResponse.success(carService.searchCarByTransmission(pageNo, pageSize,transmission));
	}
	
	@GetMapping("/get-by-price")
	public ApiResponse<PageResponse<CarResponse>> getAllCarsByPrice(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam long minPrice,
			@RequestParam long maxPrice) {
		return ApiResponse.success(carService.searchCarByPrice(minPrice, maxPrice, pageNo, pageSize));
	}
	
	@GetMapping("/get-by-location")
	public ApiResponse<PageResponse<CarResponse>> getAllCarsByLocation(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam double radius,
			@RequestParam String location) {
		return ApiResponse.success(carService.searchCarByLocation(pageNo, pageSize,radius,location));
	}
	
	@GetMapping("/search")
	public ApiResponse<PageResponse<CarResponse>> getAllCarsByFilter(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam(required = false) String type,
			@RequestParam(required = false) String fuel,
			@RequestParam(required = false) long minPrice,
			@RequestParam(required = false) long maxPrice,
			@RequestParam(required = false) int seats,
			@RequestParam(required = false) String transmission,
			@RequestParam(required = false) String location,
			@RequestParam(required = false) double radius) {
		CarSearchFilterRequest request = CarSearchFilterRequest.builder()
				.type(type)
				.fuel(Fuel.valueOf(fuel))
				.minPrice(minPrice)
				.maxPrice(maxPrice)
				.seats(seats)
				.transmission(Transmission.valueOf(transmission))
				.location(location)
				.radius(radius)
				.build();
		return ApiResponse.success(carService.searchFilteredCar(pageNo, pageSize,request));
	}
	
	@GetMapping("/get")
	public ApiResponse<CarResponse> getCarById(@RequestParam long id) {
		return ApiResponse.success(carService.getCarById(id));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/accept")
	public ApiResponse<CarResponse> acceptCar(@RequestParam long carId) {
		
		return ApiResponse.success(carService.acceptCar(carId));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/reject")
	public ApiResponse<CarResponse> rejectCar(@RequestParam long carId) {
		return ApiResponse.success(carService.rejectCar(carId));
	}
}
