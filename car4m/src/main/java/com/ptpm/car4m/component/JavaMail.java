package com.ptpm.car4m.component;

import com.ptpm.car4m.exception.EmailException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class JavaMail {
	
	@Value("${spring.mail.username}")
	private String USER_NAME;
	
	final JavaMailSender mailSender;
	
	@Async
	public void sendDefaultPassword(String to, String password) {
		
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setSubject("Car4M System Password");
			message.setText("Your new password is: " + password);
			mailSender.send(message);
		} catch (Exception e) {
			throw new EmailException("Email service unavailable", e);
		}
	}
	
}
