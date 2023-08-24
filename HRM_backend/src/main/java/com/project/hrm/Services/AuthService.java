package com.project.hrm.Services;

import com.project.hrm.DTOs.Response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

public interface AuthService {
    public Response Register(String username, String password);
    public ResponseEntity Login(String username, String password);
    public ResponseEntity Logout();
    public Response RfToken();
    public String testCookie();
}
