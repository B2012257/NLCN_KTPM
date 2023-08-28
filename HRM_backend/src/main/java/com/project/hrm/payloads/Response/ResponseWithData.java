package com.project.hrm.payloads.Response;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ResponseWithData<T> extends Response {
    private T data;

    public ResponseWithData(T data, HttpStatus status, String message) {
        super(status, message);
        this.data = data;
    }
}
