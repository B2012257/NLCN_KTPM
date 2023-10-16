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

    public static final String CHANGE_PASSWORD_STAFF="/changePass/{uid}";

    public static final String CHANGE_AVATAR_STAFF="/changeAvatar/{uid}";

    public static final String GET_ALL_SCHEDULE_BETWEEN="/getAllSchedule";

    public static final String REGISTER_SCHEDULE="/registerSchedule";

    public static final String EDIT_REGISTER_SCHEDULE="/editRegister";

    //Chức năng quản lý
    public static final String ADD_TYPE = "/addType";
    public static final String GET_ALL_TYPE = "/types";
    public static final String EDIT_TYPE = "/editType";
    public static final String DELETE_TYPE = "/deleteType";


    public static final String GET_INFO_MANAGER ="/infoManager";

    public static final String EDIT_INFO_MANAGER ="/edit";

    public static final String GET_INFO_STAFF ="/infoStaff";
    public static final String ADD_STAFF ="/addStaff";
    public static final String DELETE_STAFF ="/deleteStaff/{uid}";
    public static final String SEARCH_STAFF = "/search/staff";

    public static final String GET_ALL_STAFF ="/allStaff";
    public static final String GET_RECENT_STAFF ="/staff/recent";

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
    public static final String DELETE_SCHEDULE = "/schedule/delete";
    public static final String GET_ALL_SCHEDULE_BY_DATE = "/getScheduleOfDate";


    public static final String GET_ALL_SCHEDULE_BY_SHIFT_BY_DATE="/getScheduleOfShiftOfDate";
    public static final String GET_ALL_FREE_TIME_SCHEDULED_BY_SHIFT_TYPE_BY_DATE="/getFreeTimeNotScheduled";


    public static final String WORK_CHECKED="/workCheckeds";

}
