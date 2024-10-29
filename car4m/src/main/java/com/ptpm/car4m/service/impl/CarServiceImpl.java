package com.ptpm.car4m.service.impl;

import com.ptpm.car4m.component.OpenCageGeocoding;
import com.ptpm.car4m.dto.request.car.CarCreationRequest;
import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.PageResponse;
import com.ptpm.car4m.dto.response.car.CarDetailResponse;
import com.ptpm.car4m.dto.response.car.CarRentalResponse;
import com.ptpm.car4m.dto.response.car.CarResponse;
import com.ptpm.car4m.dto.response.location.GeoLocationResponse;
import com.ptpm.car4m.entity.*;
import com.ptpm.car4m.enums.Fuel;
import com.ptpm.car4m.enums.Transmission;
import com.ptpm.car4m.exception.AlreadyExistsException;
import com.ptpm.car4m.exception.NotFoundException;
import com.ptpm.car4m.repository.*;
import com.ptpm.car4m.service.CarService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {
	
	final UserRepository userRepository;
	final CarRepository carRepository;
	final LocationRepository locationRepository;
	final CarDetailRepository carDetailRepository;
	final CarDetailComfortRepository carDetailComfortRepository;
	final ComfortRepository comfortRepository;
	final CarUserRepository carUserRepository;
	final RentalRepository rentalRepository;
	
	final CacheManager cacheManager;
	final OpenCageGeocoding openCageGeocoding;

//	@Override
//	public CarResponse addCar(Jwt principal, CarCreationRequest request) {
//
//		String username = principal.getSubject();
//
//		User user = userRepository.findByUsername(username)
//				.orElseThrow(() -> new NotFoundException("User not found"));
//
//		Car car = new Car();
//
//		GeoLocationResponse geoLocationResponse = openCageGeocoding.getGeoLocation(request.getLocation());
//
//		Location location = new Location();
//		location.setLatitude(geoLocationResponse.getLatitude());
//		location.setLongitude(geoLocationResponse.getLongitude());
//		locationRepository.save(location);
//
//		car.setOwner(user);
//		car.setName(request.getName());
//		car.setRentalFee(request.getRentalFee());
//		car.setStatus("AVAILABLE");
//		car.setType(request.getType());
//		car.setLocation(location);
//		car.setIsAccepted(false);
//
//		CarDetail carDetail = new CarDetail();
//		carDetail.setTransmission(request.getTransmission());
//		carDetail.setFuel(request.getFuel());
//		carDetail.setSeats(request.getSeats());
//		carDetail.setFuelConsumption(request.getFuelConsumption());
//		carDetail.setDescription(request.getDescription());
//		carDetail.setImages(String.join(",", request.getImages()));
//		carDetailRepository.save(carDetail);
//
//		Set<CarDetailComfort> carDetailComforts = new HashSet<>();
//		for (Integer comfortId : request.getComfortIds()) {
//			Comfort comfort = comfortRepository.findById(comfortId)
//					.orElseThrow(() -> new NotFoundException("Comfort not found with id: " + comfortId));
//			CarDetailComfort carDetailComfort = new CarDetailComfort();
//			carDetailComfort.setCarDetail(carDetail);
//			carDetailComfort.setComfort(comfort);
//			carDetailComfortRepository.save(carDetailComfort);
//			carDetailComforts.add(carDetailComfort);
//		}
//		carDetail.setCarDetailComforts(carDetailComforts);
//
//		carDetailRepository.save(carDetail);
//
//		car.setCarDetail(carDetail);
//
//		carRepository.save(car);
//
//		CarDetailResponse carDetailResponse = CarDetailResponse.builder()
//				.transmission(carDetail.getTransmission())
//				.fuel(carDetail.getFuel())
//				.seats(carDetail.getSeats())
//				.fuelConsumption(carDetail.getFuelConsumption())
//				.description(carDetail.getDescription())
//				.comforts(carDetail.getCarDetailComforts().stream()
//						.map(carDetailComfort -> carDetailComfort.getComfort().getName())
//						.collect(Collectors.toSet()))
//				.images(carDetail.getImages())
//				.build();
//
//		return CarResponse.builder()
//				.id(car.getId())
//				.userId(user.getId())
//				.name(car.getName())
//				.rentalFee(car.getRentalFee())
//				.status(car.getStatus())
//				.type(car.getType())
//				.location(location)
//				.carDetail(carDetailResponse)
//				.isAccepted(car.getIsAccepted())
//				.build();
//	}
	
	@Override
	public CarResponse addCar(Jwt principal, CarCreationRequest request) {
		String username = principal.getSubject();
		
		// Fetch user once
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy người dùng"));
		
		// Geolocation API call
		GeoLocationResponse geoLocationResponse = openCageGeocoding.getGeoLocation(request.getLocation());
		
		// Prepare Location entity and save it once
		Location location = new Location();
		location.setLatitude(geoLocationResponse.getLatitude());
		location.setLongitude(geoLocationResponse.getLongitude());
		locationRepository.save(location);
		
		// Prepare Car entity but do not save yet
		Car car = new Car();
		car.setOwner(user);
		car.setName(request.getName());
		car.setRentalFee(request.getRentalFee());
		car.setStatus("AVAILABLE");
		car.setType(request.getType());
		car.setLocation(location);
		car.setIsAccepted(false);
		
		// Prepare CarDetail entity
		CarDetail carDetail = new CarDetail();
		carDetail.setTransmission(request.getTransmission());
		carDetail.setFuel(request.getFuel());
		carDetail.setSeats(request.getSeats());
		carDetail.setFuelConsumption(request.getFuelConsumption());
		carDetail.setDescription(request.getDescription());
		carDetail.setImages(String.join(",", request.getImages()));
		
		// Handle comforts with batch processing
		Set<CarDetailComfort> carDetailComforts = request.getComfortIds().stream()
				.map(comfortId -> {
					Comfort comfort = comfortRepository.findById(comfortId)
							.orElseThrow(() -> new NotFoundException("Không có tiện nghi trên hệ thống với id: " + comfortId));
					CarDetailComfort carDetailComfort = new CarDetailComfort();
					carDetailComfort.setCarDetail(carDetail);
					carDetailComfort.setComfort(comfort);
					return carDetailComfort;
				}).collect(Collectors.toSet());
		
		carDetail.setCarDetailComforts(carDetailComforts);
		
		// Save CarDetail and related comforts together
		carDetailRepository.save(carDetail);
		carDetailComfortRepository.saveAll(carDetailComforts);
		
		// Attach CarDetail to Car
		car.setCarDetail(carDetail);
		
		// Save Car entity at once
		carRepository.save(car);
		
		// Build CarDetailResponse for response
		CarDetailResponse carDetailResponse = CarDetailResponse.builder()
				.transmission(carDetail.getTransmission())
				.fuel(carDetail.getFuel())
				.seats(carDetail.getSeats())
				.fuelConsumption(carDetail.getFuelConsumption())
				.description(carDetail.getDescription())
				.comforts(carDetail.getCarDetailComforts().stream()
						.map(carDetailComfort -> carDetailComfort.getComfort().getName())
						.collect(Collectors.toSet()))
				.images(carDetail.getImages())
				.build();
		
		// Build and return CarResponse
		return CarResponse.builder()
				.id(car.getId())
				.userId(user.getId())
				.name(car.getName())
				.rentalFee(car.getRentalFee())
				.status(car.getStatus())
				.type(car.getType())
				.location(location)
				.carDetail(carDetailResponse)
				.isAccepted(car.getIsAccepted())
				.build();
	}
	
	@Override
	public PageResponse<CarResponse> getMyCars(int pageNo, int pageSize, Jwt principal) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		Long userId = principal.getClaim("id");
		
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy người dùng"));
		
		Page<Car> carPage = carRepository.findByOwner(user, pageable);
		
		return getCarResponsePageResponse(pageNo, pageSize, carPage.getTotalElements(), carPage.getContent());
		
	}
	
	@Override
	public PageResponse<CarResponse> getMyLiked(int pageNo, int pageSize, Jwt principal) {
		
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		Long userId = principal.getClaim("id");
		
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy người dùng"));
		
		Page<CarUser> carPage = carUserRepository.findByUserId(userId, pageable);
		
		return PageResponse.<CarResponse>builder()
				.pageNo(pageNo)
				.pageSize(pageSize)
				.totalElements(carPage.getTotalElements())
				.totalPages(carPage.getTotalPages())
				.last(carPage.isLast())
				.content(carPage.getContent().stream().map(
						carUser -> CarResponse.builder()
								.id(carUser.getCar().getId())
								.userId(carUser.getCar().getOwner().getId())
								.name(carUser.getCar().getName())
								.rentalFee(carUser.getCar().getRentalFee())
								.status(carUser.getCar().getStatus())
								.type(carUser.getCar().getType())
								.location(carUser.getCar().getLocation())
								.isAccepted(carUser.getCar().getIsAccepted())
								.carDetail(CarDetailResponse.builder()
										.transmission(carUser.getCar().getCarDetail().getTransmission())
										.fuel(carUser.getCar().getCarDetail().getFuel())
										.seats(carUser.getCar().getCarDetail().getSeats())
										.fuelConsumption(carUser.getCar().getCarDetail().getFuelConsumption())
										.description(carUser.getCar().getCarDetail().getDescription())
										.comforts(carUser.getCar().getCarDetail().getCarDetailComforts().stream()
												.map(carDetailComfort -> carDetailComfort.getComfort().getName())
												.collect(Collectors.toSet()))
										.build())
								.build()
				).toList())
				.build();
	}
	
	@Override
	public PageResponse<CarRentalResponse> getMyTrip(int pageNo, int pageSize, Jwt principal) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		Long userId = principal.getClaim("id");
		
		Page<Rental> rentalPage = rentalRepository.findByUserId(userId, pageable);
		
		return PageResponse.<CarRentalResponse>builder()
				.pageNo(pageNo)
				.pageSize(pageSize)
				.totalElements(rentalPage.getTotalElements())
				.totalPages(rentalPage.getTotalPages())
				.last(rentalPage.isLast())
				.content(rentalPage.getContent().stream().map(
						rental -> CarRentalResponse.builder()
								.id(rental.getId())
								.userId(rental.getUser().getId())
								.name(rental.getCar().getName())
								.rentalFee(rental.getCar().getRentalFee())
								.status(rental.getCar().getStatus())
								.type(rental.getCar().getType())
								.location(rental.getCar().getLocation())
								.carDetail(CarDetailResponse.builder()
										.transmission(rental.getCar().getCarDetail().getTransmission())
										.fuel(rental.getCar().getCarDetail().getFuel())
										.seats(rental.getCar().getCarDetail().getSeats())
										.fuelConsumption(rental.getCar().getCarDetail().getFuelConsumption())
										.description(rental.getCar().getCarDetail().getDescription())
										.comforts(rental.getCar().getCarDetail().getCarDetailComforts().stream()
												.map(carDetailComfort -> carDetailComfort.getComfort().getName())
												.collect(Collectors.toSet()))
										.build()
								)
								.rentalDate(rental.getRentalDate())
								.receiveDate(rental.getReceiveDate())
								.returnDate(rental.getReturnDate())
								.build()
				).toList())
				.build();
		
	}
	
	@Override
	public void like(Jwt principal, long carId) {
		
		Long userId = principal.getClaim("id");
		
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy người dùng"));
		
		Car car = carRepository.findById(carId).orElseThrow(
				() -> new NotFoundException("Không tìm thấy xe với id: " + carId));
		
		if (carUserRepository.existsByCarAndUser(car, user)) {
			throw new AlreadyExistsException("Bạn đã thích xe này rồi");
		}
		
		carUserRepository.save(CarUser.builder()
				.car(car)
				.user(user)
				.build());
	}
	
	@PreAuthorize("@carComponent.isCarOwner(#carId, principal)")
	@Override
	public CarResponse deleteCar(Jwt principal, long carId) {
		
		Long userId = principal.getClaim("id");
		
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy người dùng"));
		
		Car car = carRepository.findById(carId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy xe với id: " + carId));
		
		carRepository.delete(car);
		
		return CarResponse.builder()
				.id(car.getId())
				.userId(user.getId())
				.name(car.getName())
				.rentalFee(car.getRentalFee())
				.status(car.getStatus())
				.type(car.getType())
				.location(car.getLocation())
				.carDetail(CarDetailResponse.builder().
						transmission(car.getCarDetail().getTransmission())
						.fuel(car.getCarDetail().getFuel())
						.seats(car.getCarDetail().getSeats())
						.fuelConsumption(car.getCarDetail().getFuelConsumption())
						.description(car.getCarDetail().getDescription())
						.comforts(car.getCarDetail().getCarDetailComforts().stream()
								.map(carDetailComfort -> carDetailComfort.getComfort().getName())
								.collect(Collectors.toSet()))
						.build())
				.build();
	}
	
	@Override
	public PageResponse<CarResponse> getAllCars(int pageNo, int pageSize) {
		
		Pageable pageable = PageRequest.of(pageNo, pageSize);
//
//		long total = carRepository.countByIsAccepted(true);
//
//		List<Car> cars = carRepository.getAllByIsAccepted(false, pageable);
//
//		return getCarResponsePageResponse(pageNo, pageSize, total, cars);
		
		Page<Car> carPage = carRepository.findByIsAccepted(true, pageable);
		
		return getCarResponsePageResponse(pageNo, pageSize, carPage.getTotalElements(), carPage.getContent());
	}
	
	@Override
	public PageResponse<CarResponse> searchCarByLocation(int pageNo, int pageSize,double radius, String location) {
		
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		
		GeoLocationResponse geoLocationResponse = openCageGeocoding.getGeoLocation(location);
		
		List<Car> cars = carRepository.getAllByIsAcceptedAndLocation(true, geoLocationResponse.getLatitude(), geoLocationResponse.getLongitude(),radius, pageable);
		
		return getCarResponsePageResponse(0, cars.size(), cars.size(), cars);
	}
	
	
	
	@Override
	public PageResponse<CarResponse> searchCarByType(int pageNo, int pageSize, String type) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);

