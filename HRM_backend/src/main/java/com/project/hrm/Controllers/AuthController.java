package com.project.hrm.Controllers;

import com.project.hrm.Configs.URLConfigs;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(path = URLConfigs.AUTH_SERVICE_URL)
public class AuthController {
    @PostMapping(URLConfigs.REGISTER)
    public Object getAllUser() {
        return new String("");
    }
}
