package com.project.hrm.Services;

import com.project.hrm.Models.Staff;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.WorkTime;

import java.util.Date;
import java.util.List;

public interface StaffService {
    //Tín làm
    
    //    ############### Chức năng thông tin cá nhân ###################

    //Lấy thông tin cá nhân
    public ResponseWithData<Staff> getInformation(Staff staff);
    //Chỉnh sửa thông tin cá nhân
    public Response editProfileInfomation(Staff newStaffInfo);

    //Thay đổi mật khẩu
    public Response changePassword(String newPassword, String uid);

    //Đổi ảnh đại diện
    public Response changeAvatar(String newUrl, String uid);


    // ####################Chức năng lịch làm của nhân sự #########

    //Lấy danh sách lịch làm trong khoảng thời gian , truyền vào ngày bắt đầu và kết thúc
    public ResponseWithData<List<ShiftDetail>> getAllMyScheduleBetweenStartAndEnd(Date start, Date end);

    //Đăng ký lịch làm, đăng ký khoảng thời gian rảnh có thể đi làm
    public Response registerSchedule(WorkTime workTime);

    //Chỉnh sửa lich làm, nhận vào danh sách
    public Response editRegisterSchedule(List<WorkTime> workTime);
}
