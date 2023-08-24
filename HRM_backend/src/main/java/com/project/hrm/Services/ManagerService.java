package com.project.hrm.Services;

import com.project.hrm.DTOs.Request.*;
import com.project.hrm.DTOs.Response.Response;
import com.project.hrm.DTOs.Response.ResponseWithData;
import com.project.hrm.Models.Shift;
import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.ShiftType;

import java.util.Date;
import java.util.List;

public interface ManagerService {
    //    ############### Chức năng thông tin cá nhân ###################

    //Lấy thông tin cá nhân
    public ResponseWithData<ManagerDTO> getInformation(ManagerDTO manager);

    //Chỉnh sửa thông tin cá nhân
    public ResponseWithData<ManagerDTO> editProfileInformation(ManagerDTO managerNewInfo);

    //Thay đổi mật khẩu
    public Response changePassword(String newPassword, String uid);

    //Đổi ảnh đại diện
    public Response changeAvatar(String newUrl);


    //############ Chức năng thao tác nhân sự ###############

    //Lấy thông tin 1 nhân sự qua uid
    public ResponseWithData<StaffDTO> getStaff(String uid);

    //Lấy thông tin 1 danh sách nhân sự
    public ResponseWithData<List<StaffDTO>> getAllStaff();

    //Thêm mới 1 nhân sự
    public Response addStaff(StaffDTO newStaff);

    //Chỉnh sửa thông tin 1 nhân sự
    public ResponseWithData<StaffDTO> editStaff(StaffDTO newStaff);

    //Xóa 1 nhân sự
    public Response deleteStaff();

    //Tìm kiếm theo họ và tên nhân viên
    public ResponseWithData<List<StaffDTO>> searchStaffByFullName(String fullName);


    //    ############## Chưc năng thao tác lịch làm việc #####################

    //Thêm một chức vụ mới
    public Response addRole(RoleDTO role);

    //Lấy thông tin tất cả các chức vụ trong hệ thống
    public ResponseWithData<List<RoleDTO>> getAllRole();

    //Chỉnh sửa thông tin chức vụ
    public Response editRole(RoleDTO role);

    //Xóa một chức vụ
    public Response deleteRole(RoleDTO role);

    //Thêm một bậc lương
    public ResponseWithData<SalaryDTO> addSalary(SalaryDTO salary);

    //Lấy ra các bậc lương
    public ResponseWithData<SalaryDTO> getAllSalary();

    //Chỉnh sửa thông tin bậc lương
    public Response editSalary(SalaryDTO salary);

    //Xóa 1 bậc lương
    public Response deleteSalary(SalaryDTO salary);

    //Thêm 1 loại ca làm
    public Response addShiftType(ShiftTypeDTO shiftType);

    //Lấy ra thông tất cả loại ca làm
    public ResponseWithData<List<ShiftTypeDTO>> getAllShiftType();

    //Chỉnh sửa thông tin 1 loại ca làm
    public Response editShiftType(ShiftTypeDTO shiftType);

    //Xóa 1 loại ca làm
    public Response deleteShiftType(ShiftTypeDTO shiftType);

    //Thêm 1 ca làm
    public ResponseWithData<ShiftDTO> addShift(ShiftDTO shift);

    //Xóa 1 ca làm
    public Response deleteShift(ShiftDTO shift);

    //Sửa 1 ca làm
    public Response editShift(ShiftDTO shift);

    //Lập lịch làm (shiftDetail) // Xử lí tạo 1 ca trong ngày,
    // rồi tạo 1 danh sach chi tiết ca cho danh sách nhân viên
    // Mặc định sau khi tạo 1 ca thì tạo luôn bảng chấm công
    public Response schedule(ShiftDetailDTO shiftDetail);

    //Xóa 1 lịch làm (shiftDetail) của 1 ca trong ngày
    public Response deleteSchedule(ShiftDetailDTO shiftDetail);

    //Lấy tất cả thông tin ca làm của các nhân viên trong 1 ca
    public ResponseWithData<List<ShiftDetailDTO>> getAllSchedules(ShiftDTO shift);

    //Lấy tất cả thông tin ca làm của các nhân viên trong 1 ngày
    public ResponseWithData<List<ShiftDetailDTO>> getAllSchedulesOfDay(Date date);

    //Xóa 1 danh sách nhân viên ra khỏi ca
    public Response deleteListStaffOnSchedule(List<StaffDTO> staffs, ShiftDTO shift);

    //Lấy tất cả danh sách chấm công nhân sự trong 1 ca
    public ResponseWithData<TimeKeepingDTO> getAllWorkCheckeds(ShiftDTO shift);

    //Lấy tất cả danh sách chấm công nhân sự trong 1 ngày (tất cả các ca trong ngày)
    public ResponseWithData<TimeKeepingDTO> getAllWorkCheckeds(Date date);

    //Chấm công một danh sách nhân sự
    public Response workCheckeds(List<TimeKeepingDTO> timeKeepings);

    //Xóa chấm công một danh sách nhân sự
    public Response deleteListWorkCheckeds(List<TimeKeepingDTO> timeKeepings);

    //...
}
