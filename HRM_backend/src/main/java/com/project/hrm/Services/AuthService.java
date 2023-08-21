package com.project.hrm.Services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;

public interface AuthService {
    public ResponseEntity Register();
    public ResponseEntity Login();
    public ResponseEntity Logout();
    public ResponseEntity RfToken();

}
