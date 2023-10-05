package com.project.hrm.Controllers;


import com.project.hrm.Configs.URLConfigs;
import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.Staff;
import com.project.hrm.Models.WorkRegister;
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

//    @LoginRequired

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
    public Response registerSchedule(@RequestBody WorkRegister newWorkRegister){
        return staffService.registerSchedule(newWorkRegister);
    }


    @LoginRequired

    @PutMapping(URLConfigs.EDIT_REGISTER_SCHEDULE)
    public Response editRegisterSchedule(@RequestBody List<WorkRegister> workRegisters){
        return staffService.editRegisterSchedule(workRegisters);

    }


}
