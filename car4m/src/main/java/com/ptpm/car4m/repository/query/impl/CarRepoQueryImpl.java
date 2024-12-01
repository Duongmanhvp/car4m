package com.ptpm.car4m.repository.query.impl;


import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.car.TopRentedResponse;
import com.ptpm.car4m.entity.Car;
import com.ptpm.car4m.entity.Rental;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.repository.query.CarRepoQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachePut;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class CarRepoQueryImpl implements CarRepoQuery {
	
	@PersistenceContext
	private EntityManager entityManager;
	
	final CacheManager cacheManager;

//	@Override
//	public List<Car> getAllByIsAccepted(Boolean isAccepted, Pageable pageable) {
//		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
//		CriteriaQuery<Car> query = builder.createQuery(Car.class);
//		Root<Car> root = query.from(Car.class);
//
//		Predicate condition = builder.equal(root.get("isAccepted"), isAccepted);
//
//		query.select(root)
//				.where(condition);
//
//		int offset = pageable.getPageNumber() * pageable.getPageSize();
//
//		return entityManager.createQuery(query)
//				.setFirstResult(offset)
//				.setMaxResults(pageable.getPageSize())
//				.getResultList();
//	}
//
//	@Override
//	public List<Car> getAllByIsAcceptedAndType(Boolean isAccepted, String type, Pageable pageable) {
//		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
//		CriteriaQuery<Car> query = builder.createQuery(Car.class);
//		Root<Car> root = query.from(Car.class);
//
//
//		Predicate isAcceptedCondition = builder.equal(root.get("isAccepted"), isAccepted);
////		Predicate typeCondition = type != null ? builder.equal(root.get("type"), type) : builder.conjunction();
//
//		Predicate typeCondition = builder.equal(root.get("type"), type);
//		query.select(root)
//				.where(builder.and(isAcceptedCondition, typeCondition));
//
//		int offset = pageable.getPageNumber() * pageable.getPageSize();
//
//		return entityManager.createQuery(query)
//				.setFirstResult(offset)
//				.setMaxResults(pageable.getPageSize())
//				.getResultList();
//	}
//
//
//	@Override
//	public List<Car> getAllByIsAcceptedAndFuel(Boolean isAccepted, String fuel, Pageable pageable) {
//		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
//		CriteriaQuery<Car> query = builder.createQuery(Car.class);
//		Root<Car> root = query.from(Car.class);
//
//		Predicate isAcceptedCondition = builder.equal(root.get("isAccepted"), isAccepted);
//		Predicate fuelCondition = builder.equal(root.get("carDetail").get("fuel"), fuel);
//
//		query.select(root)
//				.where(builder.and(isAcceptedCondition, fuelCondition));
//
//		int offset = pageable.getPageNumber() * pageable.getPageSize();
//
//		return entityManager.createQuery(query)
//				.setFirstResult(offset)
//				.setMaxResults(pageable.getPageSize())
//				.getResultList();
//	}
	
	
	@Override
	@CachePut(value = "cars", key = "#radius")
	public List<Car> getAllByIsAcceptedAndLocation(Boolean isAccepted, double latitude, double longitude, double radius, Pageable pageable) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Car> query = builder.createQuery(Car.class);
		Root<Car> root = query.from(Car.class);
		
		Predicate isAcceptedCondition = builder.equal(root.get("isAccepted"), isAccepted);
		
		// Calculate the distance using Haversine formula
		double latDistance = radius / 111.0; // 1 degree latitude is approximately 111 km
		double lonDistance = radius / (111.0 * Math.cos(Math.toRadians(latitude)));
		
		Predicate latitudeCondition = builder.between(root.get("location").get("latitude"), latitude - latDistance, latitude + latDistance);
		Predicate longitudeCondition = builder.between(root.get("location").get("longitude"), longitude - lonDistance, longitude + lonDistance);
		
		query.select(root)
				.where(builder.and(isAcceptedCondition, latitudeCondition, longitudeCondition));

//		int offset = pageable.getPageNumber() * pageable.getPageSize();
		
		return entityManager.createQuery(query)
//				.setFirstResult(offset)
//				.setMaxResults(pageable.getPageSize())
				.getResultList();
		
	}
	
	@Override
	public List<Car> searchCar(CarSearchFilterRequest request, Pageable pageable) {
		
		
		Double key = request.getRadius();
		log.info("key: {}", key);
		
		Cache cache = cacheManager.getCache("cars");
		Cache.ValueWrapper valueWrapper = cache != null ? cache.get(key) : null;
		List<Car> cachedCars = valueWrapper != null ? (List<Car>) valueWrapper.get() : null;
		
		assert cachedCars != null;
//		return cachedCars.stream()
//				.filter(car ->
//						(request.getType() == null || car.getType().equals(request.getType())) &&
//								(request.getMinPrice() == null || car.getRentalFee() >= request.getMinPrice()) &&
//								(request.getMaxPrice() == null || car.getRentalFee() <= request.getMaxPrice()) &&
//								(request.getFuel() == null || car.getCarDetail().getFuel().equals(request.getFuel())) &&
//								(request.getSeats() == null || Objects.equals(car.getCarDetail().getSeats(), request.getSeats())) &&
//								(request.getTransmission() == null || car.getCarDetail().getTransmission().equals(request.getTransmission())))
//				.skip(pageable.getOffset())
//				.limit(pageable.getPageSize())
//				.collect(Collectors.toList());
		return cachedCars.stream()
				.filter(car ->
						Optional.ofNullable(request.getType()).map(type -> type.equals(car.getType())).orElse(true) &&
								Optional.ofNullable(request.getMinPrice()).map(minPrice -> car.getRentalFee() >= minPrice).orElse(true) &&
								Optional.ofNullable(request.getMaxPrice()).map(maxPrice -> car.getRentalFee() <= maxPrice).orElse(true) &&
								Optional.ofNullable(request.getFuel()).map(fuel -> fuel.equals(car.getCarDetail().getFuel())).orElse(true) &&
								Optional.ofNullable(request.getSeats()).map(seats -> seats.equals(car.getCarDetail().getSeats())).orElse(true) &&
								Optional.ofNullable(request.getTransmission()).map(trans -> trans.equals(car.getCarDetail().getTransmission())).orElse(true)
				)
				.skip(pageable.getOffset())
				.limit(pageable.getPageSize())
				.collect(Collectors.toList());
		
	}
	
	@Override
	public List<TopRentedResponse> getTopCarRented(int year, int week, int limit) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Tuple> query = cb.createTupleQuery();
		Root<Rental> rental = query.from(Rental.class);
		Join<Rental, Car> car = rental.join("car");
		Join<Car, User> owner = car.join("owner");
		
		
		Expression<Long> rentalCount = cb.count(rental.get("id"));
		
		query.multiselect(
				car.get("id").alias("id"),
				owner.get("id").alias("userId"),
				car.get("name").alias("name"),
				car.get("rentalFee").alias("rentalFee"),
				rentalCount.alias("rentalCount")
		);
		
		Predicate yearPredicate = cb.equal(cb.function("YEAR", Integer.class, rental.get("receiveDate")), year);
		Predicate weekPredicate = cb.equal(cb.function("WEEK", Integer.class, rental.get("receiveDate")), week);
		
		query.where(cb.and(yearPredicate, weekPredicate));
		query.groupBy(car.get("id"), owner.get("id"), car.get("name"), car.get("rentalFee"));
		query.orderBy(cb.desc(rentalCount));
		
		return entityManager.createQuery(query)
				.setMaxResults(limit) // Lấy giới hạn số xe
				.getResultList()
				.stream()
				.map(tuple -> new TopRentedResponse(
						tuple.get("id", Long.class),
						tuple.get("userId", Long.class),
						tuple.get("name", String.class),
						tuple.get("rentalFee", Long.class),
						tuple.get("rentalCount", Long.class)
				))
				.collect(Collectors.toList());
		
		
	}
	
	@Override
	public Long calculateCarRevenueByWeek(Long carId, int year, int week) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);
		Root<Rental> rental = query.from(Rental.class);
		
		Expression<Long> totalFeeSum = cb.sum(rental.get("totalFee"));
		
		Predicate carPredicate = cb.equal(rental.get("car").get("id"), carId);
		Predicate yearPredicate = cb.equal(cb.function("YEAR", Integer.class, rental.get("receiveDate")), year);
		Predicate weekPredicate = cb.equal(cb.function("WEEK", Integer.class, rental.get("receiveDate")), week);
		
		query.select(totalFeeSum)
				.where(cb.and(carPredicate, yearPredicate, weekPredicate));
		
		return entityManager.createQuery(query).getSingleResult();
	}
	
	@Override
	public Long calculateCarRevenueByMonth(Long carId, int year, int month) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);
		Root<Rental> rental = query.from(Rental.class);
		
		// Tổng doanh thu
		Expression<Long> totalFeeSum = cb.sum(rental.get("totalFee"));
		
		// Điều kiện lọc
		Predicate carPredicate = cb.equal(rental.get("car").get("id"), carId);
		Predicate yearPredicate = cb.equal(cb.function("YEAR", Integer.class, rental.get("receiveDate")), year);
		Predicate monthPredicate = cb.equal(cb.function("MONTH", Integer.class, rental.get("receiveDate")), month);
		
		// Thiết lập query
		query.select(totalFeeSum)
				.where(cb.and(carPredicate, yearPredicate, monthPredicate));
		
		// Trả về kết quả
		return entityManager.createQuery(query).getSingleResult();
	}
	
	private List<Car> getCarFromDatabase(CarSearchFilterRequest request, Pageable pageable) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Car> query = builder.createQuery(Car.class);
		Root<Car> root = query.from(Car.class);
		
		Predicate isAcceptedCondition = builder.equal(root.get("isAccepted"), true);
		
		Predicate typeCondition = request.getType() != null ? builder.equal(root.get("type"), request.getType()) : builder.conjunction();
		Predicate fuelCondition = request.getFuel() != null ? builder.equal(root.get("carDetail").get("fuel"), request.getFuel()) : builder.conjunction();
		Predicate seatsCondition = request.getSeats() != null ? builder.equal(root.get("carDetail").get("seats"), request.getSeats()) : builder.conjunction();
		Predicate transmissionCondition = request.getTransmission() != null ? builder.equal(root.get("carDetail").get("transmission"), request.getTransmission()) : builder.conjunction();
		Predicate minPriceCondition = request.getMinPrice() != null ? builder.greaterThanOrEqualTo(root.get("rentalFee"), request.getMinPrice()) : builder.conjunction();
		Predicate maxPriceCondition = request.getMaxPrice() != null ? builder.lessThanOrEqualTo(root.get("rentalFee"), request.getMaxPrice()) : builder.conjunction();
		
		query.select(root)
				.where(builder.and(isAcceptedCondition, typeCondition, fuelCondition, seatsCondition, transmissionCondition, minPriceCondition, maxPriceCondition));
		
		int offset = pageable.getPageNumber() * pageable.getPageSize();
		
		return entityManager.createQuery(query)
				.setFirstResult(offset)
				.setMaxResults(pageable.getPageSize())
				.getResultList();
	}
	
	
}

