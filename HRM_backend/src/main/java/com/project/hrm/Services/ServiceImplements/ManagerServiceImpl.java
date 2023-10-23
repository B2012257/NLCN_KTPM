package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.Repositorys.*;
import com.project.hrm.Services.ManagerService;
import com.project.hrm.payloads.Request.ShiftDetailRequest;
import com.project.hrm.payloads.Response.ErrorResponse;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.*;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.Date;

@Service//import com.project.hrm.Models.Date;

public class ManagerServiceImpl implements ManagerService {

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    SalaryRepository salaryRepository;

    @Autowired
    TypeRepository typeRepository;

    @Autowired
    ShiftTypeRepository shiftTypeRepository;

    @Autowired
    DateRepository dateRepository;

    @Autowired
    ShiftRepository shiftRepository;

    @Autowired
    ShiftDetailRepository shiftDetailRepository;

    @Autowired
    TimeKeepingRepository timeKeepingRepository;

    @Autowired
    FreeTimeRepository freeTimeRepository;

    private Argon2PasswordEncoder encoder;

    public ManagerServiceImpl() {
        this.encoder = new Argon2PasswordEncoder(12, 64, 1, 15 * 1024, 2);
    }

//    @Override
//    public Response getInformation(String uid) {
//        try {
//            Staff managerId = staffRepository.findByUid(uid);
//            if (managerId != null) {
//                return new ResponseWithData<>(staffRepository.findByUid(uid), HttpStatus.OK, "Có ok");
//            }
//            return new Response(HttpStatus.NOT_FOUND, "Không tồn tại tài khoản");
//        } catch (Exception ex) {
//            // Xử lý ngoại lệ tại đây
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình lấy thông tin");
//        }
//    }

//    @Override
//    public Response changePassword(String newPassword, String uid) {
//        Staff managerId = staffRepository.findByUid(uid);
//        if (managerId != null) {
//            try {
//                String newPass = Base64.getEncoder().encodeToString(newPassword.getBytes());
//                managerId.setPassword(newPass);
//
//                staffRepository.saveAndFlush(managerId);
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
//        Staff managerId = staffRepository.findById(uid).orElse(null);
//        if (managerId != null) {
//            try{
//                managerId.setUrlAvatar(newUrl);
//                staffRepository.saveAndFlush(managerId);
//                return new Response(HttpStatus.OK, "Thay đổi thành công");
//            } catch (Exception e){
//                return new Response(HttpStatus.OK, "Lỗi trong quá trình thay đổi");
//            }
//
//        }
//        return new Response(HttpStatus.NOT_FOUND, "Không thể thay đổi");
//
//
//    }

    //
    @Override
    public Response getStaff(String uid) {
        try {
            Staff staffId = staffRepository.findByUid(uid);
            if (staffId != null) {
                return new ResponseWithData<>(staffId, HttpStatus.OK, "Tìm kiếm thành công");
            }
            return new Response(HttpStatus.NOT_FOUND, "Không có nhân viên này");
        } catch (Exception ex) {
            // Xử lý ngoại lệ tại đây
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình lấy thông tin nhân viên");
        }
    }

    //
    @Override
    public Response getAllStaff() {
        try {
            List<Staff> staffList = staffRepository.findAll();
            return new ResponseWithData<>(staffList, HttpStatus.OK, "Tìm kiếm thành công");
        } catch (Exception ex) {
            // Xử lý ngoại lệ tại đây
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình lấy thông tin nhân viên");
        }
    }

