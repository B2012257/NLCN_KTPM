package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.Repositorys.*;
import com.project.hrm.payloads.Response.ErrorResponse;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.*;
import com.project.hrm.Services.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

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
    @Autowired
    SalaryRepository salaryRepository;

    @Autowired
    ShiftTypeRepository shiftTypeRepository;
    @Autowired
    ShiftRepository shiftRepository;
    @Autowired
    ShiftDetailRepository shiftDetailRepository;
    private Argon2PasswordEncoder encoder;

    @Override
    public Response getInformation(String uid) {
        Manager managerId = managerRepository.findByUid(uid);

        if(managerId != null){
            return new ResponseWithData<>(managerRepository.findByUid(uid), HttpStatus.OK, "Có thông tin tài khoản");
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
            return new Response(HttpStatus.OK,"Thay đổi thông tin thành công");
        }
        return new Response(HttpStatus.NOT_FOUND,"Không tìm thấy thông tin quản lý này");
    }

    @Override
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
    public Response changeAvatar(String newUrl, String uid) {
        Manager managerId = managerRepository.findById(uid).orElse(null);
        if (managerId != null) {
               managerId.setUrlAvatar(newUrl);
                managerRepository.saveAndFlush(managerId);
                return new Response(HttpStatus.OK, "Thay đổi thành công");
        }
        return new Response(HttpStatus.NOT_FOUND, "Không thể thay đổi");
    }

    @Override
    public Response getStaff(String uid) {
        Staff staffId = staffRepository.findByUid(uid);
        if(staffId != null){
            return new ResponseWithData<>(staffRepository.findByUid(uid),HttpStatus.OK, "Tìm kiếm thành công") ;
        }
        return new Response(HttpStatus.NOT_FOUND, "Không có nhân viên này");
    }

    @Override
    public ResponseWithData<List<Staff>> getAllStaff() {

        return new ResponseWithData<>(staffRepository.findAll(),HttpStatus.OK,"Tìm kiếm thành công");

    }

    @Override
    public Response addStaff(Staff newStaff) {
        Staff addStaff = new Staff(newStaff);
        Staff saveStaff= staffRepository.saveAndFlush(addStaff);
        System.out.println(saveStaff);
        return new ResponseWithData<>(saveStaff,HttpStatus.OK, "Tạo thành công");
    }

    @Override
    public Response editStaff(Staff newStaff) {
        Staff staff = staffRepository.findById(newStaff.getUid()).orElse(null);
        if(staff != null){
            staff.setFullName(newStaff.getFullName());
            staff.setPhone(newStaff.getPhone());
            staff.setBankAccount(newStaff.getBankAccount());
            staff.setBankName(newStaff.getBankName());
            staff.setRole(newStaff.getRole());
            staff.setLocation(newStaff.getLocation());
            staff.setUrlAvatar(newStaff.getUrlAvatar());
            staffRepository.saveAndFlush(staff);
            return new Response(HttpStatus.OK,"Thay đổi thông tin thành công");
        }

        return new Response(HttpStatus.NOT_FOUND,"Không tìm thấy nhân viên");
    }

    @Override
    public Response deleteStaff(String uid) {
        staffRepository.deleteById(uid);
        return new Response(HttpStatus.OK, "Xóa thành công");
    }

    @Override
    public ResponseWithData<List<Staff>> searchStaffByFullName(String fullName) {
        List<Staff> nameStaff = (List<Staff>) staffRepository.findByFullName(fullName);
        if(nameStaff != null){

            return new ResponseWithData<>(nameStaff,HttpStatus.OK, "Tìm kiếm thành công");
        }
        return new ResponseWithData<>(null,HttpStatus.NOT_FOUND, "Không có nhân viên nào có fullname đó ");
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
        Role isrole = roleRepository.findById(role.getId()).orElse(null);
        if(isrole != null){
            isrole.setName(role.getName());
            isrole.setSalary(role.getSalary());
            roleRepository.saveAndFlush(isrole);
            return new Response(HttpStatus.OK, "Sửa thành công");

        }
        return new Response(HttpStatus.NOT_FOUND, "Sửa thất bại");

    }

    @Override
    public Response deleteRole(Role role) {
        roleRepository.deleteById(role.getId());
        return new Response(HttpStatus.OK, "Xóa thành công");
    }

    @Override
    public Response addSalary (Salary salary) {
        try {
            Salary salaryToSave = new Salary(salary);
            salaryRepository.saveAndFlush(salaryToSave);
            return new ResponseWithData<Salary>(salary, HttpStatus.OK, "Thêm bậc lương thành công");

        }catch(RuntimeException ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi khi lưu bậc lương");
        }
    }

    @Override
    public ResponseWithData<List<Salary>> getAllSalary() {
        List<Salary> salaries = salaryRepository.findAll();
        return new ResponseWithData<List<Salary>>(salaries, HttpStatus.OK, "Danh sách bậc lương");
    }

    @Override
    public Response editSalary(Salary salary) {
        String levelEdit = salary.getLevel();
        
        Salary salaryDB = salaryRepository.findOneByLevel(levelEdit);
        //Nếu null thì báo không tìm thấy bậc lương cần chỉnh sửa
        if(salaryDB == null) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Bậc lương không tồn tại");
        }

        try {
            Salary newSalary = new Salary(salary);
            Salary savedSalary= salaryRepository.saveAndFlush(newSalary);
            return new Response(HttpStatus.OK, "Chỉnh sửa thành công");

        }catch (RuntimeException ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Chỉnh sửa không thành công");
        }

    }

    @Override
    public Response deleteSalary(Salary salary) {
        Salary salaryLevel = salaryRepository.findOneByLevel(salary.getLevel());
        if(salaryLevel != null){

            salaryRepository.delete(salaryLevel);
            return new Response(HttpStatus.OK, "Xóa thành công");
        }

        return new Response(HttpStatus.NOT_FOUND, "Xóa thất bại");    }

    @Override
    public Response addShiftType(ShiftType shiftType) {
        ShiftType shift = new ShiftType(shiftType);
        shiftTypeRepository.saveAndFlush(shift);
        return new Response(HttpStatus.OK, "Thêm thành công");

    }

    @Override
    public ResponseWithData<List<ShiftType>> getAllShiftType() {
        return new ResponseWithData<>(shiftTypeRepository.findAll(),HttpStatus.OK,"Tìm kiếm thành công");

    }

    @Override
    public Response editShiftType(ShiftType shiftType) {
        ShiftType shiftTypeId = shiftTypeRepository.findById(shiftType.getId()).orElse(null);
        if(shiftTypeId !=null){
            shiftTypeId.setName(shiftType.getName());
            shiftTypeId.setStart(shiftType.getStart());
            shiftTypeId.setEnd(shiftType.getEnd());
            shiftTypeRepository.saveAndFlush(shiftTypeId);
            return new Response(HttpStatus.OK, "Thay đổi thành công");
        }
        return new Response(HttpStatus.OK, "Thay đổi thất bại");
    }

    @Override
    public Response deleteShiftType(ShiftType shiftType) {
        ShiftType shiftTypeId = shiftTypeRepository.findById(shiftType.getId()).orElse(null);
        if(shiftTypeId != null){
            shiftTypeRepository.delete(shiftTypeId);
            return new Response(HttpStatus.OK, "Xóa thành công");
        }
        return new Response(HttpStatus.NOT_FOUND, "Xóa thất bại");
    }

    @Override
    public ResponseWithData<Shift> addShift(Shift newShift) {
        Shift shiftNew = new Shift(newShift);
        shiftRepository.saveAndFlush(shiftNew);
        return new ResponseWithData<>(shiftNew,HttpStatus.OK,"Thêm thành công");
    }

    @Override
    public Response deleteShift(Shift shift) {
        Shift shiftId= shiftRepository.findById(shift.getId()).orElse(null);
        if(shiftId !=null){
            shiftRepository.delete(shiftId);
            return new Response(HttpStatus.OK, "Xóa thành công");
        }
        return new Response(HttpStatus.OK, "Xóa thất bại");
    }

    @Override
    public Response editShift(Shift shift) {
        Shift shiftId= shiftRepository.findById(shift.getId()).orElse(null);
        if(shiftId !=null){
            shiftId.setDate(shift.getDate());
            shiftId.setTask(shift.getTask());
            shiftId.setManager(shift.getManager());
            shiftId.setShiftType(shift.getShiftType());
            shiftRepository.saveAndFlush(shiftId);
            return new Response(HttpStatus.OK, "Sửa thành công");
        }
        return new Response(HttpStatus.OK, "Sửa thất bại");
    }

    @Override
    public Response schedule(ShiftDetail shiftDetail) {

        ShiftDetail newShiftDetail = new ShiftDetail(shiftDetail);
        shiftDetailRepository.saveAndFlush(newShiftDetail);
        return  new Response(HttpStatus.OK, "Thêm thành công");

    }

    @Override
    public Response deleteSchedule(ShiftDetail shiftDetail) {
        ShiftDetail shiftDetailId = shiftDetailRepository.findById(shiftDetail.getId()).orElse(null);
        if(shiftDetailId != null){
            shiftDetailRepository.delete(shiftDetailId);
            return new Response(HttpStatus.OK, "Xóa thành công ");
        }
        return new Response(HttpStatus.OK, "Xóa không thành công");

    }

    @Override
    public ResponseWithData<List<ShiftDetail>> getAllSchedules() {
        List<ShiftDetail> shiftDetails = shiftDetailRepository.findAll();
        return new ResponseWithData<>(shiftDetails,HttpStatus.OK,"OK");

    }

    @Override
    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfDay(Date date) {
//        List<ShiftDetail> shiftDetails = shiftDetailRepository.findAllByShift_Date(date);
//
//        if (shiftDetails.isEmpty()) {
//            return new ResponseWithData<>(shiftDetails,HttpStatus.NOT_FOUND,"No schedules found for the given date.");
//        } else {
//            return new ResponseWithData<>(shiftDetails,HttpStatus.OK,"Success");
//        }
        return new ResponseWithData<>(shiftDetailRepository.findAllByShift_Date(date),HttpStatus.OK, "OK");
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
