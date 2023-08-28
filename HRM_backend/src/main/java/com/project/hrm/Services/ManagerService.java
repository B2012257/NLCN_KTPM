package com.project.hrm.Services;

import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.*;

import java.util.Date;
import java.util.List;

public interface ManagerService {
    //    ############### Chức năng thông tin cá nhân ###################
    //Phong làm
    //Lấy thông tin cá nhân
    public Response getInformation(String uid);

    //Chỉnh sửa thông tin cá nhân
    public ResponseWithData<Manager> editProfileInformation(Manager managerNewInfo);

    //Thay đổi mật khẩu
    public Response changePassword(String newPassword, String uid);

    //Đổi ảnh đại diện
    public Response changeAvatar(String newUrl);


    //############ Chức năng thao tác nhân sự ###############

    //Lấy thông tin 1 nhân sự qua uid
    public Response getStaff(String uid);

    //Lấy thông tin 1 danh sách nhân sự
    public ResponseWithData<List<Staff>> getAllStaff();

    //Thêm mới 1 nhân sự
    public Response addStaff(Staff newStaff);

    //Chỉnh sửa thông tin 1 nhân sự
    public ResponseWithData<Staff> editStaff(Staff newStaff);

    //Xóa 1 nhân sự
    public Response deleteStaff();

    //Tìm kiếm theo họ và tên nhân viên
    public ResponseWithData<List<Staff>> searchStaffByFullName(String fullName);


    //    ############## Chưc năng thao tác lịch làm việc #####################

    //Thêm một chức vụ mới
    public Response addRole(Role role);

    //Lấy thông tin tất cả các chức vụ trong hệ thống
    public ResponseWithData<List<Role>> getAllRole();

    //Chỉnh sửa thông tin chức vụ
    public Response editRole(Role role);

    //Xóa một chức vụ
    public Response deleteRole(Role role);

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
    public ResponseWithData<Shift> addShift(Shift shift);

    //Xóa 1 ca làm
    public Response deleteShift(Shift shift);

    //Sửa 1 ca làm
    public Response editShift(Shift shift);

    //Lập lịch làm (shiftDetail) // Xử lí tạo 1 ca trong ngày,
    // rồi tạo 1 danh sach chi tiết ca cho danh sách nhân viên
    // Mặc định sau khi tạo 1 ca thì tạo luôn bảng chấm công
    public Response schedule(ShiftDetail shiftDetail);

    //Xóa 1 lịch làm (shiftDetail) của 1 ca trong ngày
    public Response deleteSchedule(ShiftDetail shiftDetail);

    //Lấy tất cả thông tin ca làm của các nhân viên trong 1 ca
    public ResponseWithData<List<ShiftDetail>> getAllSchedules(Shift shift);

    //Lấy tất cả thông tin ca làm của các nhân viên trong 1 ngày
    public ResponseWithData<List<ShiftDetail>> getAllSchedulesOfDay(Date date);

    //Xóa 1 danh sách nhân viên ra khỏi ca
    public Response deleteListStaffOnSchedule(List<Staff> staffs, Shift shift);

    //Lấy tất cả danh sách chấm công nhân sự trong 1 ca
    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Shift shift);

    //Lấy tất cả danh sách chấm công nhân sự trong 1 ngày (tất cả các ca trong ngày)
    public ResponseWithData<Timekeeping> getAllWorkCheckeds(Date date);

    //Chấm công một danh sách nhân sự
    public Response workCheckeds(List<Timekeeping> timeKeepings);

    //Xóa chấm công một danh sách nhân sự
    public Response deleteListWorkCheckeds(List<Timekeeping> timeKeepings);

    //...
}