    //
    @Override
    public Response addStaff(Staff newStaff) {
        //Kiểm tra trùng userName
        //Kiểm tra trùng sdt
        //Kiểm tra trùng số tài khỏan ngân hàng
        String userNameRq = newStaff.getUserName();
        String passWordRq = newStaff.getPassword();
        String bankNumberRq = newStaff.getBankAccount();
        if (userNameRq.equalsIgnoreCase("") || userNameRq.equalsIgnoreCase(" ") || userNameRq == null) {
            //Kỉểm tra trùng userName
            System.out.println("check username");

            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Tên nguời dùng không đuợc bỏ trống");
        }

        System.out.println(userNameRq);
        Staff staffByUsername = staffRepository.findByUserName(userNameRq);

        if (staffByUsername != null) {
            return new ErrorResponse(HttpStatus.CONFLICT, "Tên nguời dùng đã đuơc sữ dụng");
        }

        if (passWordRq.equalsIgnoreCase("") || passWordRq.equalsIgnoreCase(" ") || passWordRq == null) {

            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Mật khẩu không đuợc bỏ trống");
        }
        //Nếu có số tài khỏan đụocw gũi lên
        if (bankNumberRq != null || !(bankNumberRq.equalsIgnoreCase(""))) {
            Staff staffByBankAccount = staffRepository.findByBankAccount(bankNumberRq);
            if (staffByBankAccount != null) {
                return new ErrorResponse(HttpStatus.CONFLICT, "Số tài khỏan ngân hàng đã đựoc sử dụng");
            }
        }

        try {
            Staff addStaff = new Staff(newStaff);
            addStaff.setPassword(encoder.encode(newStaff.getPassword()));
            Staff saveStaff = staffRepository.saveAndFlush(addStaff);
            return new ResponseWithData<>(saveStaff, HttpStatus.OK, "Thêm nhân sự thành công");
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình thêm nhân viên");
        }
    }

    @Override
    public Response getRecentStaff(Date startDate, Date endDate) {
/*
    startDate.toInstant(): Đầu tiên, chúng ta sử dụng phương thức toInstant() để chuyển đổi đối tượng Date thành một đối tượng Instant.
    Instant trong Java 8+ là một đối tượng biểu diễn thời gian không thay đổi, không phụ thuộc vào múi giờ. atZone(ZoneId.systemDefault()):
    Sau khi có Instant, chúng ta sử dụng phương thức atZone() để chuyển đổi Instant thành một đối tượng ZonedDateTime,
     có thông tin về múi giờ. ZoneId.systemDefault() được sử dụng để lấy múi giờ mặc định của hệ thống, và chúng ta tạo một ZonedDateTime dựa trên múi giờ này.
     ZonedDateTime chứa thông tin về ngày, giờ và múi giờ.
    toLocalDateTime(): Cuối cùng, chúng ta sử dụng phương thức toLocalDateTime() để chuyển đổi ZonedDateTime thành LocalDateTime.
     LocalDateTime là một đối tượng chỉ chứa thông tin về ngày và giờ, mà không chứa thông tin về múi giờ.
* */
        try {
            LocalDateTime start = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            LocalDateTime end = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            // Chuyển đổi chuỗi thành LocalDateTime
            return new ResponseWithData<>(staffRepository.findByCreatedDateTimeBetweenOrderByCreatedDateTimeDesc(start, end), HttpStatus.OK, "Danh sách nhân sự vừa mới thêm từ ngày: " + startDate + " đến " + endDate);

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không lấy được nhân sự vừa thêm");
        }
    }

    //
    @Override
    public Response editStaff(Staff newStaff) {
        Staff staff = staffRepository.findById(newStaff.getUid()).orElse(null);
        if (staff != null) {
            staff.setFullName(newStaff.getFullName());
            staff.setPhone(newStaff.getPhone());
            staff.setBankAccount(newStaff.getBankAccount());
            staff.setBankName(newStaff.getBankName());
            staff.setType(newStaff.getType());
            staff.setLocation(newStaff.getLocation());
            staff.setUrlAvatar(newStaff.getUrlAvatar());
            staff.setGender(newStaff.getGender());
            staffRepository.saveAndFlush(staff);
            return new Response(HttpStatus.OK, "Thay đổi thông tin thành công");
        }
        return new Response(HttpStatus.NOT_FOUND, "Không tìm thấy nhân viên");
    }

    // Xóa nhân sự, xóa các bảng liên quan trước bảng workRegister, Bảng timeKeeping, shiftDetail,
    @Override
    public Response deleteStaff(String uid) {
        try {
            staffRepository.deleteById(uid);
            return new Response(HttpStatus.OK, "Xóa thành công");
        } catch (Exception ex) {
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình xóa nhân viên");
        }
    }

    //
    @Override
    public Response searchStaffByPartialName(String partialName) {
        try {
            System.out.println("Partial Name: " + partialName);
            List<Staff> nameStaff = staffRepository.findByFullNameContainingIgnoreCase(partialName);
            System.out.println("Name staff: " + nameStaff);
            if (nameStaff != null && !nameStaff.isEmpty()) {
                return new ResponseWithData<>(nameStaff, HttpStatus.OK, "Tìm kiếm thành công");
            } else {
                return new ResponseWithData<>(null, HttpStatus.NOT_FOUND, "Không có nhân viên ");
            }
        } catch (Exception ex) {
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình tìm kiếm nhân viên");
        }
    }

