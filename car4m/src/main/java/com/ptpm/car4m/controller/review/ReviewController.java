package com.ptpm.car4m.controller.review;

import com.ptpm.car4m.dto.request.review.ReviewRequest;
import com.ptpm.car4m.dto.response.ApiResponse;
import com.ptpm.car4m.dto.response.review.ReviewResponse;
import com.ptpm.car4m.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("v1/reviews")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ReviewController {
   
   final ReviewService reviewService;
   
   @PostMapping("/")
   public ApiResponse<Void> createReview(
         @AuthenticationPrincipal Jwt principal,
         @RequestBody ReviewRequest request) {
      reviewService.createReview(principal,request);
      return ApiResponse.ok("Cảm ơn bạn đã đánh giá dịch vụ của chúng tôi");
   }
   
   @GetMapping("/car/{carId}")
   public ApiResponse<List<ReviewResponse>> getReviewByCar(@PathVariable Long carId) {
      return ApiResponse.success(reviewService.getReviewByCar(carId));
   }
   
}
