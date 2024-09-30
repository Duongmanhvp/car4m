package com.ptpm.car4m.exception;


import com.ptpm.car4m.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> notFoundException(NotFoundException ex) {
        log.error("NotFoundException: ", ex);
        return new ResponseEntity<>(ApiResponse.error(ex.getMessage()), HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Void>> alreadyExistsException(AlreadyExistsException ex) {
        log.error("AlreadyExistsException: ", ex);
        return new ResponseEntity<>(ApiResponse.error(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(AuthenticatedException.class)
    public ResponseEntity<ApiResponse<Void>> authenticateException(AuthenticatedException ex) {
        log.error("NotAuthenticateException: ", ex);
        return new ResponseEntity<>(ApiResponse.error(ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }
   
}
