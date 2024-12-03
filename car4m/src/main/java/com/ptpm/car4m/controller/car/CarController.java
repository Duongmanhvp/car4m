package com.ptpm.car4m.controller.car;


import com.ptpm.car4m.dto.request.car.CarAutoRefuseRequest;
import com.ptpm.car4m.dto.request.car.CarCreationRequest;
import com.ptpm.car4m.dto.request.car.CarRentalRequest;
import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.ApiResponse;
import com.ptpm.car4m.dto.response.PageResponse;
import com.ptpm.car4m.dto.response.car.CarRentalResponse;
import com.ptpm.car4m.dto.response.car.CarResponse;
import com.ptpm.car4m.dto.response.car.TopRentedResponse;
import com.ptpm.car4m.dto.response.review.ReviewResponse;
import com.ptpm.car4m.enums.Fuel;
import com.ptpm.car4m.enums.Transmission;
import com.ptpm.car4m.service.CarService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;
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
			@RequestBody long carId) {
		carService.like(principal, carId);
		return ApiResponse.ok("Liked");
	}
	
	@PostMapping("/delete")
	public ApiResponse<CarResponse> deleteCar(
			@AuthenticationPrincipal Jwt principal,
			@RequestBody long carId) {
		return ApiResponse.success(carService.deleteCar(principal, carId));
	}
	
	@PostMapping("/rent")
	public ApiResponse<CarRentalResponse> rentCar(
			@AuthenticationPrincipal Jwt principal,
			@Valid @RequestBody CarRentalRequest request) {
		return ApiResponse.success(carService.rentCar(principal, request));
	}
	
	@PostMapping("/auto-refuse")
	public ApiResponse<String> autoRefuse(
			@AuthenticationPrincipal Jwt principal,
			@RequestBody CarAutoRefuseRequest request) {
		carService.autoRefuse(principal, request);
		return ApiResponse.ok("Đã thêm lịch nghỉ cho xe");
	}
	
	@GetMapping("/get-all-rental")
	public ApiResponse<List<CarRentalResponse>> getAllRentalByCarId(
			@AuthenticationPrincipal Jwt principal,
			@RequestParam long carId) {
		return ApiResponse.success(carService.getAllRentalByCarId(principal, carId));
	}
	
	@GetMapping("/get-all-rental-finished")
	public ApiResponse<List<CarRentalResponse>> getAllRentalFinishedByCarId(
			@AuthenticationPrincipal Jwt principal,
			@RequestParam long carId) {
		return ApiResponse.success(carService.getAllRentalFinishedByCarId(principal, carId));
	}
	
	@GetMapping("/get-all-rental-progressing")
	public ApiResponse<List<CarRentalResponse>> getAllRentalProgressingByCarId(
			@AuthenticationPrincipal Jwt principal,
			@RequestParam long carId) {
		return ApiResponse.success(carService.getAllRentalProgressingByCarId(principal, carId));
	}
	
	@GetMapping("/get-all-rental-coming")
	public ApiResponse<List<CarRentalResponse>> getAllRentalComingByCarId(
			@AuthenticationPrincipal Jwt principal,
			@RequestParam long carId) {
		return ApiResponse.success(carService.getAllRentalComingByCarId(principal, carId));
	}
	
	@GetMapping("/get-my-review")
	public ApiResponse<ReviewResponse> getMyReviewByRentalId(
			@AuthenticationPrincipal Jwt principal,
			@RequestParam long rentalId) {
		return ApiResponse.success(carService.getMyReviewByRentalId(principal, rentalId));
	}
	
	@GetMapping("/get-by-user")
	public ApiResponse<PageResponse<CarResponse>> getCarsByUserId(
			@RequestParam int pageNo,
			@RequestParam int pageSize,
			@RequestParam long userId) {
		return ApiResponse.success(carService.getCarsByUserId(pageNo, pageSize, userId));
	}
	
	@GetMapping("/get-rental-between")
	public ApiResponse<List<CarRentalResponse>> getRentalBetween(
			@RequestParam long carId,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startDate,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endDate) {
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
	@GetMapping("/get-all-not-accepted")
	public ApiResponse<PageResponse<CarResponse>> getAllCarsNotAccepted(
			@RequestParam int pageNo,
			@RequestParam int pageSize) {
		return ApiResponse.success(carService.getAllCarsNotAccepted(pageNo, pageSize));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/accept")
	public ApiResponse<CarResponse> acceptCar(@RequestBody long carId) {
		
		return ApiResponse.success(carService.acceptCar(carId));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/reject")
	public ApiResponse<CarResponse> rejectCar(@RequestBody long carId) {
		return ApiResponse.success(carService.rejectCar(carId));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/get-top-rented")
	public ApiResponse<List<TopRentedResponse>> getTopCars(
			@RequestParam int limit) {
		return ApiResponse.success(carService.getTopRentedCars(limit));
	}
	
	@GetMapping("/revenue-by-week")
	public ApiResponse<Long> calculateTotalRevenueByWeek(
			@RequestParam int year,
			@RequestParam int week) {
		return ApiResponse.success(carService.calculateTotalRevenueByWeek(year, week));
	}
	
	@GetMapping("/revenue-by-month")
	public ApiResponse<Long> calculateTotalRevenueByMonth(
			@RequestParam int year,
			@RequestParam int month) {
		return ApiResponse.success(carService.calculateTotalRevenueByMonth(year, month));
	}
	
	@GetMapping("/revenue-by-car-week")
	public ApiResponse<Long> calculateCarRevenueByWeek(
			@RequestParam long carId,
			@RequestParam int year,
			@RequestParam int week) {
		return ApiResponse.success(carService.calculateCarRevenueByWeek(carId, year, week));
	}
	
	@GetMapping("/revenue-by-car-month")
	public ApiResponse<Long> calculateCarRevenueByMonth(
			@RequestParam long carId,
			@RequestParam int year,
			@RequestParam int month) {
		return ApiResponse.success(carService.calculateCarRevenueByMonth(carId, year, month));
	}
}
