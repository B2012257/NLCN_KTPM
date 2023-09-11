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
    public static final String EDIT_ROLE = "/role/edit";
    public static final String DELETE_ROLE = "/role/delete";



    public static final String GET_ALL_ROLE = "/roles";
    public static final String GET_INFO_MANAGER ="/infoManager";

    public static final String EDIT_INFO_MANAGER ="/edit";

    public static final String GET_INFO_STAFF ="/infoStaff";
    public static final String ADD_STAFF ="/addStaff";
    public static final String GET_ALL_STAFF ="/allStaff";
    public static final String ADD_SHIFTTYPE ="/addShiftType";
    public static final String GET_ALL_SHIFTTYPE ="/allShiftType";
    public static final String EDIT_SHIFTTYPE ="/ShiftType/edit";
    public static final String DELETE_SHIFTTYPE ="/shiftType/delete";
    public static final String ADD_SHIFT = "/addShift";
    public static final String DELETE_SHIFT = "/shift/delete";
    public static final String EDIT_SHIFT = "/shift/edit";

    public static final String ADD_SHIFTDETAIL = "/addShiftDetail";
    public static final String DELETE_SHIFTDETAIL = "/shiftDetail/delete";



    public static final String GET_ALL_SHIFTDETAIL ="/allShiftDetail";


    public static final String CHANGE_PASSWORD ="/changePassword/{uid}";
    public static final String CHANGE_AVATAR ="/changeAvatar/{uid}";
    public static final String EDIT_STAFF ="/editStaff";
    public static final String DELETE_STAFF ="/staff/{uid}";
    public static final String SEARCH_STAFF ="/search/staff";




    public static final String ADD_SALARY = "/addSalary";
    public static final String DELETE_SALARY = "/salary/delete";

    public static final String GET_ALL_SALARY = "/salaries";
    public static final String EDIT_SALARY = "/editSalary";

}
