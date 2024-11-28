package com.ptpm.car4m.service;


import com.ptpm.car4m.dto.request.review.ReviewRequest;
import com.ptpm.car4m.dto.response.review.ReviewResponse;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface ReviewService {
	
	void createReview(Jwt principal, ReviewRequest request);
	
	List<ReviewResponse> getReviewByCar(Long carId);
	
}
