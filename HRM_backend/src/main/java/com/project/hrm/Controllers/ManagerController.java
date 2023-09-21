package com.project.hrm.Controllers;

import com.project.hrm.Configs.URLConfigs;
import com.project.hrm.Models.*;
import com.project.hrm.Utils.LoginRequired;
import com.project.hrm.Utils.RoleRequired;
import com.project.hrm.payloads.Request.ShiftDetailRequest;
import com.project.hrm.payloads.Response.Response;
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
    @PostMapping(URLConfigs.ADD_TYPE)
    public Response addType(@RequestBody Type type) {
        return managerService.addType(type);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @GetMapping(URLConfigs.GET_ALL_TYPE)
    public Response getAllType() {
        return managerService.getAllType();
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PutMapping(URLConfigs.EDIT_TYPE)
    public Response editType(@RequestBody Type type) {
        return managerService.editType(type);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PostMapping(URLConfigs.ADD_SALARY)
    public Response addSalary(@RequestBody Salary salary) {
        return managerService.addSalary(salary);
    }

    //
//    @LoginRequired
//    @GetMapping(URLConfigs.GET_INFO_MANAGER)
//    public Response getInformation(@RequestParam(name = "uid") String uid) {
//        return managerService.getInformation(uid);
//    }
//
//    @LoginRequired
//    @GetMapping(URLConfigs.GET_INFO_STAFF)
//    public Response getStaff(@RequestParam(name = "uid") String uid){
//        return managerService.getStaff(uid);
//    }
//
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PostMapping(URLConfigs.ADD_STAFF)
    public Response addStaff(@RequestBody Staff newStaff) {
        return managerService.addStaff(newStaff);
    }

    //    @LoginRequired
//    @PutMapping(URLConfigs.EDIT_INFO_MANAGER)
//    public Response editProfileInformation(@RequestBody Manager managerNewInfo){
//        return managerService.editProfileInformation(managerNewInfo);
//    }
//    @LoginRequired
//    @GetMapping(URLConfigs.GET_ALL_STAFF)
//    public ResponseWithData<List<Staff>> getAllStaff(){
//        return managerService.getAllStaff();
//    }
//
//
//    @LoginRequired
//    @PutMapping(URLConfigs.CHANGE_PASSWORD)
//    public Response changePassword(@RequestParam String password, @PathVariable String uid){
//        return managerService.changePassword(password,uid);
//
//    }
//
//
//    @PutMapping(URLConfigs.CHANGE_AVATAR)
//    public Response changeAvatar(@RequestBody Map<String, String> requestBody, @PathVariable String uid) {
//        String newUrl = requestBody.get("urlAvatar");  // Lấy giá trị của trường urlAvatar ra và gọi phương thức dịch vụ:
//        return managerService.changeAvatar(newUrl, uid);
//    }
//
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PutMapping(URLConfigs.EDIT_STAFF)
    public Response editStaff(@RequestBody Staff newStaff) {
        return managerService.editStaff(newStaff);
    }

    //    @DeleteMapping(URLConfigs.DELETE_STAFF)
//    public  Response deleteStaff(@PathVariable String uid){
//        return managerService.deleteStaff(uid);
//    }
//
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @GetMapping(URLConfigs.SEARCH_STAFF)
    public Response searchStaffByFullName(@RequestParam String fullName) {
        return managerService.searchStaffByFullName(fullName);
    }

    //
//
//    @PutMapping(URLConfigs.EDIT_ROLE)
//    public Response editRole(@RequestBody Role role){
//        return managerService.editRole(role);
//    }
//
    @DeleteMapping(URLConfigs.DELETE_TYPE)
    public Response deleteType(@RequestBody Type type) {
        return managerService.deleteType(type);
    }

    //
//    @DeleteMapping(URLConfigs.DELETE_SALARY)
//    public Response deleteSalary(@RequestBody Salary salary){
//        return managerService.deleteSalary(salary);
//    }
//

//    @GetMapping(URLConfigs.GET_ALL_SALARY)
//    public ResponseWithData<List<Salary>> getAllSalary() {
//        return managerService.getAllSalary();
//    }
//
//    @LoginRequired
//    @PutMapping(URLConfigs.EDIT_SALARY)
//    public Response editSalary(@RequestBody Salary salary) {
//        return managerService.editSalary(salary);
//    }
//
//    @LoginRequired
//    @PostMapping(URLConfigs.DELETE_SALARY)
//    public Response deleteSalary(@RequestBody Salary salary) {
//        return managerService.deleteSalary(salary);
//    }
//
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PostMapping(URLConfigs.ADD_SHIFT_TYPE)
    public Response addShiftType(@RequestBody ShiftType shiftType) {
        return managerService.addShiftType(shiftType);
    }
//
    @LoginRequired
    @GetMapping(URLConfigs.GET_ALL_SHIFT_TYPE)
    public Response getAllShiftType() {
        return managerService.getAllShiftType();
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PutMapping(URLConfigs.EDIT_SHIFT_TYPE)
    public Response editShiftType(@RequestBody ShiftType shiftType) {
        return managerService.editShiftType(shiftType);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @DeleteMapping (URLConfigs.DELETE_SHIFT_TYPE)
    public Response deleteShiftType(@RequestBody ShiftType shiftType) {
        return managerService.deleteShiftType(shiftType);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PostMapping (URLConfigs.ADD_SHIFT)
    public Response addShift(@RequestBody Shift shift) {
        return managerService.addShift(shift);
    }
//
//    @LoginRequired
//    @RoleRequired(value = {"Quản lý"})
//    @PostMapping (URLConfigs.SCHEDULE)
//    public Response schedule(@RequestBody ShiftDetailRequest shiftDetailRequest) {
//        return managerService.schedule(shiftDetailRequest);
//    }
    }
