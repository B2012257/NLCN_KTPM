package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.Staff;
import com.project.hrm.Repositorys.ShiftDetailRepository;
import com.project.hrm.Repositorys.StaffRepository;
import com.project.hrm.Services.StatisticsService;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.payloads.Response.StatisticsMonth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//Thiết lập các chức năng liên quan đến thống kê
@Service
public class StatisticsServiceImplements implements StatisticsService {

    //Thống kê theo tháng dựa vào vào ngày xem báo cáo (Từ ngày bắt đầu tháng đến ngày xem báo cáo)
    //Hàm này trả về thống kê của toàn bộ nhân sự có đi làm trong tháng
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private ShiftDetailRepository shiftDetailRepository;

    @Autowired
    ManagerServiceImpl managerService;

    @Override
    public ResponseWithData MonthlyStatisticsWorking(Date dateViewStatistics) {
        //Lấy ra tháng, năm thống kê
        //Tìm tất cả Shift trong tháng
        //Tìm tất cả ShiftDetail của từng Shift, tìm timeKeeping của từng shiftDetail, nếu có thì đã chấm công
        //Còn null thì không tính -> Lấy dc các id shiftDetail được chấm công -> Lấy được danh sách nhân sự dc thống kê
        Sort sortByType = Sort.by(Sort.Direction.ASC, "type");
        List<Staff> listStaffOrderByType = staffRepository.findAll(sortByType);
        Date startMonth = new Date("2023/10/01");
        Date endMonth = new Date("2023/10/31");
        List rs = new ArrayList<>();
        for (Staff staff : listStaffOrderByType) {
            List shiftDetail = shiftDetailRepository.findByShiftDateBetweenAndStaff(new com.project.hrm.Models.Date(startMonth),
                    new com.project.hrm.Models.Date(endMonth),
                    staff);
            if (shiftDetail.isEmpty()) {
                rs.add(staff);
                continue;
            }
            rs.add(shiftDetail);
        }
        return new ResponseWithData<>(rs, HttpStatus.OK, "");
    }

    @Override
    public Response SixMonthStatisticsStaff(Date dateViewStatistics) {
        return null;
    }

    @Override
    public Response SixMonthStatisticsWorking(Date dateViewStatistics) {
        return null;
    }

    @Override
    public Response summaryStatisticsWorking() {
        //Tính tổng nhân sự trên hệ thống
        Long totalStaff = staffRepository.count();

        //Tính nhân sự mới thêm trong tháng
        //Lấy ra tháng hiện tại
        Date dateNow = new Date();
        // Lấy ngày hiện tại
        LocalDate currentDate = LocalDate.now();

        // Lấy ngày cuối của tháng
        YearMonth yearMonth = YearMonth.from(currentDate);
        LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();

        // In ngày cuối của tháng

        int year = dateNow.getYear();
        int month = dateNow.getMonth() ;

        Date startDate = new Date(year, month, 1);
        Date lastDate = new Date(year, month, lastDayOfMonth.getDayOfMonth());
        System.out.println(startDate + " "+ lastDate);
        System.out.println(managerService.getRecentStaff(startDate, lastDate));
        return null;
    }
}
