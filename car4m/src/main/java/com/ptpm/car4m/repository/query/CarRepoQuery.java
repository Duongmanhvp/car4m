package com.ptpm.car4m.repository.query;

import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CarRepoQuery {
//	List<Car> getAllByIsAccepted (Boolean isAccepted, Pageable pageable);
//	List<Car> getAllByIsAcceptedAndType (Boolean isAccepted, String type, Pageable pageable);
//	List<Car> getAllByIsAcceptedAndFuel (Boolean isAccepted, String fuel, Pageable pageable);
	
	List<Car> getAllByIsAcceptedAndLocation (Boolean isAccepted, double latitude, double longitude, double radius, Pageable pageable);

	List<Car> searchCar(CarSearchFilterRequest request, Pageable pageable);
}
