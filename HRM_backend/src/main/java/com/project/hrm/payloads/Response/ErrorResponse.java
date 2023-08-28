package com.project.hrm.payloads.Response;

import org.springframework.http.HttpStatus;

public class ErrorResponse extends Response{
    public ErrorResponse(HttpStatus status, String errorMessage) {
        super(status, errorMessage);
    }

}
