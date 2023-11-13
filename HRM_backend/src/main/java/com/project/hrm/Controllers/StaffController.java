package com.project.hrm.Controllers;


import com.project.hrm.Configs.URLConfigs;
import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.Staff;
import com.project.hrm.Models.FreeTime;
import com.project.hrm.Services.ServiceImplements.StaffServiceImpl;

import com.project.hrm.Utils.LoginRequired;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = URLConfigs.STAFF_SERVICE_URL)
public class StaffController {
    @Autowired

    private StaffServiceImpl staffService;

    @LoginRequired
    @GetMapping(URLConfigs.GET_INFO_STA)
    public ResponseWithData<Staff> getInformation(@RequestParam(name = "Uid") String Uid){
        return staffService.getInformation(Uid);
    }

    @LoginRequired

    @PutMapping (URLConfigs.EDIT_STAFF)
    public Response editProfileInformation(@RequestBody Staff newStaffInfo){
        return staffService.editProfileInformation(newStaffInfo);
    }


    @LoginRequired

    @PutMapping(URLConfigs.CHANGE_PASSWORD_STAFF)
    public Response changePassword(@RequestParam("newPass") String newPassword,@RequestParam(name = "Uid") String Uid ){
        return staffService.changePassword(newPassword,Uid);
    }

    @LoginRequired

    @PutMapping(URLConfigs.CHANGE_AVATAR_STAFF)
    public Response changeAvatar(@RequestParam(name = "newAvatar") String newUrl,@RequestParam(name = "Uid") String Uid ){
        return staffService.changeAvatar(newUrl,Uid);
    }


    @LoginRequired

    @GetMapping(URLConfigs.GET_ALL_SCHEDULE_BETWEEN)
    public ResponseWithData<List<ShiftDetail>> getAllMyScheduleBetweenStartAndEnd(@RequestParam("start") Date start, @RequestParam("end") Date end){
        return staffService.getAllMyScheduleBetweenStartAndEnd(start,end);
    }



    @LoginRequired
    @PostMapping(URLConfigs.REGISTER_SCHEDULE)
    public Response registerSchedule(@RequestBody FreeTime newFreeTime){
        return staffService.registerSchedule(newFreeTime);
    }



    @LoginRequired
    @PutMapping(URLConfigs.EDIT_REGISTER_SCHEDULE)
    public Response editRegisterSchedule(@RequestBody List<FreeTime> freeTimes){
        return staffService.editRegisterSchedule(freeTimes);

    }

    @LoginRequired
    @GetMapping(URLConfigs.GET_ALL_SHIFT_TYPE)
    public Response getAllShiftType() {
        return staffService.getAllShiftType();
    }


    @LoginRequired
    @GetMapping(URLConfigs.GET_SCHEDULE_OF_STAFF_IN_TIMEKEEPING)
    public Response getAllScheduleOfStaffInTimeKeeping(@RequestParam("date") Date date, @RequestParam("Uid") String Uid){
        return staffService.getAllScheduleOfStaffInTimeKeeping(date,Uid);
    }



    @LoginRequired
    @GetMapping(URLConfigs.GET_SCHEDULE_OF_STAFF_NOT_IN_TIMEKEEPING)
    public Response getAllScheduleOfStaffNotInTimeKeeping(@RequestParam("date") Date date, @RequestParam("Uid") String Uid){
        return staffService.getAllScheduleOfStaffNotInTimeKeeping(date,Uid);
    }

    @LoginRequired
    @GetMapping(URLConfigs.GET_ALL_TIMEKEEPING)
    public Response getAllTimeKeeping(@RequestParam("start") Date start, @RequestParam("end") Date end, @RequestParam("Uid") String Uid){
        return staffService.getAllTimeKeeping(start,end,Uid);
    }


    @LoginRequired
    @GetMapping(URLConfigs.GET_FREE_TIME_OF_STAFF_IN_DATE)
    public Response getFreeTimeOfStaffInDate(@RequestParam("date") Date date,@RequestParam("staff") Staff staff){
        return staffService.getFreeTimeOfStaffInDate(date,staff);
    }


    @LoginRequired
    @DeleteMapping(URLConfigs.DELETE_FREE_TIME)
    public Response deleteFreeTime(@RequestBody FreeTime freeTime){
        return staffService.deleteFreeTime(freeTime);
    }



    //@LoginRequired
    @GetMapping(URLConfigs.GET_ALL_NOT_TIMEKEEPING_START_AND_END)
    public Response getAllNotTimeKeepingStartAndEnd(@RequestParam("start") Date start, @RequestParam("end") Date end, @RequestParam("Uid") String Uid){
        return staffService.getAllNotTimeKeepingStartAndEnd(start,end,Uid);
    }
}
