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
import java.util.Map;

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


//    @LoginRequired
//    @GetMapping(URLConfigs.GET_INFO_MANAGER)
//    public Response getInformation(@RequestParam(name = "uid") String uid) {
//        return managerService.getInformation(uid);
//    }

    @LoginRequired
    @GetMapping(URLConfigs.GET_INFO_STAFF)
    public Response getStaff(@RequestParam(name = "uid") String uid){
        return managerService.getStaff(uid);
    }

    @LoginRequired
    @GetMapping(URLConfigs.GET_RECENT_STAFF)
    public Response getRecentStaff(@RequestParam java.util.Date start, @RequestParam java.util.Date end){
        return managerService.getRecentStaff(start, end);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PostMapping(URLConfigs.ADD_STAFF)
    public Response addStaff(@RequestBody Staff newStaff) {
        return managerService.addStaff(newStaff);
    }

//        @LoginRequired
//    @PutMapping(URLConfigs.EDIT_INFO_MANAGER)
//    public Response editProfileInformation(@RequestBody Staff managerNewInfo){
//        return managerService.editProfileInformation(managerNewInfo);
//    }
    @LoginRequired
    @GetMapping(URLConfigs.GET_ALL_STAFF)
    public Response getAllStaff(){
        return managerService.getAllStaff();
    }

    @LoginRequired
    @GetMapping(URLConfigs.GET_ALL_SCHEDULE_BETWEEN)
    public Response getAllMyScheduleBetweenStartAndEnd(@RequestParam java.util.Date startDay, @RequestParam java.util.Date endDay){
        return managerService.getAllMyScheduleBetweenStartAndEnd(startDay, endDay);
    }

//    @LoginRequired
//    @PutMapping(URLConfigs.CHANGE_PASSWORD_STAFF)
//    public Response changePassword(@PathVariable String uid, @RequestParam String newPassword){
//        return managerService.changePassword(newPassword,uid);
//
//    }


//    @PutMapping(URLConfigs.CHANGE_AVATAR_STAFF)
//    public Response changeAvatar(@RequestParam String urlAvatar, @PathVariable String uid) {
////        String newUrl = requestBody.get("urlAvatar");  // Lấy giá trị của trường urlAvatar ra và gọi phương thức dịch vụ:
//        return managerService.changeAvatar(urlAvatar, uid);
//    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PutMapping(URLConfigs.EDIT_STAFF)
    public Response editStaff(@RequestBody Staff newStaff) {
        return managerService.editStaff(newStaff);
    }

    @DeleteMapping(URLConfigs.DELETE_STAFF)
    public  Response deleteStaff(@PathVariable String uid){
        return managerService.deleteStaff(uid);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @GetMapping(URLConfigs.SEARCH_STAFF)
    public Response searchStaffByPartialName(@RequestParam String partialName) {
        return managerService.searchStaffByPartialName(partialName);
    }

    //
//
//    @PutMapping(URLConfigs.EDIT_ROLE)
//    public Response editRole(@RequestBody Role role){
//        return managerService.editRole(role);
//    }
//
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @DeleteMapping(URLConfigs.DELETE_TYPE)
    public Response deleteType(@RequestBody Type type) {
        return managerService.deleteType(type);
    }

    //
    @DeleteMapping(URLConfigs.DELETE_SALARY)
    public Response deleteSalary(@RequestBody Salary salary){
        return managerService.deleteSalary(salary);
    }
//
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @GetMapping(URLConfigs.GET_ALL_SALARY)
    public ResponseWithData<List<Salary>> getAllSalary() {
        return managerService.getAllSalary();
    }

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
    @DeleteMapping(URLConfigs.DELETE_SHIFT_TYPE)
    public Response deleteShiftType(@RequestBody ShiftType shiftType) {
        return managerService.deleteShiftType(shiftType);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PostMapping(URLConfigs.ADD_SHIFT)
    public Response addShift(@RequestBody Shift shift) {
        return managerService.addShift(shift);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @PostMapping(URLConfigs.SCHEDULE)
    public Response schedule(@RequestBody ShiftDetailRequest shiftDetailRequest) {
        return managerService.schedule(shiftDetailRequest);
    }

    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @DeleteMapping (URLConfigs.DELETE_SHIFT)
    public Response deleteShift(@RequestParam Integer id) {
        return managerService.deleteShift(id);
    }
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @DeleteMapping (URLConfigs.DELETE_SCHEDULE)
    public Response deleteSchedule(@RequestBody List<ShiftDetail> shiftDetails) {
        return managerService.deleteSchedule(shiftDetails);
    }
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @GetMapping (URLConfigs.GET_ALL_SCHEDULE_BY_DATE)
    public Response getAllSchedulesOfDay(@RequestParam Date date) {
        return managerService.getAllSchedulesOfDay(date);
    }

    //Lấy danh scáh nhân sự làm trong 1 ca trong 1 ngày
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @GetMapping(URLConfigs.GET_ALL_SCHEDULE_BY_SHIFT_BY_DATE)
    public Response getAllSchedulesOfShiftOfDate(@RequestParam("shiftType") ShiftType shiftType, @RequestParam("date") java.util.Date date){
        return managerService.getAllSchedulesOfShiftOfDate(shiftType, date);
    }
    @LoginRequired
    @RoleRequired(value = {"Quản lý"})
    @GetMapping(URLConfigs.GET_ALL_FREE_TIME_SCHEDULED_BY_SHIFT_TYPE_BY_DATE)
    public Response getAllFreeTimeNotScheduledOfShiftTypeAndDate(@RequestParam("shiftType") ShiftType shiftType, @RequestParam("date") java.util.Date date){
        return managerService.getAllFreeTimeNotScheduledOfShiftTypeAndDate(shiftType, date);
    }

    @PostMapping(URLConfigs.WORK_CHECKED)
    public Response workCheckeds(@RequestBody List<Timekeeping> timekeepings){
        return managerService.workCheckeds(timekeepings);
    }
    @GetMapping(URLConfigs.GET_ALL_SCHEDULE_BY_SHIFT_BY_DATE_TIMEKEEPING)
    public Response getAllSchedulesOfShiftOfDateInTimeKeeping(@RequestParam("shiftType") ShiftType shiftType, @RequestParam("date") java.util.Date date){
        return managerService.getAllSchedulesOfShiftOfDateInTimeKeeping(shiftType,date);
    }


    @GetMapping(URLConfigs.GET_ALL_WORK_CHECKED)
    public Response getAllWorkChecked(){
        return managerService.getAllWorkCheckeds();
    }

    @GetMapping(URLConfigs.GET_SCHEDULE_OF_STAFF_IN_TIMEKEEPING_START_END_BY_UID)
    public ResponseWithData<List<Timekeeping>> getAllScheduleOfStaffInTimeKeeping(@RequestParam("start") java.util.Date start, @RequestParam("end") java.util.Date end,@RequestParam(name = "uid") String uid){
        return managerService.getAllScheduleOfStaffInTimeKeeping(start,end,uid);
    }

}
