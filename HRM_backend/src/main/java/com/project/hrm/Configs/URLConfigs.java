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

    //Chức năng nhân viên
    public static final String GET_INFO_STA="/info";

    public static final String EDIT_STAFF="/editStaff";

    public static final String CHANGE_PASSWORD_STAFF="/changePass";

    public static final String CHANGE_AVATAR_STAFF="/changeAvatar";

    public static final String GET_ALL_SCHEDULE_BETWEEN="/getAllSchedule";

    public static final String REGISTER_SCHEDULE="/registerSchedule";

    public static final String EDIT_REGISTER_SCHEDULE="/editRegister";

    //Chức năng quản lý
    public static final String ADD_ROLE = "/addRole";
    public static final String EDIT_ROLE = "/editRole";

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

    public static final String ADD_SHIFT = "/addShift";

    public static final String ADD_SHIFT_TYPE = "/addShiftType";
    public static final String GET_ALL_SHIFT_TYPE = "/allShiftType";
    public static final String EDIT_SHIFT_TYPE = "/editShiftType";
    public static final String DELETE_SHIFT_TYPE = "/deleteShiftType";

    public static final String SCHEDULE = "/schedule";


}
