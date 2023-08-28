package com.project.hrm.Controllers;

import com.project.hrm.Configs.URLConfigs;
import com.project.hrm.Models.Manager;
import com.project.hrm.Models.Staff;
import com.project.hrm.Utils.LoginRequired;
import com.project.hrm.Utils.RoleRequired;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.Models.Role;
import com.project.hrm.Services.ServiceImplements.ManagerServiceImpl;
import com.project.hrm.payloads.Response.ResponseWithData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = URLConfigs.MANAGER_SERVICE_URL)
public class ManagerController {
    @Autowired
    ManagerServiceImpl managerService;


    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PostMapping(URLConfigs.ADD_ROLE)
    public Response addRole(@RequestBody Role role) {
        return managerService.addRole(role);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @GetMapping(URLConfigs.GET_ALL_ROLE)
    public ResponseWithData<List<Role>> getAllRole() {
        return managerService.getAllRole();
    }

    @LoginRequired
    @GetMapping(URLConfigs.GET_INFO_MANAGER)
    public Response getInformation(@RequestParam(name = "uid") String uid){
        return managerService.getInformation(uid);
    }

    @LoginRequired
    @GetMapping(URLConfigs.GET_INFO_STAFF)
    public Response getStaff(@RequestParam(name = "uid") String uid){
        return managerService.getStaff(uid);
    }

    @LoginRequired
    @PostMapping(URLConfigs.ADD_STAFF)
    public Response addStaff(@RequestBody Staff newStaff){
        System.out.println("Tín chó"+ newStaff);
            return managerService.addStaff(newStaff);
    }
}
