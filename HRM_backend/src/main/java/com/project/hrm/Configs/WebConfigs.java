package com.project.hrm.Configs;


import com.project.hrm.Utils.LoginInterceptor;
import com.project.hrm.Utils.RoleInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class WebConfigs implements WebMvcConfigurer {

//    @Autowired
//    private RoleInterceptor roleInterceptor;

    @Autowired
    private LoginInterceptor loginInterceptor;
    @Autowired
    private RoleInterceptor roleInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //Đăng ký interceptor vào dự án
        registry.addInterceptor(loginInterceptor);
        registry.addInterceptor(roleInterceptor);
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5500")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}

