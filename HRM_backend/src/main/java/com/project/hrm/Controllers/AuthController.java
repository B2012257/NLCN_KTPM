package com.project.hrm.Controllers;

import com.project.hrm.Configs.URLConfigs;
import com.project.hrm.Models.Staff;
import com.project.hrm.payloads.Response.Response;
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
    public Response Register(@RequestBody Staff staff) {
        return authService.Register(staff);
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
}
