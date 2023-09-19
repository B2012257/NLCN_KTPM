package com.project.hrm.Services;

import com.project.hrm.Models.Staff;
import com.project.hrm.payloads.Response.Response;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public Response Register(Staff staff);
    public ResponseEntity Login(String username, String password);
    public ResponseEntity Logout();
    public Response RfToken();
}
