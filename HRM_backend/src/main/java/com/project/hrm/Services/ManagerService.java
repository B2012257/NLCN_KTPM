package com.project.hrm.Services;

import com.project.hrm.payloads.Request.ShiftDetailRequest;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.*;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ManagerService {
    //    ############### Chức năng thông tin cá nhân ###################
    //Phong làm
    //Lấy thông tin cá nhân
//    public Response getInformation(String uid);
//
//    //Thay đổi mật khẩu
//    public Response changePassword(String newPassword, String uid);
//
//    //Đổi ảnh đại diện
//    public Response changeAvatar(String newUrl, String uid);


    //############ Chức năng thao tác nhân sự ###############

    //Lấy thông tin 1 nhân sự qua uid
    public Response getStaff(String uid);

    //Lấy thông tin 1 danh sách nhân sự
    public Response getAllStaff();

    //Thêm mới 1 nhân sự
    public Response addStaff(Staff newStaff);

    //Lấy ra nhân sự vừa mới thêm
    public Response getRecentStaff(Date start, Date end); //truyền vào ngày mốc để lấy 7 ngày kể từ ngày mốc
    //Chỉnh sửa thông tin 1 nhân sự
    public Response editStaff(Staff newStaff);

    //Xóa 1 nhân sự
    public Response deleteStaff(String uid);

    //Tìm kiếm theo họ và tên nhân viên
    public Response searchStaffByPartialName(String partialName);


    //    ############## Chưc năng thao tác lịch làm việc #####################

    //Thêm một chức vụ mới
    public Response addType(Type type);

    //Lấy thông tin tất cả các chức vụ trong hệ thống
    public Response getAllType();

    //Chỉnh sửa thông tin chức vụ
    public Response editType(Type type);

    //Xóa một chức vụ
    public Response deleteType(Type type);

    //Thêm một bậc lương
    public Response addSalary(Salary salary);

    //Lấy ra các bậc lương
    public ResponseWithData<List<Salary>> getAllSalary();

    //Chỉnh sửa thông tin bậc lương
    public Response editSalary(Salary salary);

    //Xóa 1 bậc lương
    public Response deleteSalary(Salary salary);

    //Thêm 1 loại ca làm
    public Response addShiftType(ShiftType shiftType);

    //Lấy ra thông tất cả loại ca làm
    public ResponseWithData<List<ShiftType>> getAllShiftType();

    //Chỉnh sửa thông tin 1 loại ca làm
    public Response editShiftType(ShiftType shiftType);

    //Xóa 1 loại ca làm
    public Response deleteShiftType(ShiftType shiftType);

    //Thêm 1 ca làm
    public Response addShift(Shift shift);

    //Xóa 1 ca làm
    public Response deleteShift(Shift shift);

    //Sửa 1 ca làm
    public Response editShift(Shift shift);

    //Lập lịch làm (shiftDetail) // Xử lí tạo 1 ca trong ngày,
    // rồi tạo 1 danh sach chi tiết ca cho danh sách nhân viên
    // Mặc định sau khi tạo 1 ca thì tạo luôn bảng chấm công
    public Response schedule(ShiftDetailRequest shiftDetailRq);

    //Xóa 1 lịch làm (shiftDetail) của 1 ca trong ngày
    public Response deleteSchedule(List<ShiftDetail> shiftDetails);

    //Lấy tất cả thông tin ca làm của các nhân viên trong 1 ca
    public ResponseWithData<List<ShiftDetail>> getAllSchedules();

    //Lấy tất cả thông tin ca làm của các nhân viên trong 1 ngày
    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfDay(com.project.hrm.Models.Date date);

    //Xóa 1 danh sách nhân viên ra khỏi ca
//    public Response deleteListStaffOnSchedule(List<Staff> staffs, Shift shift);

    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfShiftOfDate(ShiftType shiftType, Date date);

    //Lấy tất cả danh sách chấm công nhân sự trong 1 ca
    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Shift shift);
    public ResponseWithData<List<ShiftDetail>> getAllMyScheduleBetweenStartAndEnd(Date start, Date end);
    //Lấy tất cả danh sách chấm công nhân sự trong 1 ngày (tất cả các ca trong ngày)
    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Date date);

    //Chấm công một danh sách nhân sự
    public Response workCheckeds(List<Timekeeping> timeKeepings);

    //Xóa chấm công một danh sách nhân sự
    public Response deleteListWorkCheckeds(List<Timekeeping> timeKeepings);

    //...
}
