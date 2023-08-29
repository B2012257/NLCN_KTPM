package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.Repositorys.ManagerRepository;
import com.project.hrm.Repositorys.StaffRepository;
import com.project.hrm.payloads.Response.ErrorResponse;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.*;
import com.project.hrm.Repositorys.RoleRepository;
import com.project.hrm.Services.ManagerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
public class ManagerServiceImpl implements ManagerService {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    ManagerRepository managerRepository;
    @Autowired
    StaffRepository staffRepository;

    private Argon2PasswordEncoder encoder;

    @Override
    public Response getInformation(String uid) {
        Manager managerId = managerRepository.findByUid(uid);

        if(managerId != null){
            return new ResponseWithData<>(managerRepository.findByUid(uid), HttpStatus.OK, "Có ok");
        }
        return new Response(HttpStatus.NOT_FOUND, "Không tồn tại tài khoản");
    }

    @Override
    public Response editProfileInformation(Manager managerNewInfo) {
        Manager editManager = managerRepository.findById(managerNewInfo.getUid()).orElse(null);
        if(editManager!=null){
            editManager.setLocation(managerNewInfo.getLocation());
            editManager.setPhone(managerNewInfo.getPhone());
            editManager.setBeginWork(managerNewInfo.getBeginWork());
            editManager.setFullName(managerNewInfo.getFullName());
            editManager.setBankAccount(managerNewInfo.getBankAccount());
            editManager.setBankName(managerNewInfo.getBankName());
            editManager.setRole(managerNewInfo.getRole());
            managerRepository.saveAndFlush(editManager);
            return new Response(HttpStatus.OK,"Thay doi thong tin thanh cong");
        }
        return new Response(HttpStatus.NOT_FOUND,"Khong tim thay quản lý này");
    }

    @Override
//    public Response changePassword(String newPassword, String uid) {
//        Manager managerId = managerRepository.findByUid(uid);
//        if(managerId != null){
//            String newPass= encoder.encode(newPassword);
//           managerId.setPassword(newPass);
//
//            managerRepository.saveAndFlush(managerId);
//            return new Response(HttpStatus.OK,"Thay đổi thành công");
//        }
//        return new Response(HttpStatus.NOT_FOUND,"Không thể thay đổi");
//    }
    public Response changePassword(String newPassword, String uid) {
        Manager managerId = managerRepository.findByUid(uid);
        if (managerId != null) {
            try {
                String newPass = Base64.getEncoder().encodeToString(newPassword.getBytes());
                managerId.setPassword(newPass);

                managerRepository.saveAndFlush(managerId);
                return new Response(HttpStatus.OK, "Thay đổi thành công");
            } catch (Exception e) {
                return new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình mã hóa mật khẩu");
            }
        }
        return new Response(HttpStatus.NOT_FOUND, "Không thể thay đổi");
    }

    @Override
    public Response changeAvatar(String newUrl) {
        return null;
    }

    @Override
    public Response getStaff(String uid) {
        Staff staffId = staffRepository.findByUid(uid);
        if(staffId != null){
            return new ResponseWithData<>(staffRepository.findByUid(uid),HttpStatus.OK, "OK") ;
        }
        return new Response(HttpStatus.NOT_FOUND, "Không có nhân viên này");
    }

    @Override
    public ResponseWithData<List<Staff>> getAllStaff() {

        return new ResponseWithData<>(staffRepository.findAll(),HttpStatus.OK,"Thành công");

    }

    @Override
    public Response addStaff(Staff newStaff) {
        Staff addStaff = new Staff(newStaff);
        Staff saveStaff= staffRepository.saveAndFlush(addStaff);
        System.out.println(saveStaff);
        return new ResponseWithData<>(saveStaff,HttpStatus.OK, "Tạo thành công");
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
        return new ResponseWithData<Salary>(salary, HttpStatus.ACCEPTED, "Xong");
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
