package com.project.hrm.Controllers;

import com.project.hrm.Configs.URLConfigs;
import com.project.hrm.DTOs.Response.Response;
import com.project.hrm.Services.ServiceImplements.AuthServiceImpl;
import com.project.hrm.Utils.LoginRequired;
import com.project.hrm.Utils.RoleRequired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = URLConfigs.AUTH_SERVICE_URL)
public class AuthController {
    @Autowired
    private AuthServiceImpl authService;
    @PostMapping(URLConfigs.REGISTER)
    public Response Register(@RequestParam String username, @RequestParam String password) {
        return authService.Register(username, password);
    }
    @PostMapping(URLConfigs.LOGIN)
    public ResponseEntity Login(@RequestParam String username, @RequestParam String password) {
        return authService.Login(username, password);
    }


    @LoginRequired
    @GetMapping (URLConfigs.LOGOUT)
    public ResponseEntity Logout() {
        return authService.Logout();
    }
    @LoginRequired
    @RoleRequired(value = {"Quản Lý"})
    @GetMapping("/test")
    public String testCookie() {
        return authService.testCookie();
    }
}
