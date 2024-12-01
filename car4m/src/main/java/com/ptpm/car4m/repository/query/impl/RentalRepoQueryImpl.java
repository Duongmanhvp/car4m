package com.ptpm.car4m.repository.query.impl;


import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.car.TopRentedResponse;
import com.ptpm.car4m.entity.Car;
import com.ptpm.car4m.entity.Rental;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.repository.query.CarRepoQuery;
import com.ptpm.car4m.repository.query.RentalRepoQuery;
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
public class RentalRepoQueryImpl implements RentalRepoQuery {
	
	@PersistenceContext
	private EntityManager entityManager;
	
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
		
		Expression<Long> totalFeeSum = cb.sum(rental.get("totalFee"));
		
		Predicate carPredicate = cb.equal(rental.get("car").get("id"), carId);
		Predicate yearPredicate = cb.equal(cb.function("YEAR", Integer.class, rental.get("receiveDate")), year);
		Predicate monthPredicate = cb.equal(cb.function("MONTH", Integer.class, rental.get("receiveDate")), month);
		
		query.select(totalFeeSum)
				.where(cb.and(carPredicate, yearPredicate, monthPredicate));
		
		return entityManager.createQuery(query).getSingleResult();
	}
	
	@Override
	public Long calculateTotalRevenueByWeek(int year, int week) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);
		Root<Rental> rental = query.from(Rental.class);
		
		Expression<Long> totalFeeSum = cb.sum(rental.get("totalFee"));
		
		Predicate yearPredicate = cb.equal(cb.function("YEAR", Integer.class, rental.get("receiveDate")), year);
		Predicate weekPredicate = cb.equal(cb.function("WEEK", Integer.class, rental.get("receiveDate")), week);
		
		query.select(totalFeeSum).where(cb.and(yearPredicate, weekPredicate));
		
		return entityManager.createQuery(query).getSingleResult();
	}
	
	@Override
	public Long calculateTotalRevenueByMonth(int year, int month) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = cb.createQuery(Long.class);
		Root<Rental> rental = query.from(Rental.class);
		
		Expression<Long> totalFeeSum = cb.sum(rental.get("totalFee"));
		
		Predicate yearPredicate = cb.equal(cb.function("YEAR", Integer.class, rental.get("receiveDate")), year);
		Predicate monthPredicate = cb.equal(cb.function("MONTH", Integer.class, rental.get("receiveDate")), month);
		
		query.select(totalFeeSum).where(cb.and(yearPredicate, monthPredicate));
		
		return entityManager.createQuery(query).getSingleResult();
	}
	
	
	
}

