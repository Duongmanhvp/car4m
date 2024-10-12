package com.ptpm.car4m.exception;

public class SQLIntegrityConstraintViolationException extends RuntimeException{
    public SQLIntegrityConstraintViolationException(String message) {
        super(message);
    }
}
