//package com.project.hrm.Services.ServiceImplements;
//
//import com.project.hrm.Repositorys.ManagerRepository;
//import com.project.hrm.Repositorys.SalaryRepository;
//import com.project.hrm.Repositorys.StaffRepository;
//import com.project.hrm.payloads.Response.ErrorResponse;
//import com.project.hrm.payloads.Response.Response;
//import com.project.hrm.payloads.Response.ResponseWithData;
//import com.project.hrm.Models.*;
//import com.project.hrm.Repositorys.RoleRepository;
//import com.project.hrm.Services.ManagerService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//import java.util.List;
//
//@Service
//public class ManagerServiceImpl implements ManagerService {
//    @Autowired
//    RoleRepository roleRepository;
//    @Autowired
//    ManagerRepository managerRepository;
//    @Autowired
//    StaffRepository staffRepository;
//    @Autowired
//    SalaryRepository salaryRepository;
//    private Argon2PasswordEncoder encoder;
//
//    @Override
//    public Response getInformation(String uid) {
//        Manager managerId = managerRepository.findByUid(uid);
//
//        if(managerId != null){
//            return new ResponseWithData<>(managerRepository.findByUid(uid), HttpStatus.OK, "Có ok");
//        }
//        return new Response(HttpStatus.NOT_FOUND, "Không tồn tại tài khoản");
//    }
//
//    @Override
//    public Response editProfileInformation(Manager managerNewInfo) {
//        Manager editManager = managerRepository.findById(managerNewInfo.getUid()).orElse(null);
//        if(editManager!=null){
//            editManager.setLocation(managerNewInfo.getLocation());
//            editManager.setPhone(managerNewInfo.getPhone());
//            editManager.setBeginWork(managerNewInfo.getBeginWork());
//            editManager.setFullName(managerNewInfo.getFullName());
//            editManager.setBankAccount(managerNewInfo.getBankAccount());
//            editManager.setBankName(managerNewInfo.getBankName());
//            editManager.setRole(managerNewInfo.getRole());
//            managerRepository.saveAndFlush(editManager);
//            return new Response(HttpStatus.OK,"Thay doi thong tin thanh cong");
//        }
//        return new Response(HttpStatus.NOT_FOUND,"Khong tim thay quản lý này");
//    }
//
//    @Override
//    public Response changePassword(String newPassword, String uid) {
//        Manager managerId = managerRepository.findByUid(uid);
//        if (managerId != null) {
//            try {
//                String newPass = Base64.getEncoder().encodeToString(newPassword.getBytes());
//                managerId.setPassword(newPass);
//
//                managerRepository.saveAndFlush(managerId);
//                return new Response(HttpStatus.OK, "Thay đổi thành công");
//            } catch (Exception e) {
//                return new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình mã hóa mật khẩu");
//            }
//        }
//        return new Response(HttpStatus.NOT_FOUND, "Không thể thay đổi");
//    }
//
//    @Override
//    public Response changeAvatar(String newUrl, String uid) {
//        Manager managerId = managerRepository.findById(uid).orElse(null);
//        if (managerId != null) {
//            try{
//                managerId.setUrlAvatar(newUrl);
//                managerRepository.saveAndFlush(managerId);
//                return new Response(HttpStatus.OK, "Thay đổi thành công");
//            } catch (Exception e){
//                return new Response(HttpStatus.OK, "Lỗi trong quá trình thay đổi");
//            }
//
//        }
//        return new Response(HttpStatus.NOT_FOUND, "Không thể thay đổi");
//    }
//
//    @Override
//    public Response getStaff(String uid) {
//        Staff staffId = staffRepository.findByUid(uid);
//        if(staffId != null){
//            return new ResponseWithData<>(staffRepository.findByUid(uid),HttpStatus.OK, "Tìm kiếm thành công") ;
//        }
//        return new Response(HttpStatus.NOT_FOUND, "Không có nhân viên này");
//    }
//
//    @Override
//    public ResponseWithData<List<Staff>> getAllStaff() {
//
//        return new ResponseWithData<>(staffRepository.findAll(),HttpStatus.OK,"Tìm kiếm thành công");
//
//    }
//
//    @Override
//    public Response addStaff(Staff newStaff) {
//        try {
//            Staff addStaff = new Staff(newStaff);
//            Staff saveStaff = staffRepository.saveAndFlush(addStaff);
//            return new ResponseWithData<>(saveStaff, HttpStatus.OK, "Tạo thành công");
//        } catch (Exception ex) {
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình tạo nhân viên");
//        }
//    }
//
//    @Override
////    public Response editStaff(Staff newStaff) {
////        Staff staff = staffRepository.findById(newStaff.getUid()).orElse(null);
////        if(staff != null){
////            staff.setFullName(newStaff.getFullName());
////            staff.setPhone(newStaff.getPhone());
////            staff.setBankAccount(newStaff.getBankAccount());
////            staff.setBankName(newStaff.getBankName());
////            staff.setRole(newStaff.getRole());
////            staff.setLocation(newStaff.getLocation());
////            staff.setUrlAvatar(newStaff.getUrlAvatar());
////            staffRepository.saveAndFlush(staff);
////            return new Response(HttpStatus.OK,"Thay đổi thông tin thành công");
////        }
////
////        return new Response(HttpStatus.NOT_FOUND,"Không tìm thấy nhân viên");
////    }
//    public Response editStaff(Staff newStaff) {
//        try {
//            Staff staff = staffRepository.findById(newStaff.getUid()).orElse(null);
//            if (staff != null) {
//                staff.setFullName(newStaff.getFullName());
//                staff.setPhone(newStaff.getPhone());
//                staff.setBankAccount(newStaff.getBankAccount());
//                staff.setBankName(newStaff.getBankName());
//                staff.setRole(newStaff.getRole());
//                staff.setLocation(newStaff.getLocation());
//                staff.setUrlAvatar(newStaff.getUrlAvatar());
//                staffRepository.saveAndFlush(staff);
//                return new Response(HttpStatus.OK, "Thay đổi thông tin thành công");
//            }
//
//            return new Response(HttpStatus.NOT_FOUND, "Không tìm thấy nhân viên");
//        } catch (Exception ex) {
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình thay đổi thông tin nhân viên");
//        }
//    }
//
//    @Override
//    public Response deleteStaff(String uid) {
//        try {
//            staffRepository.deleteById(uid);
//            return new Response(HttpStatus.OK, "Xóa thành công");
//        } catch (Exception ex) {
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình xóa nhân viên");
//        }
//    }
//
//    @Override
//    public Response searchStaffByFullName(String fullName) {
//        try {
//            System.out.println("Fullname" + fullName);
//            List<Staff> nameStaff =  staffRepository.findAllByFullName(fullName);
//            System.out.println("Name staff" + nameStaff);
//            if (nameStaff != null && !nameStaff.isEmpty()) {
//                return new ResponseWithData<>(nameStaff, HttpStatus.OK, "Tìm kiếm thành công");
//            } else {
//                return new ResponseWithData<>(null, HttpStatus.NOT_FOUND, "Không có nhân viên nào có fullname đó");
//            }
//        } catch (Exception ex) {
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình tìm kiếm nhân viên");
//        }
//    }
//
//    @Override
//    public Response addRole(Role role) {
//        String roleName = role.getName();
//        Role roleDB = roleRepository.findByName(roleName);
//        //Nếu có tồn tại trong db thì báo lỗi
//        if (roleDB != null) {
//            return new Response(HttpStatus.CONFLICT, "Chức vụ đã tồn tại trong hệ thống");
//        }
//        System.out.println(role);
//        Role roleSave = new Role(role.getName(), role.getSalary());
//
//        try {
//            Role saved = roleRepository.save(roleSave);
//            roleRepository.flush();
//            return new Response(HttpStatus.OK, "Thêm chức vụ thành công");
//        } catch (RuntimeException ex) {
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra trong quá trình thêm chức vụ");
//        }
//
//    }
//
//    @Override
//    public ResponseWithData<List<Role>> getAllRole() {
//        List<Role> roles = roleRepository.findAll();
//        return new ResponseWithData<List<Role>>(roles, HttpStatus.OK, "Danh sách chức vụ");
//    }
//
//    @Override
//    public Response editRole(Role role) {
//        Role roleDB = roleRepository.findOneById(role.getId());
//        if (roleDB == null) {
//            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy chức vụ");
//        }
//        try {
//            Role roleSaved = roleRepository.saveAndFlush(new Role(role));
//            return new Response(HttpStatus.OK, "Chỉnh sửa chức vụ thành công");
//        } catch (RuntimeException ex) {
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình chỉnh sửa");
//        }
//
//    }
//
//    @Override
//    public Response deleteRole(Role role) {
//        roleRepository.deleteById(role.getId());
//        return new Response(HttpStatus.OK, "Xóa thành công");
//    }
//
//    @Override
//    public Response addSalary(Salary salary) {
//        try {
//            Salary salaryToSave = new Salary(salary);
//            salaryRepository.save(salaryToSave);
//            salaryRepository.flush();
//            return new ResponseWithData<Salary>(salary, HttpStatus.OK, "Thêm bậc lương thành công");
//
//        } catch (RuntimeException ex) {
//            System.out.println(ex.getMessage());
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi khi lưu bậc lương");
//        }
//    }
//
//    @Override
//    public ResponseWithData<List<Salary>> getAllSalary() {
//        List<Salary> salaries = salaryRepository.findAll();
//        return new ResponseWithData<List<Salary>>(salaries, HttpStatus.OK, "Danh sách bậc lương");
//    }
//
//    @Override
//    public Response editSalary(Salary salary) {
//        String levelEdit = salary.getLevel();
//
//        Salary salaryDB = salaryRepository.findOneByLevel(levelEdit);
//        //Nếu null thì báo không tìm thấy bậc lương cần chỉnh sửa
//        if (salaryDB == null) {
//            return new ErrorResponse(HttpStatus.NOT_FOUND, "Bậc lương không tồn tại");
//        }
//
//        try {
//            Salary newSalary = new Salary(salary);
//            Salary savedSalary = salaryRepository.saveAndFlush(newSalary);
//            return new Response(HttpStatus.OK, "Chỉnh sửa thành công");
//
//        } catch (RuntimeException ex) {
//            System.out.println(ex.getMessage());
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Chỉnh sửa không thành công");
//        }
//    }
//
//    //Xoó những role phụ thuộc của salary trước (Dựa vào level của salary). Rồi mới xóa salary, Client sẽ có thông báo xác thực
//    @Override
//    public Response deleteSalary(Salary salary) {
//
//        Salary salaryDB = salaryRepository.findOneByLevel(salary.getLevel());
//        if (salaryDB == null) {
//            return new ErrorResponse(HttpStatus.NOT_FOUND, "Bậc lương không tồn tại");
//        }
//        System.out.println(salaryDB);
//        List<Role> rolesToDelete = roleRepository.findAllBySalary(salaryDB);
//        //Nếu rỗng thì xóa luôn salary
//        if (rolesToDelete.isEmpty()) {
//            salaryRepository.delete(salaryDB);
//            salaryRepository.flush();
//            // Kiểm tra xem đối tượng đã bị xóa thành công hay chưa
//            Salary deletedSalary = salaryRepository.findOneByLevel(salaryDB.getLevel());
//            if (deletedSalary == null) {
//                // Đối tượng đã bị xóa thành công
//                return new Response(HttpStatus.OK, "Xóa bậc lương thành công");
//            } else {
//                // Đối tượng chưa được xóa
//                return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Xóa không thành công");
//            }
//        }
//        roleRepository.deleteAll(rolesToDelete);
//        roleRepository.flush();
//
//        if (roleRepository.findAllBySalary(salaryDB).isEmpty()) {
//            salaryRepository.delete(salaryDB);
//            salaryRepository.flush();
//            return new Response(HttpStatus.OK, "Xóa bậc lương thành công");
//        } else {
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Xóa bậc lương không thành công");
//        }
//
//    }
//
//    @Override
//    public Response addShiftType(ShiftType shiftType) {
//        //Kiểm tra trùng tên
//        String shiftTypeRqName = shiftType.getName();
//        ShiftType shiftTypeDb = shiftTypeRepository.findOneByName(shiftTypeRqName);
//        if (shiftTypeDb != null) {
//            return new ErrorResponse(HttpStatus.CONFLICT, "Trùng tên loại ca");
//        }
//        //Thời gian bắt đầu và kết thúc không được  để trống or null
//        System.out.println(shiftType.getEnd().toString());
//        if ((shiftType.getEnd() != null && !(shiftType.getEnd().toString().equalsIgnoreCase(""))) &&
//                ((shiftType.getStart() != null && !(shiftType.getStart().toString().equalsIgnoreCase(""))))) {
//            ShiftType shiftTypeToSave = new ShiftType(shiftType.getName(), shiftType.getStart(), shiftType.getEnd());
//
//            try {
//                ShiftType shiftTypeSaved = shiftTypeRepository.saveAndFlush(shiftTypeToSave);
//                return new Response(HttpStatus.OK, "Thêm loại ca thành công");
//            } catch (Exception ex) {
//                System.out.println(ex.getMessage());
//                return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra trong quá trình lưu");
//            }
//        }
//        return new ErrorResponse(HttpStatus.BAD_REQUEST, "Vui lòng nhập đầy đủ thông tin loại ca");
//    }
//
//    @Override
//    public ResponseWithData<List<ShiftType>> getAllShiftType() {
//        List<ShiftType> shiftTypeList = shiftTypeRepository.findAll();
//        return new ResponseWithData<List<ShiftType>>(shiftTypeList, HttpStatus.OK, "Danh sách loại ca làm");
//    }
//
//    @Override
//    public Response editShiftType(ShiftType shiftType) {
//        //Lấy id ca cần chỉnh sửa
//        Integer shiftTypeId = shiftType.getId();
//        if (shiftTypeId.toString().equalsIgnoreCase("") || shiftTypeId == null) {
//            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Không có id");
//        }
//        //Tìm trong db
//        ShiftType shiftTypeDb = shiftTypeRepository.findOneById(shiftTypeId);
//        //Nếu không tìm thấy trong db thì báo lỗi
//        if (shiftTypeDb == null) return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin loại ca");
//
//        //Kiểm tra trùng tên
//        if (shiftType.getName().equalsIgnoreCase(shiftTypeDb.getName())) {
//            return new ErrorResponse(HttpStatus.CONFLICT, "Trùng tên loại ca");
//        }
//        try {
//            shiftTypeRepository.saveAndFlush(new ShiftType(shiftType));
//            return new Response(HttpStatus.OK, "Chỉnh sửa ca làm thành công");
//        } catch (Exception ex) {
//            System.out.println(ex.getMessage());
//
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình chỉnh sửa");
//        }
//    }
//
//    @Override
//    public Response deleteShiftType(ShiftType shiftType) {
//        //ShiftType DB
//        ShiftType shiftTypeDb = shiftTypeRepository.findOneById(shiftType.getId());
//        if (shiftTypeDb == null) {
//            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy ca");
//        }
//        //#################Còn thiếu xóa các chi tiết ca, và xóa các chấm công
//        //Tìm xem có phụ thuộc trong shift không
//        List<Shift> shiftDb = shiftRepository.findAllByShiftType(shiftTypeDb);
//        //Nếu có ca bị phụ thuộc thì không cho xóa
//        if (!shiftDb.isEmpty()) {
//            return new ErrorResponse(HttpStatus.METHOD_NOT_ALLOWED, "Không thể thực hiện xóa do có ca làm phụ thuộc");
//        }
//        try {
//            shiftTypeRepository.delete(shiftTypeDb);
//            shiftTypeRepository.flush();
//            return new Response(HttpStatus.OK, "Xóa thành công ca làm");
//        } catch (Exception ex) {
//            System.out.println(ex.getMessage());
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình xóa");
//        }
//    }
//
//    //Tạo 1 ca trong ngày
//    @Override
//    public Response addShift(Shift shift) {
//        try {
//            Shift shiftToSave = new Shift(shift);
//            ShiftType shiftTypeDb = shiftTypeRepository.findOneById(shiftToSave.getShiftType().getId());
//
//
//            Shift shiftSaved = shiftRepository.saveAndFlush(shiftToSave);
//            return new Response(HttpStatus.OK, "Thêm ca " + shiftTypeDb.getName() + " trong ngày " + shiftToSave.getDate() + " thành công");
//        } catch (Exception ex) {
//            System.out.println(ex.getMessage());
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình thêm ca làm: " + ex.getMessage());
//        }
//    }
//
//    @Override
//    public Response deleteShift(Shift shift) {
//        return null;
//    }
//
//    @Override
//    public Response editShift(Shift shift) {
//        return null;
//    }
//
//
//    //Sắp lịch làm
//    @Override
//    public Response schedule(ShiftDetailRequest shiftDetailRequests) {
//        Map<String, String> listError = new HashMap<>();
//        //Lấy danh sách sắp lịch
////         datas = new HashMap<>(shiftDetailRequests.getDataSet());
//        return new ResponseWithData<> (shiftDetailRequests, HttpStatus.OK, "OK");
//        //Lặp qua danh sách shiftDetails
////        for (ShiftDetail shiftDetail : shiftDetails) {
////            //Với mỗi 1 đối tượng -> kiểm tra shift_id và staff uid
////            //Tồn tại thỏa điều kiện thì lưu
////            //Đối tượng nào lỗi thì lưu vào một danh sách và trả về kèm theo
////            Staff staffDb = staffRepository.findByUid(shiftDetail.getStaff().getUid());
////            Shift shiftDb = shiftRepository.findOneById(shiftDetail.getShift().getId());
////            if(staffDb == null) {
////                listError.put("Không thể thêm nhân sự vào ca làm. Do không tồn tại nhân sự", staffDb.getFullName());
////            }
////            if(shiftDb == null) {
////                listError.put("Không thể thêm nhân sự vào ca làm. Do không tồn tại ca làm", staffDb.getFullName());
////            }
////        }
////        return null;
//    }
//
//    @Override
//    public Response deleteSchedule(ShiftDetail shiftDetail) {
//        return null;
//    }
//
//    @Override
//    public ResponseWithData<List<ShiftDetail>> getAllSchedules(Shift shift) {
//        return null;
//    }
//
//    @Override
//    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfDay(Date date) {
//        return null;
//    }
//
//    @Override
//    public Response deleteListStaffOnSchedule(List<Staff> staffs, Shift shift) {
//        return null;
//    }
//
//    @Override
//    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Shift shift) {
//
//        return null;
//    }
//
//    @Override
//    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Date date) {
//        return null;
//    }
//
//    @Override
//    public Response workCheckeds(List<Timekeeping> timeKeepings) {
//        return null;
//    }
//
//    @Override
//    public Response deleteListWorkCheckeds(List<Timekeeping> timeKeepings) {
//        return null;
//    }
//}
