package com.ptpm.car4m.controller.image;


import com.ptpm.car4m.dto.request.user.UserCreationRequest;
import com.ptpm.car4m.dto.response.ApiResponse;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;
import com.ptpm.car4m.service.ImageService;
import com.ptpm.car4m.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/images")
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class ImageController {
	
	final ImageService imageService;
	
	@PostMapping("/")
	public ApiResponse<String> uploadImage(@RequestParam("file") MultipartFile file) {
		return ApiResponse.success(imageService.uploadImage(file));
	}
}
