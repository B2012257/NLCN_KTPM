package com.project.hrm.Controllers;


import com.project.hrm.Configs.URLConfigs;
import com.project.hrm.Models.Staff;
import com.project.hrm.Services.ServiceImplements.StaffServiceImpl;

import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = URLConfigs.STAFF_SERVICE_URL)
public class StaffController {
    @Autowired

    private StaffServiceImpl staffService;

    @GetMapping("/info/{Uid}")
    public ResponseWithData<Staff> getInformation(@PathVariable String Uid){
        Staff staff = new Staff();
        staff.setUid(Uid);
        return staffService.getInformation(staff);
    }


    @PutMapping ("/edit")
    public Response editProfileInformation(@RequestBody Staff newStaffInfo){
        return staffService.editProfileInfomation(newStaffInfo);
    }


    @PutMapping("/changePass/{Uid}")
    public Response changePassword(@RequestBody String newPassword,@PathVariable String Uid ){
        return staffService.changePassword(newPassword,Uid);
    }

    @PutMapping("/changeAvatar/{Uid}")
    public Response changeAvatar(@RequestBody String newUrl,@PathVariable String Uid ){
        return staffService.changeAvatar(newUrl,Uid);
    }





}
