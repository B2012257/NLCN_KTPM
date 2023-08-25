package com.project.hrm.Services;

import com.project.hrm.DTOs.Request.ShiftDetailDTO;
import com.project.hrm.DTOs.Request.StaffDTO;
import com.project.hrm.DTOs.Request.WorkTimeDTO;
import com.project.hrm.DTOs.Response.Response;
import com.project.hrm.DTOs.Response.ResponseWithData;

import java.util.Date;
import java.util.List;

public interface StaffService {
    //Tín làm
    
    //    ############### Chức năng thông tin cá nhân ###################

    //Lấy thông tin cá nhân
    public ResponseWithData<StaffDTO> getInformation(StaffDTO staff);
    //Chỉnh sửa thông tin cá nhân
    public Response editProfileInfomation(StaffDTO newStaffInfo);

    //Thay đổi mật khẩu
    public Response changePassword(String newPassword, String uid);

    //Đổi ảnh đại diện
    public Response changeAvatar(String newUrl);


    // ####################Chức năng lịch làm của nhân sự #########

    //Lấy danh sách lịch làm trong khoảng thời gian , truyền vào ngày bắt đầu và kết thúc
    public ResponseWithData<List<ShiftDetailDTO>> getAllMyScheduleBetweenStartAndEnd(Date start, Date end);

    //Đăng ký lịch làm, đăng ký khoảng thời gian rảnh có thể đi làm
    public Response registerSchedule(WorkTimeDTO workTime);

    //Chỉnh sửa lich làm, nhận vào danh sách
    public Response editRegisterSchedule(List<WorkTimeDTO> workTime);
}
