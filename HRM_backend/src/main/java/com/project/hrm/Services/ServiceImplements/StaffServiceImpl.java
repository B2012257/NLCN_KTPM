package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.Staff;
import com.project.hrm.Models.WorkTime;
import com.project.hrm.Repositorys.ShiftDetailRepository;
import com.project.hrm.Repositorys.StaffRepository;
import com.project.hrm.Repositorys.WorkTimeRepository;
import com.project.hrm.Services.StaffService;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private StaffRepository staffRepository;

    private ShiftDetailRepository shiftDetailRepository;


    private WorkTimeRepository workTimeRepository;
    @Override
    public ResponseWithData<Staff> getInformation(Staff staff) {

        Staff staffId = staffRepository.findById(staff.getUid()).orElse(null);

        if(staffId != null){
            return new ResponseWithData<>(staffId, HttpStatus.OK,"Lay thong tin thanh cong");

        }
        return new ResponseWithData<>(null,HttpStatus.NOT_FOUND,"Khong co nhan vien");
    }

    @Override
    public Response editProfileInfomation(Staff newStaffInfo) {
        Staff staff = staffRepository.findById(newStaffInfo.getUid()).orElse(null);
        if(staff != null){
            staff.setFullName(newStaffInfo.getFullName());
            staff.setPhone(newStaffInfo.getPhone());
            staff.setBankAccount(newStaffInfo.getBankAccount());
            staff.setBankName(newStaffInfo.getBankName());
            staff.setRole(newStaffInfo.getRole());
            staff.setLocation(newStaffInfo.getLocation());
            staffRepository.save(staff);

            return new Response(HttpStatus.OK,"Thay doi thong tin thanh cong");
        }

        return new Response(HttpStatus.NOT_FOUND,"Khong tim thay nhan vien");
    }

    @Override
    public Response changePassword(String newPassword, String uid) {
        Staff staff = staffRepository.findById(uid).orElse(null);
        if(staff != null){
            staff.setPassword(newPassword);
            staffRepository.save(staff);

            return new Response(HttpStatus.OK,"Thay doi mat khau thanh cong");
        }


        return new Response(HttpStatus.NOT_FOUND,"Khong tim thay nhan vien");
    }

    @Override
    public Response changeAvatar(String newUrl , String uid) {
        Staff staff = staffRepository.findById(uid).orElse(null);
        if(staff != null){
            staff.setUrlAvatar(newUrl);
            staffRepository.save(staff);

            return new Response(HttpStatus.OK,"Thay doi avatar thanh cong");
        }


        return new Response(HttpStatus.NOT_FOUND,"Khong tim thay nhan vien");



    }

    @Override
    public ResponseWithData<List<ShiftDetail>> getAllMyScheduleBetweenStartAndEnd(Date start, Date end) {

       return null;


    }

    @Override
    public Response registerSchedule(WorkTime workTime) {
         WorkTime addWorkTime = new WorkTime();
         addWorkTime.setId(workTime.getId());
         addWorkTime.setWeekName(workTime.getWeekName());
         addWorkTime.setStart(workTime.getStart());
         addWorkTime.setEnd(workTime.getEnd());


         workTimeRepository.save(addWorkTime);

        return new Response(HttpStatus.OK,"Them thanh cong");
    }

    @Override
    public Response editRegisterSchedule(List<WorkTime> workTime) {
        for (WorkTime workTimeId : workTime){
            WorkTime workTime1 = workTimeRepository.findById(workTimeId.getId()).orElse(null);
            if(workTime1 !=null){
                workTime1.setWeekName(workTimeId.getWeekName());
                workTime1.setStart(workTimeId.getStart());
                workTime1.setEnd(workTimeId.getEnd());

                workTimeRepository.save(workTime1);

            }


        }


        return new Response(HttpStatus.OK,"sua thanh cong");
    }
}