//		long total = carRepository.countByIsAcceptedAndType(true, type);

//		List<Car> cars = carRepository.getAllByIsAcceptedAndType(true, type, pageable);

//		return getCarResponsePageResponse(pageNo, pageSize, total, cars);
		
		Page<Car> carPage = carRepository.findByIsAcceptedAndType(true, type, pageable);
		
		return getCarResponsePageResponse(pageNo, pageSize, carPage.getTotalElements(), carPage.getContent());
	}
	
	
	@Override
	public PageResponse<CarResponse> searchCarByPrice(long minPrice, long maxPrice, int pageNo, int pageSize) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		
		Page<Car> carPage = carRepository.findByIsAcceptedAndRentalFeeBetween(true, minPrice, maxPrice, pageable);
		
		return getCarResponsePageResponse(pageNo, pageSize, carPage.getTotalElements(), carPage.getContent());
	
	}
	
	@Override
	public PageResponse<CarResponse> searchCarByFuel(int pageNo, int pageSize, String fuel) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		
		Fuel fuelEnum;
		try {
			fuelEnum = Fuel.valueOf(fuel);
		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException("Không có loại nhiên liệu: " + fuel);
		}
		
		Page<Car> carPage = carRepository.findByIsAcceptedAndCarDetail_Fuel(true, fuelEnum, pageable);
		
		return getCarResponsePageResponse(pageNo, pageSize, carPage.getTotalElements(), carPage.getContent());
	}
	
	@Override
	public PageResponse<CarResponse> searchCarBySeats(int pageNo, int pageSize, int seats) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		
		Page<Car> carPage = carRepository.findByIsAcceptedAndCarDetail_Seats(true, seats, pageable);
		
		return getCarResponsePageResponse(pageNo, pageSize, carPage.getTotalElements(), carPage.getContent());
	}
	
	@Override
	public PageResponse<CarResponse> searchCarByTransmission(int pageNo, int pageSize, String transmission) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		Transmission tran;
		try {
			tran = Transmission.valueOf(transmission);
		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException("Không có loại hộp số: " + transmission);
		}
		Page<Car> carPage = carRepository.findByIsAcceptedAndCarDetail_Transmission(true, tran, pageable);
		
		return getCarResponsePageResponse(pageNo, pageSize, carPage.getTotalElements(), carPage.getContent());
	}
	
	@Override
	public PageResponse<CarResponse> searchFilteredCar(int pageNo, int pageSize, CarSearchFilterRequest request) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		
		List<Car> carPage = carRepository.searchCar(request, pageable);
		
		return getCarResponsePageResponse(pageNo, pageSize, carPage.size(), carPage);
	}
	
	@Override
	public void acceptCar(long carId) {
		
		Car car = carRepository.findById(carId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy xe với id: " + carId));
		
		car.setIsAccepted(true);
		
		carRepository.save(car);
	}
	
	@Override
	public void rejectCar(long carId) {
		
		Car car = carRepository.findById(carId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy xe với id: " + carId));
		
		car.setIsAccepted(false);
		
		carRepository.delete(car);
		
		
	}
	
	private PageResponse<CarResponse> getCarResponsePageResponse(int pageNo, int pageSize, long total, List<Car> cars) {
		int totalPages = (int) Math.ceil((double) total / pageSize);
		
		
		List<CarResponse> content = cars.stream().map(
				car -> CarResponse.builder()
						.id(car.getId())
						.userId(car.getOwner().getId())
						.name(car.getName())
						.rentalFee(car.getRentalFee())
						.status(car.getStatus())
						.type(car.getType())
						.location(car.getLocation())
						.isAccepted(car.getIsAccepted())
						.carDetail(CarDetailResponse.builder()
								.transmission(car.getCarDetail().getTransmission())
								.fuel(car.getCarDetail().getFuel())
								.seats(car.getCarDetail().getSeats())
								.fuelConsumption(car.getCarDetail().getFuelConsumption())
								.description(car.getCarDetail().getDescription())
								.comforts(car.getCarDetail().getCarDetailComforts().stream()
										.map(carDetailComfort -> carDetailComfort.getComfort().getName())
										.collect(Collectors.toSet()))
								.build())
						.build()
		).toList();
		
		return PageResponse.<CarResponse>builder()
				.pageNo(pageNo)
				.pageSize(pageSize)
				.totalElements(total)
				.totalPages(totalPages)
				.last(pageNo == totalPages - 1)
				.content(content)
				.build();
	}
	
}
