package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.payloads.Response.ErrorResponse;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.*;
import com.project.hrm.Repositorys.RoleRepository;
import com.project.hrm.Services.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ManagerServiceImpl implements ManagerService {
    @Autowired
    RoleRepository roleRepository;


    @Override
    public ResponseWithData<Manager> getInformation(Manager manager) {
        return null;
    }

    @Override
    public ResponseWithData<Manager> editProfileInformation(Manager managerNewInfo) {
        return null;
    }

    @Override
    public Response changePassword(String newPassword, String uid) {
        return null;
    }

    @Override
    public Response changeAvatar(String newUrl) {
        return null;
    }

    @Override
    public ResponseWithData<Staff> getStaff(String uid) {
        return null;
    }

    @Override
    public ResponseWithData<List<Staff>> getAllStaff() {
        return null;
    }

    @Override
    public Response addStaff(Staff newStaff) {
        return null;
    }

    @Override
    public ResponseWithData<Staff> editStaff(Staff newStaff) {
        return null;
    }

    @Override
    public Response deleteStaff() {
        return null;
    }

    @Override
    public ResponseWithData<List<Staff>> searchStaffByFullName(String fullName) {
        return null;
    }

    @Override
    public Response addRole(Role role) {
        String roleName = role.getName();
        Role roleDB = roleRepository.findByName(roleName);
        //Nếu có tồn tại trong db thì báo lỗi
        if(roleDB != null) {
            return new Response(HttpStatus.CONFLICT, "Chức vụ đã tồn tại trong hệ thống");
        }
        System.out.println(role);
        Role roleSave =  new Role(role.getName(), role.getSalary());

        try {
            Role saved =  roleRepository.saveAndFlush(roleSave);
            return new Response(HttpStatus.OK, "Thêm chức vụ thành công");
        }catch (RuntimeException ex) {
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra trong quá trình thêm chức vụ");
        }

    }

    @Override
    public ResponseWithData<List<Role>> getAllRole() {
        List<Role> roles = roleRepository.findAll();
        return new ResponseWithData<List<Role>>(roles, HttpStatus.OK, "Danh sách chức vụ");
    }

    @Override
    public Response editRole(Role role) {
        return null;
    }

    @Override
    public Response deleteRole(Role role) {
        return null;
    }

    @Override
    public ResponseWithData<Salary> addSalary(Salary salary) {
        return null;
    }

    @Override
    public ResponseWithData<Salary> getAllSalary() {
        return null;
    }

    @Override
    public Response editSalary(Salary salary) {
        return null;
    }

    @Override
    public Response deleteSalary(Salary salary) {
        return null;
    }

    @Override
    public Response addShiftType(ShiftType shiftType) {
        return null;
    }

    @Override
    public ResponseWithData<List<ShiftType>> getAllShiftType() {
        return null;
    }

    @Override
    public Response editShiftType(ShiftType shiftType) {
        return null;
    }

    @Override
    public Response deleteShiftType(ShiftType shiftType) {
        return null;
    }

    @Override
    public ResponseWithData<Shift> addShift(Shift shift) {
        return null;
    }

    @Override
    public Response deleteShift(Shift shift) {
        return null;
    }

    @Override
    public Response editShift(Shift shift) {
        return null;
    }

    @Override
    public Response schedule(ShiftDetail shiftDetail) {
        return null;
    }

    @Override
    public Response deleteSchedule(ShiftDetail shiftDetail) {
        return null;
    }

    @Override
    public ResponseWithData<List<ShiftDetail>> getAllSchedules(Shift shift) {
        return null;
    }

    @Override
    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfDay(Date date) {
        return null;
    }

    @Override
    public Response deleteListStaffOnSchedule(List<Staff> staffs, Shift shift) {
        return null;
    }

    @Override
    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Shift shift) {
        return null;
    }

    @Override
    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Date date) {
        return null;
    }

    @Override
    public Response workCheckeds(List<Timekeeping> timeKeepings) {
        return null;
    }

    @Override
    public Response deleteListWorkCheckeds(List<Timekeeping> timeKeepings) {
        return null;
    }
}
