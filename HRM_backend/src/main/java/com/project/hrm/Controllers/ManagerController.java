package com.project.hrm.Controllers;

import com.project.hrm.Configs.URLConfigs;
import com.project.hrm.Models.*;
import com.project.hrm.Utils.LoginRequired;
import com.project.hrm.Utils.RoleRequired;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.Services.ServiceImplements.ManagerServiceImpl;
import com.project.hrm.payloads.Response.ResponseWithData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

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
            return managerService.addStaff(newStaff);
    }
    @LoginRequired
    @PutMapping(URLConfigs.EDIT_INFO_MANAGER)
    public Response editProfileInformation(@RequestBody Manager managerNewInfo){
        return managerService.editProfileInformation(managerNewInfo);
    }
    @LoginRequired
    @GetMapping(URLConfigs.GET_ALL_STAFF)
    public ResponseWithData<List<Staff>> getAllStaff(){
        return managerService.getAllStaff();
    }

    @LoginRequired
    @PutMapping("/changePassword/{uid}")
    public Response changePassword(@RequestParam String password, @PathVariable String uid){
        return managerService.changePassword(password,uid);

    }


    @PutMapping("/changeAvatar/{uid}")
    public Response changeAvatar(@RequestBody Map<String, String> requestBody, @PathVariable String uid) {
        String newUrl = requestBody.get("urlAvatar");  // Lấy giá trị của trường urlAvatar ra và gọi phương thức dịch vụ:
        return managerService.changeAvatar(newUrl, uid);
    }

    @PutMapping("/editStaff")
    public Response editStaff(@RequestBody Staff newStaff) {
        return managerService.editStaff(newStaff);
    }

    @DeleteMapping("/staff/{uid}")
    public  Response deleteStaff(@PathVariable String uid){
        return managerService.deleteStaff(uid);
    }

    @GetMapping("/search/staff") //Lỗi không tìm thấy dữ liệu bảng staff
    public ResponseWithData<List<Staff>> searchStaffByFullName(@RequestBody String fullName){
        return managerService.searchStaffByFullName(fullName);
    }


    @PutMapping("/role/edit")
    public Response editRole(@RequestBody Role role){
        return managerService.editRole(role);
    }

    @DeleteMapping("/role/delete")
    public Response deleteRole(@RequestBody Role role){
        return managerService.deleteRole(role);
    }

    @DeleteMapping("/salary/delete")
    public Response deleteSalary(@RequestBody Salary salary){
        return managerService.deleteSalary(salary);
    }

    @PostMapping(URLConfigs.ADD_SHIFTTYPE)
    public  Response addShiftType(@RequestBody ShiftType newShiftType){
        return managerService.addShiftType(newShiftType);
    }

    @GetMapping(URLConfigs.GET_ALL_SHIFTTYPE)
    public ResponseWithData<List<ShiftType>> getAllShiftType(){
        return managerService.getAllShiftType();
    }

    @PutMapping(URLConfigs.EDIT_SHIFTTYPE)
    public Response editShiftType(@RequestBody ShiftType shiftType){
        return managerService.editShiftType(shiftType);
    }

    @DeleteMapping("/shiftType/delete")
    public Response deleteShiftType(@RequestBody ShiftType shiftType){
        return managerService.deleteShiftType(shiftType);
    }

    @PostMapping(URLConfigs.ADD_SHIFT)
    public ResponseWithData<Shift> addShift(@RequestBody Shift newShift){
        return managerService.addShift(newShift);
    }
    @DeleteMapping("/shift/delete")
    public Response deleteShift(@RequestBody  Shift shift){
        return managerService.deleteShift(shift);
    }

    @PutMapping("/shift/edit")
    public Response editShift(@RequestBody Shift shift){
        return managerService.editShift(shift);
    }
    @PostMapping(URLConfigs.ADD_SHIFTDETAIL)
    public Response schedule(@RequestBody ShiftDetail shiftDetail){
        return managerService.schedule(shiftDetail);
    }

    @DeleteMapping("/shiftDetail/delete")
    public Response deleteSchedule(@RequestBody ShiftDetail shiftDetail){
        return managerService.deleteSchedule(shiftDetail);
    }

    @GetMapping(URLConfigs.GET_ALL_SHIFTDETAIL)
    public ResponseWithData<List<ShiftDetail>> getAllSchedules(){
        return managerService.getAllSchedules();
    }

    @GetMapping("/getAllSchedulesOfDay/{date}") //Đang lỗi không tìm thấy
    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfDay(@PathVariable  Date date){
        return managerService.getAllSchedulesOfDay(date);
    }
}