    @Override
    public Response addType(Type type) {
        //Kiểm tra trùng tên nữa --------------------------------------------

        String nameType = type.getName();
        if (nameType.equalsIgnoreCase("") || nameType.equalsIgnoreCase(" "))
            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Tên loại nhân sự không được bỏ trống");
        Type typeToSave = new Type(type);
        try {
            typeRepository.save(typeToSave);
            typeRepository.flush();
            return new Response(HttpStatus.OK, "Thêm loại nhân sự thành công!");

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình thêm loại nhân sự mơới");
        }
    }

    @Override
    public Response getAllType() {

        try {
//           Pageable firstPageWithTwoElements = PageRequest.of(1, 1, Sort.by("name"));
//
//           Page<Type> types = typeRepository.findAll(firstPageWithTwoElements);

            List<Type> types = typeRepository.findAll();
            return new ResponseWithData<List<Type>>(types, HttpStatus.OK, "Danh sách loại nhân sự");
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra!");
        }
    }

    @Override
    public Response editType(Type type) {
        try {
            System.out.println(type.getId());
            Type typeDb = typeRepository.findOneById(type.getId());
            String typeNameDb = typeDb.getName();

            if (typeDb == null)
                return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy loại nhân sự cần chỉnh sửa");

            Type typeSave = new Type(type);
            //Nếu không có truyền thông tin chỉnh sửa thì set lại giá trị cũ trong db
            if (type.getName() == null) typeSave.setName(typeNameDb);

            typeRepository.saveAndFlush(typeSave);
            return new Response(HttpStatus.OK, "Chỉnh sửa thành công");
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Chỉnh sửa không thành công do có lỗi ở máy chủ");
        }

    }

    @Override
    public Response deleteType(Type type) {
        //Kiểm tra phụ thuộc của bảng staff
        //Nếu có phụ thuộc thì không cho xóa
        try {
            Type typeDb = typeRepository.findOneById(type.getId());
            if (typeDb == null) return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy loại nhân sự!");
            List<Staff> staffs = staffRepository.findAllByType(typeDb);
            //Nếu không có phụ thuộc thì xóa
            if (staffs.isEmpty()) {
                typeRepository.delete(typeDb);
                typeRepository.flush();
                return new Response(HttpStatus.OK, "Xóa thành công loại nhân sự " + typeDb.getName());
            }
            return new ErrorResponse(HttpStatus.CONFLICT, "Không thể xóa loại nhân sự " + typeDb.getName() + " bởi vì dữ liệu đang được sử dụng");
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong ở máy chủ");
        }
    }
//

//


//

    //
    @Override
    public Response addSalary(Salary salary) {
        try {
            Salary salaryToSave = new Salary(salary);
            System.out.println(salaryToSave);
            salaryRepository.save(salaryToSave);
            salaryRepository.flush();
            return new ResponseWithData<Salary>(salary, HttpStatus.OK, "Thêm bậc lương thành công");

        } catch (RuntimeException ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi khi lưu bậc lương");
        }

    }

    //
    @Override
    public ResponseWithData<List<Salary>> getAllSalary() {
        List<Salary> salaries = salaryRepository.findAll();
        return new ResponseWithData<List<Salary>>(salaries, HttpStatus.OK, "Danh sách bậc lương");
    }

    //
    @Override
    public Response editSalary(Salary salary) {
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
        return null;

    }

    //
//    //Xoó những role phụ thuộc của salary trước (Dựa vào level của salary). Rồi mới xóa salary, Client sẽ có thông báo xác thực
    @Override
    public Response deleteSalary(Salary salary) {

        Salary salaryDB = salaryRepository.findOneByLevel(salary.getLevel());
        if (salaryDB == null) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Bậc lương không tồn tại");
        }

