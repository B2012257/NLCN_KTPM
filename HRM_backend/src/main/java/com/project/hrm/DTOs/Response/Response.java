package com.project.hrm.DTOs.Response;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class Response {
    private HttpStatus status;
    private String message;

    public Response() {}
    public Response(HttpStatus status, String message) {
        this.status =  status;
        this.message = message;
    }
}
