package com.ptpm.car4m.service.impl;

import com.ptpm.car4m.dto.request.review.ReviewRequest;
import com.ptpm.car4m.dto.response.review.ReviewResponse;
import com.ptpm.car4m.entity.Car;
import com.ptpm.car4m.entity.Rental;
import com.ptpm.car4m.entity.Review;
import com.ptpm.car4m.exception.AlreadyExistsException;
import com.ptpm.car4m.exception.IllegalStateException;
import com.ptpm.car4m.exception.NotFoundException;
import com.ptpm.car4m.repository.CarRepository;
import com.ptpm.car4m.repository.RentalRepository;
import com.ptpm.car4m.repository.ReviewRepository;
import com.ptpm.car4m.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
	
	final ReviewRepository reviewRepository;
	final RentalRepository rentalRepository;
	final CarRepository carRepository;
	
	@PreAuthorize("@carComponent.canReview(#request.rentalId, principal)")
	@Override
	public void createReview(Jwt principal, ReviewRequest request) {
		Long userId = principal.getClaim("id");
		
		Rental rental = rentalRepository.findById(request.getRentalId())
				.orElseThrow(() -> new NotFoundException("Không tìm thấy lịch thuê"));// check if rental has finished
		
		if (rental.getReturnDate().isAfter(LocalDateTime.now())) {
			throw new IllegalStateException("Lịch thuê chưa kết thúc, không thể đánh giá");
		}
		
		
		// check if user has reviewed this rental
		if (reviewRepository.existsByRentalId(request.getRentalId())) {
			throw new AlreadyExistsException("Bạn đã đánh giá lịch thuê này rồi");
		}
		
		// create review
		Review review = Review.builder()
				.rental(Rental.builder().id(request.getRentalId()).build())
				.description(request.getContent())
				.vote(request.getRating())
				.build();
		
		reviewRepository.save(review);
	}
	
	@Override
	public List<ReviewResponse> getReviewByCar(Long carId) {
		
		Car car = carRepository.findById(carId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy xe"));
		
		if (!car.getIsAccepted()) throw new NotFoundException("Xe chưa được duyệt");
		
		return reviewRepository.findByCarId(carId);
	}
}
