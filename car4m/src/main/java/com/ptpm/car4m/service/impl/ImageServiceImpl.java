package com.ptpm.car4m.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ptpm.car4m.exception.UploadException;
import com.ptpm.car4m.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ImageServiceImpl implements ImageService {
	
	Cloudinary cloudinary;
	
	@Override
	public String uploadImage(MultipartFile file)  {
		try {
			assert file.getOriginalFilename() != null;
			String publicValue = generatePublicValue(file.getOriginalFilename());
			log.info("publicValue is: {}", publicValue);
			
			String extension = getFileName(file.getOriginalFilename())[1];
			log.info("extension is: {}", extension);
			
			File fileUpload = convert(file);
			log.info("fileUpload is: {}", fileUpload);
			
			cloudinary.uploader().upload(fileUpload, ObjectUtils.asMap("public_id", publicValue));
			
			cleanDisk(fileUpload);
			
			String url = cloudinary.url().generate(StringUtils.join(publicValue, ".", extension));
			return StringUtils.join(publicValue, ".", extension);
		} catch (Exception e) {
			throw new UploadException("Upload image failed");
		}
	}
	
	private File convert(MultipartFile file) throws IOException {
		assert file.getOriginalFilename() != null;
		File convFile = new File(StringUtils.join(generatePublicValue(file.getOriginalFilename()), getFileName(file.getOriginalFilename())[1]));
		try(InputStream is = file.getInputStream()) {
			Files.copy(is, convFile.toPath());
		}
		return convFile;
	}
	
	private void cleanDisk(File file) {
		try {
			log.info("file.toPath(): {}", file.toPath());
			Path filePath = file.toPath();
			Files.delete(filePath);
		} catch (IOException e) {
			log.error("Error");
		}
	}
	
	public String generatePublicValue(String originalName){
		String fileName = getFileName(originalName)[0];
		return StringUtils.join(UUID.randomUUID().toString(), "-", fileName);
	}
	
	public String[] getFileName(String originalName) {
		return originalName.split("\\.");
	}
	
}