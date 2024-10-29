package com.ptpm.car4m.repository;

import com.ptpm.car4m.entity.Car;
import com.ptpm.car4m.entity.User;
import com.ptpm.car4m.enums.Fuel;
import com.ptpm.car4m.enums.Transmission;
import com.ptpm.car4m.repository.query.CarRepoQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> , CarRepoQuery {
	
	
	Page<Car> findByIsAccepted(boolean isAccepted, Pageable pageable);
	
	Page<Car> findByIsAcceptedAndType(boolean isAccepted, String type, Pageable pageable);
	
	Page<Car> findByIsAcceptedAndCarDetail_Fuel(boolean isAccepted, Fuel fuel, Pageable pageable);
	
	Page<Car> findByIsAcceptedAndRentalFeeBetween(boolean isAccepted, long minPrice, long maxPrice, Pageable pageable);
	
	Page<Car> findByIsAcceptedAndCarDetail_Seats(boolean isAccepted, int seats, Pageable pageable);
	
	Page<Car> findByIsAcceptedAndCarDetail_Transmission(boolean isAccepted, Transmission transmission, Pageable pageable);
	
	Page<Car> findByIsAcceptedAndTypeAndCarDetail_TransmissionAndCarDetail_Fuel(boolean isAccepted, String type, Transmission transmission, Fuel fuel, Pageable pageable);
	
	Page<Car> findByOwner(User owner, Pageable pageable);
}
