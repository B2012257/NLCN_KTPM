package com.project.hrm.Exceptions;

import com.project.hrm.payloads.Response.ErrorResponse;
import com.project.hrm.payloads.Response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@ControllerAdvice //Đặt lớp này là lớp xử lí ngoại lệ toàn cục cua dự án
public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UnauthorizeException.class) //Match với UnauthorizeException,
    // khi UnauthorizeException được nép ra thì hàm handle sẽ được gọi và nhận vào 1 thể hiện của UnauthorizeException
    protected Response handleForbiddenAccessException(UnauthorizeException ex) {
        //Lấy tin nhắn lỗi
        System.out.println("1");
        String errorMessage = ex.getMessage();
        // Xây dựng đối tượng ErrorResponse chứa thông báo lỗi
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED, errorMessage);
        return errorResponse;
    }

    @ExceptionHandler(AuthorizationException.class) //Match với lớp AuthorizationException
    protected Response handleAuthenticationException(AuthorizationException ex) {
        String errorMessage = ex.getMessage();
        // Xây dựng đối tượng ErrorResponse chứa thông báo lỗi
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, errorMessage);
        return errorResponse;
    }
}
