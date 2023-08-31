package com.project.hrm.Configs;

import org.springframework.context.annotation.Configuration;

@Configuration
public class URLConfigs {
    //#BASE URL

    //Chức năng của quản lý
    public static final String MANAGER_SERVICE_URL = "/api/v1/manager";

    //Chức năng của nhân sự
    public static final String STAFF_SERVICE_URL = "/api/v1/staff";

    //Chức năng của xác thực
    public static final String AUTH_SERVICE_URL = "/api/v1/auth";

    //  #MAIN URL

    // Chức năng xác thực
    public static final String REGISTER = "/register";
    public static final String LOGIN = "/login";
    public static final String LOGOUT = "/logout";
    public static final String REFRESH_TOKEN = "/rf";

    //Chức năng quản lý
    public static final String ADD_ROLE = "/addRole";
    public static final String GET_ALL_ROLE = "/roles";
    public static final String GET_INFO_MANAGER ="/infoManager";
    public static final String EDIT_INFO_MANAGER ="/edit";
    public static final String GET_INFO_STAFF ="/infoStaff";
    public static final String ADD_STAFF ="/addStaff";
    public static final String GET_ALL_STAFF ="/allStaff";
    public static final String ADD_SALARY = "/addSalary";
    public static final String GET_ALL_SALARY = "/salaries";
    public static final String EDIT_SALARY = "/editSalary";
    public static final String DELETE_SALARY = "/deleteSalary";

}
