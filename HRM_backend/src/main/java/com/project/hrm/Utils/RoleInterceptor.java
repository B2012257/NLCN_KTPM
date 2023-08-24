package com.project.hrm.Utils;

import com.project.hrm.Exceptions.AuthenticationException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;

@Component
public class RoleInterceptor implements HandlerInterceptor {
    @Autowired
    JwtUntil jwtTokenUtil;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("RoleInterceptor preHandle is calling");

        //Kiểm tra có hàm xử lí controller tương ứng cho yêu cầu gữi lên từ client hay không
        if (handler instanceof HandlerMethod) {
            //Lấy handler đó ra và ép kiểu thành HandlerMethor
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            //Kiểm tra phương thức xử lí đó có được chú thích bới 1 chú thích tên RoleRequired không
            RoleRequired roleRequired = handlerMethod.getMethodAnnotation(RoleRequired.class);
            //Nếu có chú thích thì kiểm tra quyền yêu cầu
            if (roleRequired != null) {
                // Lấy ra role cần cos để được phép truy cập
                String[] requiredRoles = roleRequired.value();
                String token = getTokenFromCookie(request); //Lấy token từ cookie request
                String userRole = jwtTokenUtil.getRoleFromToken(token);  //Dùng jwt until giải mã token ra để tìm role
                System.out.println(userRole);
                //Nếu đúng role mới được truy cập (đáp ứng 1 trong các role là được)
                if (!Arrays.asList(requiredRoles).contains(userRole)) {

                    throw new AuthenticationException("Bạn không có quyền truy cập tính năng này");
                }
            }
        }
        return true;
    }

    private String getTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("Authentication")) {
                    String cookieValue = cookie.getValue();
                    // Xử lý giá trị của cookie
                    return cookieValue;
                }
            }
        }
        return "None";
    }
}