        List<Staff> staffTRef = staffRepository.findAllBySalary(salaryDB);
        //Nếu rỗng thì xóa luôn salary
        if (staffTRef.isEmpty()) {
            salaryRepository.delete(salaryDB);
            salaryRepository.flush();
            // Kiểm tra xem đối tượng đã bị xóa thành công hay chưa
            Salary deletedSalary = salaryRepository.findOneByLevel(salaryDB.getLevel());
            if (deletedSalary == null) {
                // Đối tượng đã bị xóa thành công
                return new Response(HttpStatus.OK, "Xóa bậc lương thành công");
            } else {
                // Đối tượng chưa được xóa
                return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Xóa không thành công do có lỗi ở mấy chủ");
            }
        }
        return new ErrorResponse(HttpStatus.FAILED_DEPENDENCY, "Xóa không thành công do đã được gán quyền cho nhân sự");


    }

    //
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
        if ((shiftType.getEnd() != null && !(shiftType.getEnd().toString().equalsIgnoreCase(""))) && ((shiftType.getStart() != null && !(shiftType.getStart().toString().equalsIgnoreCase(""))))) {
            ShiftType shiftTypeToSave = new ShiftType(shiftType.getName(), shiftType.getStart(), shiftType.getEnd());

            try {
                ShiftType shiftTypeSaved = shiftTypeRepository.saveAndFlush(shiftTypeToSave);
                return new Response(HttpStatus.OK, "Thêm loại ca thành công");
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
                return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra trong quá trình lưu");
            }
        }
        return new ErrorResponse(HttpStatus.BAD_REQUEST, "Vui lòng nhập đầy đủ thông tin loại ca");

    }

    //
    @Override
    public ResponseWithData<List<ShiftType>> getAllShiftType() {
        List<ShiftType> shiftTypeList = shiftTypeRepository.findAll();
        return new ResponseWithData<List<ShiftType>>(shiftTypeList, HttpStatus.OK, "Danh sách loại ca làm");

    }

    //
    @Override
    public Response editShiftType(ShiftType shiftType) {
        //Lấy id ca cần chỉnh sửa
        Integer shiftTypeId = shiftType.getId();
        if (shiftTypeId.toString().equalsIgnoreCase("") || shiftTypeId == null)
            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Không thành công do không có id được gữi lên");

        //Tìm trong db
        ShiftType shiftTypeDb = shiftTypeRepository.findOneById(shiftTypeId);
        //Nếu không tìm thấy trong db thì báo lỗi
        if (shiftTypeDb == null) return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin loại ca");

        //Kiểm tra trùng tên
        if (shiftType.getName().equalsIgnoreCase(shiftTypeDb.getName())) {
            return new ErrorResponse(HttpStatus.CONFLICT, "Trùng tên loại ca");
        }
        try {
            shiftTypeRepository.saveAndFlush(new ShiftType(shiftType));
            return new Response(HttpStatus.OK, "Chỉnh sửa ca làm thành công");
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình chỉnh sửa");
        }
    }

    @Override
    public Response deleteShiftType(ShiftType shiftType) {
        //ShiftType DB
        ShiftType shiftTypeDb = shiftTypeRepository.findOneById(shiftType.getId());
        if (shiftTypeDb == null) {
            return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy ca");
        }
        //#################Còn thiếu xóa các chi tiết ca, và xóa các chấm công
        //Tìm xem có phụ thuộc trong shift không
        List<Shift> shiftDb = shiftRepository.findAllByShiftType(shiftTypeDb);
        //Nếu có ca bị phụ thuộc thì không cho xóa
        if (!shiftDb.isEmpty()) {
            return new ErrorResponse(HttpStatus.METHOD_NOT_ALLOWED, "Không thể thực hiện xóa do có ca làm phụ thuộc");
        }
        try {
            shiftTypeRepository.delete(shiftTypeDb);
            shiftTypeRepository.flush();
            return new Response(HttpStatus.OK, "Xóa thành công loại ca làm " + shiftTypeDb.getName());
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình xóa loại ca " + shiftTypeDb.getName());
        }

    }

    //Tạo 1 ca trong ngày
    @Override
    public Response addShift(Shift shift) {
        try {
            Shift shiftToSave = new Shift(shift);
            ShiftType shiftTypeDb = shiftTypeRepository.findOneById(shiftToSave.getShiftType().getId());
            //Kiểm tra Date và lưu Date
            com.project.hrm.Models.Date dateRq = shiftToSave.getDate();

            if (dateRq == null) return new ErrorResponse(HttpStatus.BAD_REQUEST, "Ngày làm không được để trống");

            //Tìm trong db có tồn tại ngày đó chưa
            com.project.hrm.Models.Date dateDb = dateRepository.findOneByDate(dateRq.getDate());
            //Nếu chưa có thì lưu ngày vào csdl
            if (dateDb == null) {
                com.project.hrm.Models.Date dateToSave = new com.project.hrm.Models.Date(dateRq.getDate());
                dateRepository.saveAndFlush(dateToSave);
            }

            Shift shiftSaved = shiftRepository.saveAndFlush(shiftToSave);
            return new ResponseWithData<>(shiftSaved, HttpStatus.OK, "Thêm ca " + shiftTypeDb.getName() + " trong ngày " + shiftToSave.getDate().getDate() + " thành công");
        } catch (Exception ex) {
            System.out.println("Error message " + ex.getMessage());
            Shift rs = shiftRepository.findOneByShiftTypeAndDate(shift.getShiftType(), shift.getDate());
            return new ResponseWithData<>(rs, HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình thêm ca làm: " + ex.getMessage());
        }
    }

    @Override
    public Response deleteShift(Integer shiftId) {
        try {

            Shift shiftDb = shiftRepository.findOneById(shiftId);
            if (shiftDb == null) {
                return new ErrorResponse(HttpStatus.NOT_FOUND, "Ca làm không tồn tại!");
            }
            //Lấy tất cả shiftDetail của ca đó
            //Xóa hết shiftDetail
            //Nếu xóa thành công thì xóa shift
            //Trả về thông báo
            List<ShiftDetail> shiftDetailsToDelete = shiftDetailRepository.findAllByShift(shiftDb);

            for (ShiftDetail shiftDt : shiftDetailsToDelete) {
                //Đưa trường isScheduled trong bản FreeTime về false
                FreeTime freeTimeScheduled = this.freeTimeRepository.findOneByShiftTypeAndDateAndStaff(shiftDt.getShift().getShiftType(), shiftDt.getShift().getDate(), shiftDt.getStaff());
                freeTimeScheduled.setIsSchedule(false);
                this.freeTimeRepository.saveAndFlush(freeTimeScheduled);

                //Xóa shiftDetail
                this.shiftDetailRepository.delete(shiftDt);
                this.shiftDetailRepository.flush();
            }
            shiftDetailRepository.deleteAll(shiftDetailsToDelete);
            shiftDetailRepository.flush();

            //Xóa shift
            shiftRepository.delete(shiftDb);
            shiftRepository.flush();
            return new Response(HttpStatus.OK, "Xóa thành công ca làm");
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Xóa không thành công");
        }

    }

    @Override
    public Response editShift(Shift shift) {
        return null;
    }

    //
//
//    //Sắp lịch làm
//    @Override
//    public Response schedule(ShiftDetailRequest shiftDetailRequests) {
//        System.out.println(shiftDetailRequests);
//        Integer shift_id = shiftDetailRequests.getShift_id();
//        Map<String, String> responseList = new HashMap<>();
//        //Check shift_id
//        if (shift_id == null) {
//            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Mã ca không được bỏ trống");
//        }
//        try {
//            //Tìm shift theo id
//            Shift shiftDb = shiftRepository.findOneById(shift_id);
//            if (shiftDb == null) return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy ca làm");
//            //Nếu có đúng ca làm
//            //Lặp qua lấy ra dataSet
//            if (shiftDetailRequests.getDataSet() == null || shiftDetailRequests.getDataSet().isEmpty())
//                return new ErrorResponse(HttpStatus.BAD_REQUEST, "Lịch làm phải có ít nhất một nhân sự");
//            for (ShiftDetail shift : shiftDetailRequests.getDataSet()) {
//                shift.setShift(shiftDb);
//                String uid = shift.getStaff().getUid();
//                //Tìm staff
//                Staff staff = staffRepository.findByUid(uid);
//                //Nếu không tồn tại nhân sự thì báo lỗi và tiếp tục
//                if (staff == null) {
//                    responseList.put("Error: " + uid, "Lỗi thêm nhân sự " + uid + " vào ca làm! Do không tồn tại");
//                    continue;
//                }
//                //Nếu đã làm trong ca rồi thì cũng báo lỗi và tiếp tục
//                if (shiftDetailRepository.existsShiftDetailByShiftAndStaff(shiftDb, staff)) {
//                    responseList.put("Error: " + uid, "Lỗi thêm nhân sự " + uid + " vào ca làm! Do đã làm ca này");
//                    continue;
//                }
//                shift.setStaff(staff);
//                shiftDetailRepository.saveAndFlush(shift);
//                //Lấy ra freeTime đã dc sắp lịch ròi đánh dấu nó
//                FreeTime freeTimeScheduled = this.freeTimeRepository.findOneByShiftTypeAndDateAndStaff(shiftDb.getShiftType() , shiftDb.getDate(), staff);
//                freeTimeScheduled.setIsSchedule(true);
//                this.freeTimeRepository.saveAndFlush(freeTimeScheduled);
//
//                responseList.put("Success " + staff.getUid(), "Thêm thành công nhân sự: " + staff.getFullName() + " vào ca làm: " + shiftDb.getShiftType().getName() + " " + shiftDb.getDate().getDate());
//            }
//            return new ResponseWithData<>(responseList, HttpStatus.OK, "Lịch làm");
//
//        } catch (Exception ex) {
//            System.out.println(ex.getMessage());
//            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi xảy ra ở máy chủ");
//
//        }
//    }
    //Sắp lịch làm mới
    @Override
    public Response schedule(ShiftDetailRequest shiftDetailRequests) {
        System.out.println(shiftDetailRequests);
        Integer shift_id = shiftDetailRequests.getShift_id();
        Map<String, String> responseList = new HashMap<>();
        //Check shift_id
        if (shift_id == null) {
            return new ErrorResponse(HttpStatus.BAD_REQUEST, "Mã ca không được bỏ trống");
        }
        try {
            //Tìm shift theo id
            Shift shiftDb = shiftRepository.findOneById(shift_id);
            if (shiftDb == null) return new ErrorResponse(HttpStatus.NOT_FOUND, "Không tìm thấy ca làm");
            //Nếu có đúng ca làm
            //Lặp qua lấy ra dataSet
            if (shiftDetailRequests.getDataSet() == null || shiftDetailRequests.getDataSet().isEmpty())
                return new ErrorResponse(HttpStatus.BAD_REQUEST, "Lịch làm phải có ít nhất một nhân sự");

            //Lấy ra danh sách nhân sự đã sắp lịch trước và xóa hết để thêm lại
            List<ShiftDetail> shiftDetailScheduled = this.shiftDetailRepository.findAllByShift(shiftDb);
            for (ShiftDetail shiftDt : shiftDetailScheduled) {
                //Đưa trường isScheduled trong bản FreeTime về false
                FreeTime freeTimeScheduled = this.freeTimeRepository.findOneByShiftTypeAndDateAndStaff(shiftDt.getShift().getShiftType(), shiftDt.getShift().getDate(), shiftDt.getStaff());
                freeTimeScheduled.setIsSchedule(false);
                this.freeTimeRepository.saveAndFlush(freeTimeScheduled);

                //Xóa shiftDetail
                this.shiftDetailRepository.delete(shiftDt);
                this.shiftDetailRepository.flush();
            }

            for (ShiftDetail shift : shiftDetailRequests.getDataSet()) {
                shift.setShift(shiftDb);
                String uid = shift.getStaff().getUid();
                //Tìm staff
                Staff staff = staffRepository.findByUid(uid);
                //Nếu không tồn tại nhân sự thì báo lỗi và tiếp tục
                if (staff == null) {
                    responseList.put("Error: " + uid, "Lỗi thêm nhân sự " + uid + " vào ca làm! Do không tồn tại");
                    continue;
                }
                //Nếu đã làm trong ca rồi thì cũng báo lỗi và tiếp tục
                if (shiftDetailRepository.existsShiftDetailByShiftAndStaff(shiftDb, staff)) {
                    responseList.put("Error: " + uid, "Lỗi thêm nhân sự " + uid + " vào ca làm! Do đã làm ca này");
                    continue;
                }
                shift.setStaff(staff);

                shiftDetailRepository.saveAndFlush(shift);
                //Lấy ra freeTime đã dc sắp lịch ròi đánh dấu nó
                FreeTime freeTimeScheduled = this.freeTimeRepository.findOneByShiftTypeAndDateAndStaff(shiftDb.getShiftType(), shiftDb.getDate(), staff);
                freeTimeScheduled.setIsSchedule(true);
                this.freeTimeRepository.saveAndFlush(freeTimeScheduled);

                responseList.put("Success " + staff.getUid(), "Thêm thành công nhân sự: " + staff.getFullName() + " vào ca làm: " + shiftDb.getShiftType().getName() + " " + shiftDb.getDate().getDate());
            }
            return new ResponseWithData<>(responseList, HttpStatus.OK, "Lịch làm");

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi xảy ra ở máy chủ");

        }
    }

    //Xoá nhân sự ra khỏi ca làm, có thể xo luôn tất cả nhân viên trong ca và đồng thời xoá luôn ca đó
    @Override
    public Response deleteSchedule(List<ShiftDetail> shiftDetails) {
        Map<String, String> responseList = new HashMap<>();
        for (ShiftDetail shiftDetail : shiftDetails) {
            // Kiểm tra id có tồn tại không
            ShiftDetail shiftDetailDb = shiftDetailRepository.findOneById(shiftDetail.getId());

            if (shiftDetailDb != null) {
                try {
                    shiftDetailRepository.delete(shiftDetailDb);
                    shiftDetailRepository.flush();
                    responseList.put("Success: " + shiftDetailDb.getStaff().getFullName(), "Xóa thành công nhân sự: " + shiftDetailDb.getStaff().getFullName() + " ra khỏi ca " + shiftDetailDb.getShift().getShiftType().getName() + " " + shiftDetailDb.getShift().getDate().getDate());

                } catch (Exception ex) {

                    System.out.println(ex.getMessage());
                }
            } else
                responseList.put("Error: Xóa chi tiết ca id: " + shiftDetail.getId() + " không thành công", "Không tồn tại chi tiết ca có id: " + shiftDetail.getId());

        }
        return new ResponseWithData<>(responseList, HttpStatus.OK, "Phản hồi xóa chi tiết ca làm");
    }

    @Override
    public ResponseWithData<List<ShiftDetail>> getAllSchedules() {
        return null;
    }


    @Override
    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfDay(com.project.hrm.Models.Date date) {
        // Tìm ca làm của ngày dc gữi lên
        List<Shift> shiftOfDate = shiftRepository.findByDate(date);
        return new ResponseWithData<>(shiftDetailRepository.findByShiftIn(shiftOfDate), HttpStatus.OK, "Danh sách thông tin lịch làm ngày: " + date.getDate());
    }

    @Override
    public ResponseWithData<List<ShiftDetail>> getAllMyScheduleBetweenStartAndEnd(Date start, Date end) {
        com.project.hrm.Models.Date dateStart = new com.project.hrm.Models.Date(start);
        com.project.hrm.Models.Date dateEnd = new com.project.hrm.Models.Date(end);
        List<Shift> shift = shiftRepository.findAllByDateBetween(dateStart, dateEnd);
        List<ShiftDetail> shiftDetails = new ArrayList<>();

        for (Shift shiftId : shift) {

            List<ShiftDetail> shiftDetailList = shiftDetailRepository.findAllByShift(shiftId);
            shiftDetails.addAll(shiftDetailList);
        }

        if (shiftDetails.isEmpty()) {
            return new ResponseWithData<>(null, HttpStatus.NOT_FOUND, "Không tìm thấy ca làm việc");
        }
        return new ResponseWithData<>(shiftDetails, HttpStatus.OK, "Danh sách làm việc");
    }
//    @Override
//    public Response deleteListStaffOnSchedule(List<Staff> staffs, Shift shift) {
//        return null;
//    }

    @Override
    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfShiftOfDate(ShiftType shiftType, Date date) {
        com.project.hrm.Models.Date date1 = new com.project.hrm.Models.Date(date);
        List<Shift> shiftOfDate = shiftRepository.findAllByShiftTypeAndDate(shiftType, date1);
        List<ShiftDetail> shiftDetails = new ArrayList<>();
        System.out.println(date1);
        for (Shift shiftId : shiftOfDate) {

            List<ShiftDetail> shiftDetailList = shiftDetailRepository.findAllByShift(shiftId);
            shiftDetails.addAll(shiftDetailList);
        }


        List<ShiftDetail> shiftDetailsNotInTimekeeping = new ArrayList<>();
        for (ShiftDetail shiftDetailID : shiftDetails) {
            boolean isInTimekeeping = isShiftDetailInTimekeeping(shiftDetailID);
            if (!isInTimekeeping) {
                shiftDetailsNotInTimekeeping.add(shiftDetailID);
            }
        }
        if (shiftDetails.isEmpty()) {
            return new ResponseWithData<>(new ArrayList<>(), HttpStatus.NOT_FOUND, "Không tìm thấy ca làm việc");
        }
        return new ResponseWithData<List<ShiftDetail>>(shiftDetailsNotInTimekeeping, HttpStatus.OK, "Danh sách làm việc");

    }

    private boolean isShiftDetailInTimekeeping(ShiftDetail shiftDetail) {
        Timekeeping timekeeping = timeKeepingRepository.findByShiftDetail(shiftDetail);
        return timekeeping != null;
    }

    //Lấy danh sách lịch rảnh của nhân sự chưa được sắp vào lịch dựa vào 1 ca trong 1 ngày
    @Override
    public Response getAllFreeTimeNotScheduledOfShiftTypeAndDate(ShiftType shiftType, Date date) {
        ResponseWithData<List<ShiftDetail>> rs = this.getAllSchedulesOfShiftOfDate(shiftType, date); //Lấy danh sách lịch làm của ca đó và ngày đó
        com.project.hrm.Models.Date dateToFind = new com.project.hrm.Models.Date(date);
        ShiftType shiftTypeRq = new ShiftType(shiftType);
        //Lấy danh sách freeTime chưa được lập lịch
        List<FreeTime> freeTimes = this.freeTimeRepository.findAllByShiftTypeAndDateAndIsScheduleFalse(shiftTypeRq, dateToFind);
//        //Lấy danh sách Staff đã được sắp lịch
//        List<Staff> staff = new ArrayList<>();
//        List<ShiftDetail> listShiftDetail = rs.getData();
        if (freeTimes.isEmpty())
            return new Response(HttpStatus.NOT_FOUND, "Không tìm thấy lịch rảnh ca " + shiftTypeRq.getName() + " ngày " + dateToFind.getDate());
        return new ResponseWithData<>(freeTimes, HttpStatus.OK, "Danh sách lịch rảnh ca " + shiftTypeRq.getName() + " ngày " + dateToFind.getDate()); //TEST
    }

    @Override
    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Shift shift) {

        return null;
    }


    @Override
    public Response getAllWorkCheckeds() {
        try {
            List<Timekeeping> timekeepings = timeKeepingRepository.findAll();
            return new ResponseWithData<>(timekeepings, HttpStatus.OK, "Tìm kiếm thành công");
        } catch (Exception ex) {
            // Xử lý ngoại lệ tại đây
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong việc lấy thông tin chấm công");
        }
    }

    @Override
    public Response workCheckeds(List<Timekeeping> timeKeepings) {
        List<Timekeeping> savedTimekeepings = new ArrayList<>();

        for (Timekeeping timekeeping : timeKeepings) {
            // Save each Timekeeping object to the database
            Timekeeping savedTimekeeping = timeKeepingRepository.save(timekeeping);
            savedTimekeepings.add(savedTimekeeping);
        }

        if (savedTimekeepings.isEmpty()) {
            return new Response(HttpStatus.NOT_FOUND, "Không có chấm công");
        }

        return new Response(HttpStatus.OK, "Chấm công thành công");
    }


    @Override
    public Response deleteListWorkCheckeds(List<Timekeeping> timeKeepings) {
        return null;
    }

    //Lấy chấm công của nhan viên qua uid trong khoản tg
    @Override
    public ResponseWithData<List<Timekeeping>> getAllScheduleOfStaffInTimeKeeping(Date start,Date end, String Uid){
        com.project.hrm.Models.Date dateStart = new com.project.hrm.Models.Date(start);
        com.project.hrm.Models.Date dateEnd = new com.project.hrm.Models.Date(end);
        List<Shift> shiftList = shiftRepository.findAllByDateBetween(dateStart, dateEnd);
        List<ShiftDetail> shiftDetailList = shiftDetailRepository.findByShiftIn(shiftList);

        List<ShiftDetail> shiftDetailForStaff = new ArrayList<>();
        for(ShiftDetail shiftDetail : shiftDetailList){
            if(shiftDetail.getStaff().getUid().equals(Uid)){
                shiftDetailForStaff.add(shiftDetail);
            }
        }

        List<Timekeeping> shiftDetailsInTimekeeping = new ArrayList<>();
        for (ShiftDetail shiftDetailID : shiftDetailForStaff) {
            Timekeeping timekeeping = timeKeepingRepository.findByShiftDetail(shiftDetailID);
            if (timekeeping != null) {
                shiftDetailsInTimekeeping.add(timekeeping);
            }
        }

        if(shiftDetailForStaff.isEmpty()){
            return new ResponseWithData<>(null,HttpStatus.NOT_FOUND,"Không tìm thấy ca làm việc");
        }


        return new ResponseWithData<>(shiftDetailsInTimekeeping,HttpStatus.OK,"Danh sách ca làm việc đã chấm công");
    }

}
