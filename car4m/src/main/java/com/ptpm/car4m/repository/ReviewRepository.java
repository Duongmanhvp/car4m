package com.ptpm.car4m.repository;

import com.ptpm.car4m.dto.response.review.ReviewResponse;
import com.ptpm.car4m.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
	boolean existsByRentalId(Long rentalId);
	
	@Query("""
			SELECT
				new com.ptpm.car4m.dto.response.review.ReviewResponse(
					r.rental.user.id,
					r.rental.user.username,
					r.rental.user.image,
					r.description,
					r.vote
				)
			FROM Review r
			WHERE r.rental.car.id = :carId""")
	List<ReviewResponse> findByCarId(@Param("carId") Long carId);
	
	Optional<Review> findByRentalId(long rentalId);
}