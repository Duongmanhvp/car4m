package com.ptpm.car4m.repository;

import com.ptpm.car4m.entity.Car;
import com.ptpm.car4m.entity.Rental;
import com.ptpm.car4m.repository.query.RentalRepoQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long>, RentalRepoQuery {
	
	Page<Rental> findByUserId(long userId, Pageable pageable);
	
	boolean existsByCarIdAndReceiveDateBetweenOrReturnDateBetween(long carId, LocalDateTime receiveDate, LocalDateTime returnDate, LocalDateTime receiveDate1, LocalDateTime returnDate1);
	
	List<Rental> findByCarIdAndReceiveDateBetweenOrReturnDateBetween(long carId, LocalDateTime startDate, LocalDateTime endDate, LocalDateTime startDate1, LocalDateTime endDate1);
	
	List<Rental> findByCarId(long carId);
	
	List<Rental> findByCarIdAndReturnDateBefore(long carId, LocalDateTime now);
	
	List<Rental> findByCarIdAndReceiveDateAfter(long carId, LocalDateTime now);
	
	List<Rental> findByCarIdAndReceiveDateBeforeAndReturnDateAfter(long carId, LocalDateTime now, LocalDateTime now1);
}