package com.project.hrm.DTOs.Response;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Data
public class LoginResponse<T> extends Response {
    private T data;

    public LoginResponse(T data, HttpStatus status, String message) {
        super(status, message);
        this.data = data;
    }
}
