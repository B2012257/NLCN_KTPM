package com.project.hrm.DTOs.Response;

import org.springframework.http.HttpStatus;

public class ErrorResponse extends Response{
    public ErrorResponse(HttpStatus status, String errorMessage) {
        super(status, errorMessage);
    }

}
