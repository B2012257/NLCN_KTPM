package com.project.hrm.Services;


import com.project.hrm.Models.FreeTime;
import com.project.hrm.Models.ShiftType;
import com.project.hrm.Models.Staff;
import com.project.hrm.Models.Timekeeping;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.Models.ShiftDetail;

import java.util.Date;
import java.util.List;

public interface StaffService {
    //Tín làm

    //    ############### Chức năng thông tin cá nhân ###################

    //Lấy thông tin cá nhân
    public ResponseWithData<Staff> getInformation(String staff);
    //Chỉnh sửa thông tin cá nhân
    public Response editProfileInformation(Staff newStaffInfo);
    public ResponseWithData<List<ShiftType>> getAllShiftType();
    //Thay đổi mật khẩu
    public Response changePassword(String newPassword, String uid);

    //Đổi ảnh đại diện
    public Response changeAvatar(String newUrl, String uid);


    // ####################Chức năng lịch làm của nhân sự #########

    //Lấy danh sách lịch làm trong khoảng thời gian , truyền vào ngày bắt đầu và kết thúc
    public ResponseWithData<List<ShiftDetail>> getAllMyScheduleBetweenStartAndEnd(Date start, Date end);

    //Đăng ký lịch làm, đăng ký khoảng thời gian rảnh có thể đi làm
    public Response registerSchedule(List<FreeTime> freeTime);

    //Chỉnh sửa lich làm, nhận vào danh sách
    public Response editRegisterSchedule(List<FreeTime> freeTimes);


    public ResponseWithData<List<FreeTime>> getFreeTimeOfStaffInDate(Date date, Staff staff);

    public Response deleteFreeTime(FreeTime freeTime);

    public ResponseWithData<List<Timekeeping>> getAllScheduleOfStaffInTimeKeeping(Date date, String Uid);



    public ResponseWithData<List<ShiftDetail>> getAllScheduleOfStaffNotInTimeKeeping(Date date, String Uid);

    public ResponseWithData<List<Timekeeping>> getAllTimeKeeping (Date start, Date end , String Uid);

    public ResponseWithData<List<ShiftDetail>> getAllNotTimeKeepingStartAndEnd (Date start, Date end , String Uid);
}
