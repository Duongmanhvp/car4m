package com.ptpm.car4m.repository.query;

import com.ptpm.car4m.dto.request.car.CarSearchFilterRequest;
import com.ptpm.car4m.dto.response.car.TopRentedResponse;
import com.ptpm.car4m.entity.Car;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface RentalRepoQuery {
	
	Long calculateCarRevenueByWeek(Long carId, int year, int week);
	
	Long calculateCarRevenueByMonth(Long carId, int year, int month);
	
	Long calculateTotalRevenueByWeek(int year, int week);
	
	Long calculateTotalRevenueByMonth(int year, int month);
	
}
