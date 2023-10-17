package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.Models.*;
import com.project.hrm.Repositorys.*;
import com.project.hrm.Services.StaffService;
import com.project.hrm.payloads.Response.ErrorResponse;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private ShiftDetailRepository shiftDetailRepository;

    @Autowired
    private WorkRegisterRepository workRegisterRepository;

    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private DateRepository dateRepository;

    @Autowired
    private ShiftTypeRepository shiftTypeRepository;
    @Override
    public ResponseWithData<Staff> getInformation(String Uid) {

        Staff staffId = staffRepository.findById(Uid).orElse(null);

        if (staffId != null) {
            return new ResponseWithData<>(staffId, HttpStatus.OK, "Lấy thông tin thành công");

        }
        return new ResponseWithData<>(null, HttpStatus.NOT_FOUND, "Không tìm thấy thông tin");
    }

    @Override
    public Response editProfileInformation(Staff newStaffInfo) {
        Staff staff = staffRepository.findById(newStaffInfo.getUid()).orElse(null);
        if (staff != null) {
            staff.setFullName(newStaffInfo.getFullName());
            staff.setGender(newStaffInfo.getGender());
            staff.setPhone(newStaffInfo.getPhone());
            staff.setBankAccount(newStaffInfo.getBankAccount());
            staff.setBankName(newStaffInfo.getBankName());
            staff.setBeginWork(newStaffInfo.getBeginWork());
            staff.setLocation(newStaffInfo.getLocation());
            staff.setUrlAvatar(newStaffInfo.getUrlAvatar());
            staffRepository.saveAndFlush(staff);
            return new Response(HttpStatus.OK, "Thay đổi thông tin thành công");
        }

        return new Response(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin");
    }

    @Override
    public Response changePassword(String newPassword, String uid) {
        Staff staff = staffRepository.findById(uid).orElse(null);
        if (staff != null) {
            staff.setPassword(newPassword);
            staffRepository.save(staff);

            return new Response(HttpStatus.OK, "Thay đổi mật khẩu thành công");
        }


        return new Response(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin cần thay đổi");
    }

    @Override
    public Response changeAvatar(String newUrl, String uid) {
        Staff staff = staffRepository.findById(uid).orElse(null);
        if (staff != null) {
            staff.setUrlAvatar(newUrl);
            staffRepository.saveAndFlush(staff);
            return new Response(HttpStatus.OK, "Thay đổi avatar thành công");
        }


        return new Response(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin cần thay đổi");


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

    @Override
    public Response registerSchedule(FreeTime freeTime) {
        try {
            com.project.hrm.Models.Date dateToCheck = freeTime.getDate();

            // Kiểm tra xem ngày đã tồn tại trong bảng 'date' chưa
            boolean dateExists = workRegisterRepository.existsByDate(dateToCheck);

            // Thêm ngày vào bảng 'date' nếu chưa tồn tại
            if (!dateExists) {
                com.project.hrm.Models.Date newDate = new com.project.hrm.Models.Date(dateToCheck.getDate());
                dateRepository.saveAndFlush(newDate);
            }

            // Thêm freeTime
            FreeTime freeTimeID = new FreeTime(freeTime);
            workRegisterRepository.saveAndFlush(freeTimeID);

            return new Response(HttpStatus.OK, "Đăng ký thời gian rảnh thành công");
        } catch (RuntimeException ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi");
        }
    }


    @Override
    public Response editRegisterSchedule(List<FreeTime> freeTimes) {
//        for (FreeTime freeTime : freeTimes) {
//
//            // Lấy thông tin freeTime theo ID
//            FreeTime existingFreeTime = workRegisterRepository.findById(freeTime.getId()).orElse(null);
//
//            if (existingFreeTime != null) {
//                // Cập nhật thông tin freeTime
//                existingFreeTime.setWeekName(freeTime.getWeekName());
//                existingFreeTime.setStart(freeTime.getStart());
//                existingFreeTime.setEnd(freeTime.getEnd());
//
//                // Kiểm tra xem ngày đã tồn tại trong bảng 'date' chưa
//                com.project.hrm.Models.Date dateToCheck = freeTime.getDate();
//                boolean dateExists = workRegisterRepository.existsByDate(dateToCheck);
//                if (!dateExists) {
//                    // Nếu ngày chưa tồn tại, thêm mới ngày
//                    com.project.hrm.Models.Date newDate = new com.project.hrm.Models.Date(dateToCheck.getDate());
//                    dateRepository.saveAndFlush(newDate);
//                }
//                existingFreeTime.setDate(freeTime.getDate());
//                workRegisterRepository.saveAndFlush(existingFreeTime);
//            }
//        }
//        return new Response(HttpStatus.OK, "Cập nhật thành công");
        return null;
    }

    @Override
    public ResponseWithData<List<ShiftType>> getAllShiftType() {
        List<ShiftType> shiftTypeList = shiftTypeRepository.findAll();
        return new ResponseWithData<List<ShiftType>>(shiftTypeList, HttpStatus.OK, "Danh sách loại ca làm");

    }
}
