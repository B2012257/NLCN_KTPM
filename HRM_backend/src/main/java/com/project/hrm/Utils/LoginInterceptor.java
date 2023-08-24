package com.project.hrm.Utils;

import com.project.hrm.Exceptions.UnauthorizeException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Autowired
    JwtUntil jwtTokenUtil;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("IsLoginInterceptor preHandle is calling");

        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            LoginRequired loginRequired = handlerMethod.getMethodAnnotation(LoginRequired.class);

            if (loginRequired != null) {
                String token = getTokenFromCookie(request);
                System.out.println("Token lay tu request: " + token);
                Boolean isTrue = jwtTokenUtil.validateToken(token);
                System.out.println("Xac thuc token lay tu request: " + isTrue);

                if (isTrue) {
                    return true;
                }
                throw new UnauthorizeException("Vui lòng đăng nhập");
            }
            return true;
        }return true;
    }
    private String getTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        //Nếu có tồn tại cookie trong header request
        if (cookies != null) {
            //Lập qua các cookies
            for (Cookie cookie : cookies) {
                //Nếu có cookie tên là Authentication
                if (cookie.getName().equals("Authentication")) {
                    //Lấy ra giá trị của nó
                    String cookieValue = cookie.getValue();
                    System.out.println("Xem cookie "+ cookieValue);
                    //Trả về
                    return cookieValue;
                }
            }
        }
        return "None";
    }
}
