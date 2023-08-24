package com.project.hrm.Exceptions;

public class UnauthorizeException extends RuntimeException{
    public UnauthorizeException(String message) {
        super(message);
    }
}
