package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.Repositorys.*;
import com.project.hrm.payloads.Response.ErrorResponse;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.*;
import com.project.hrm.Services.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
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

    private Argon2PasswordEncoder encoder;

    @Override
    public Response getInformation(String uid) {
        Manager managerId = managerRepository.findByUid(uid);

        if (managerId != null) {
            return new ResponseWithData<>(managerRepository.findByUid(uid), HttpStatus.OK, "Có ok");
        }
        return new Response(HttpStatus.NOT_FOUND, "Không tồn tại tài khoản");
    }

    @Override
    public Response editProfileInformation(Manager managerNewInfo) {
        Manager editManager = managerRepository.findById(managerNewInfo.getUid()).orElse(null);
        if (editManager != null) {
            editManager.setLocation(managerNewInfo.getLocation());
            editManager.setPhone(managerNewInfo.getPhone());
            editManager.setBeginWork(managerNewInfo.getBeginWork());
            editManager.setFullName(managerNewInfo.getFullName());
            editManager.setBankAccount(managerNewInfo.getBankAccount());
            editManager.setBankName(managerNewInfo.getBankName());
            editManager.setRole(managerNewInfo.getRole());
            managerRepository.saveAndFlush(editManager);
            return new Response(HttpStatus.OK, "Thay doi thong tin thanh cong");
        }
        return new Response(HttpStatus.NOT_FOUND, "Khong tim thay quản lý này");
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
    public Response getStaff(String uid) {
        Staff staffId = staffRepository.findByUid(uid);
        if (staffId != null) {
            return new ResponseWithData<>(staffRepository.findByUid(uid), HttpStatus.OK, "OK");
        }
        return new Response(HttpStatus.NOT_FOUND, "Không có nhân viên này");
    }

    @Override
    public ResponseWithData<List<Staff>> getAllStaff() {

        return new ResponseWithData<>(staffRepository.findAll(), HttpStatus.OK, "Thành công");

    }

    @Override
    public Response addStaff(Staff newStaff) {
        Staff addStaff = new Staff(newStaff);
        Staff saveStaff = staffRepository.saveAndFlush(addStaff);
        System.out.println(saveStaff);
        return new ResponseWithData<>(saveStaff, HttpStatus.OK, "Tạo thành công");
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
        if (roleDB != null) {
            return new Response(HttpStatus.CONFLICT, "Chức vụ đã tồn tại trong hệ thống");
        }
        System.out.println(role);
        Role roleSave = new Role(role.getName(), role.getSalary());

        try {
            Role saved = roleRepository.save(roleSave);
            roleRepository.flush();
            return new Response(HttpStatus.OK, "Thêm chức vụ thành công");
        } catch (RuntimeException ex) {
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra trong quá trình thêm chức vụ");
        }

    }

    @Override
    public ResponseWithData<List<Role>> getAllRole() {
        List<Role> roles = roleRepository.findAll();
        return new ResponseWithData<List<Role>>(roles, HttpStatus.OK, "Danh sách chức vụ");
    }

    //Chưa test
    @Override
    public Response editRole(Role role) {
        Role roleDB = roleRepository.findOneById(role.getId());
        if (roleDB == null) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy chức vụ");
        }
        try {
            Role roleSaved = roleRepository.saveAndFlush(new Role(role));
            return new Response(HttpStatus.OK, "Chỉnh sửa chức vụ thành công");
        } catch (RuntimeException ex) {
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình chỉnh sửa");
        }

    }

    @Override
    public Response deleteRole(Role role) {
        return null;
    }

    @Override
    public Response addSalary(Salary salary) {
        try {
            Salary salaryToSave = new Salary(salary);
            salaryRepository.save(salaryToSave);
            salaryRepository.flush();
            return new ResponseWithData<Salary>(salary, HttpStatus.OK, "Thêm bậc lương thành công");

        } catch (RuntimeException ex) {
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
        if (salaryDB == null) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Bậc lương không tồn tại");
        }

        try {
            Salary newSalary = new Salary(salary);
            Salary savedSalary = salaryRepository.saveAndFlush(newSalary);
            return new Response(HttpStatus.OK, "Chỉnh sửa thành công");

        } catch (RuntimeException ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Chỉnh sửa không thành công");
        }

    }

    //Xoó những role phụ thuộc của salary trước (Dựa vào level của salary). Rồi mới xóa salary, Client sẽ có thông báo xác thực
    @Override
    public Response deleteSalary(Salary salary) {

        Salary salaryDB = salaryRepository.findOneByLevel(salary.getLevel());
        if (salaryDB == null) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Bậc lương không tồn tại");
        }
        System.out.println(salaryDB);
        List<Role> rolesToDelete = roleRepository.findAllBySalary(salaryDB);
        //Nếu rỗng thì xóa luôn salary
        if (rolesToDelete.isEmpty()) {
            salaryRepository.delete(salaryDB);
            salaryRepository.flush();
            // Kiểm tra xem đối tượng đã bị xóa thành công hay chưa
            Salary deletedSalary = salaryRepository.findOneByLevel(salaryDB.getLevel());
            if (deletedSalary == null) {
                // Đối tượng đã bị xóa thành công
                return new Response(HttpStatus.OK, "Xóa bậc lương thành công");
            } else {
                // Đối tượng chưa được xóa
                return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Xóa không thành công");
            }
        }
        roleRepository.deleteAll(rolesToDelete);
        roleRepository.flush();

        if (roleRepository.findAllBySalary(salaryDB).isEmpty()) {
            salaryRepository.delete(salaryDB);
            salaryRepository.flush();
            return new Response(HttpStatus.OK, "Xóa bậc lương thành công");
        } else {
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Xóa bậc lương không thành công");
        }

    }

    @Override
    public Response addShiftType(ShiftType shiftType) {
        //Kiểm tra trùng tên
        String shiftTypeRqName = shiftType.getName();
        ShiftType shiftTypeDb = shiftTypeRepository.findOneByName(shiftTypeRqName);
        if (shiftTypeDb != null) {
            return new ErrorResponse(HttpStatus.CONFLICT, "Trùng tên loại ca");
        }
        //Thời gian bắt đầu và kết thúc không được  để trống or null
        System.out.println(shiftType.getEnd().toString());
        if ((shiftType.getEnd() != null && !(shiftType.getEnd().toString().equalsIgnoreCase(""))) &&
                ((shiftType.getStart() != null && !(shiftType.getStart().toString().equalsIgnoreCase("")))))
        {
            ShiftType shiftTypeToSave = new ShiftType(shiftType.getName(), shiftType.getStart(), shiftType.getEnd());

            try {
                ShiftType shiftTypeSaved = shiftTypeRepository.saveAndFlush(shiftTypeToSave);
                return new Response(HttpStatus.OK, "Thêm loại ca thành công");
            }
            catch (Exception ex) {
                System.out.println(ex.getMessage());
                return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra trong quá trình lưu");
            }
        }
        return new ErrorResponse(HttpStatus.BAD_REQUEST, "Vui lòng nhập đầy đủ thông tin loại ca");
    }

    @Override
    public ResponseWithData<List<ShiftType>> getAllShiftType() {
        List<ShiftType> shiftTypeList = shiftTypeRepository.findAll();
        return new ResponseWithData<List<ShiftType>>(shiftTypeList, HttpStatus.OK, "Danh sách loại ca làm");
    }

    @Override
    public Response editShiftType(ShiftType shiftType) {
        //Lấy id ca cần chỉnh sửa
        Integer shiftTypeId = shiftType.getId();
        if(shiftTypeId.toString().equalsIgnoreCase("") || shiftTypeId == null) {
            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Không có id");
        }
        //Tìm trong db
        ShiftType shiftTypeDb = shiftTypeRepository.findOneById(shiftTypeId);
        //Nếu không tìm thấy trong db thì báo lỗi
        if(shiftTypeDb == null) return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin loại ca");

        //Kiểm tra trùng tên
        if(shiftType.getName().equalsIgnoreCase(shiftTypeDb.getName())) {
            return  new ErrorResponse(HttpStatus.CONFLICT, "Trùng tên loại ca");
        }
        try {
            shiftTypeRepository.saveAndFlush(new ShiftType(shiftType));
            return new Response(HttpStatus.OK, "Chỉnh sửa ca làm thành công");
        }catch (Exception ex) {
            System.out.println(ex.getMessage());

            return  new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình chỉnh sửa");
        }
    }

    @Override
    public Response deleteShiftType(ShiftType shiftType) {
        //ShiftType DB
        ShiftType shiftTypeDb = shiftTypeRepository.findOneById(shiftType.getId());
        if(shiftTypeDb == null) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy ca");
        }

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
