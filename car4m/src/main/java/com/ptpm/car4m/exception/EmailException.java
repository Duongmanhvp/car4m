package com.ptpm.car4m.exception;

public class EmailException extends RuntimeException {
    public EmailException(String otpServiceUnavailable, Exception e) {
        super(otpServiceUnavailable, e);
    }

    public EmailException(String message) {
        super(message);
    }
}
