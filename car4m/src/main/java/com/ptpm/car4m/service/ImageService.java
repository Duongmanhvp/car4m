package com.ptpm.car4m.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
	String uploadImage(MultipartFile file) ;
}
