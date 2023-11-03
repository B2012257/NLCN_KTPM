package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.Models.Shift;
import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.Staff;
import com.project.hrm.Models.Type;
import com.project.hrm.Repositorys.ShiftDetailRepository;
import com.project.hrm.Repositorys.StaffRepository;
import com.project.hrm.Services.StatisticsService;
import com.project.hrm.payloads.Response.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

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
            List shiftDetail = shiftDetailRepository.findByShiftDateBetweenAndStaff(new com.project.hrm.Models.Date(startMonth), new com.project.hrm.Models.Date(endMonth), staff);
            if (shiftDetail.isEmpty()) {
                rs.add(staff);
                continue;
            }
            rs.add(shiftDetail);
        }
        return new ResponseWithData<>(rs, HttpStatus.OK, "");
    }

    @Override //Thống kê thay đổi nhân sự 6 tháng
    public Response SixMonthStatisticsStaff() {
        Date dateNow = new Date();
        // Lấy ngày hiện tại
        LocalDate currentDate = LocalDate.now();

        // Lấy ngày cuối của tháng
        YearMonth yearMonth = YearMonth.from(currentDate);
        LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
        int year = dateNow.getYear();
        int month = dateNow.getMonth(); //0-11


        System.out.println("Month" + " " + month);
        int lastFiveMonth = month - 5;
        String[] sixMonthRecentLabel = new String[6]; //Lưu tên label
        // Tìm 6 tháng gần đây
        int j = 0;
        System.out.println("LastFiveMOnth" + " " + lastFiveMonth);

        for(int i = lastFiveMonth; i >= 0; i--) {
            sixMonthRecentLabel[j] = "Tháng " + ((month - i) + 1);
            System.out.println(j);
            j++;
        }
//        for (String a :sixMonthRecentLabel
//             ) {
//            System.out.println(a);
//        }

        //Lập qua danh sách tháng để lấy số lương nhân sự mới theo tùng tháng
        Integer[] sixMonthRecent = new Integer[6]; //Lưu tên label
        // Tìm 6 tháng gần đây
        int x = 0;
        for(int i = lastFiveMonth; i >= 0; i--) {
//            sixMonthRecentLabel[j] = "Tháng " + ((month - i));
            sixMonthRecent[x] = month -i;
            x++;
        }

        List totalStaffSixMonthRc = new ArrayList();
        for (int newMonth:
                sixMonthRecent) {
            Date startDate = new Date(year, newMonth, 1);
            Date lastDate = new Date(year, newMonth, lastDayOfMonth.getDayOfMonth());
            ResponseWithData recentStaffInMonth = (ResponseWithData) managerService.getRecentStaff(startDate, lastDate);
            List recentStaffInMonths = (List) recentStaffInMonth.getData();
            int totalNewStaff = recentStaffInMonths.size();
            totalStaffSixMonthRc.add(totalNewStaff);
        }
//        Date startDate = new Date(year, (month - 6), 1);
//        Date lastDate = new Date(year, month -6, lastDayOfMonth.getDayOfMonth());
//            ResponseWithData recentStaffInMonth = (ResponseWithData) managerService.getRecentStaff(startDate, lastDate);
//            List recentStaffInMonths = (List) recentStaffInMonth.getData();
//            System.out.println(startDate + " "+ recentStaffInMonths.size());
            return new ResponseWithData<>(new SixMonthStatisticsStaffResponse(sixMonthRecentLabel, totalStaffSixMonthRc), HttpStatus.OK, "Dữ liệu biểu đồ 6 tháng");
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
        int month = dateNow.getMonth();

        Date startDate = new Date(year, month, 1);
        Date lastDate = new Date(year, month, lastDayOfMonth.getDayOfMonth());
        try {
            ResponseWithData recentStaffInMonth = (ResponseWithData) managerService.getRecentStaff(startDate, lastDate);
            List recentStaffInMonths = (List) recentStaffInMonth.getData();

            Long totalNewStaffInMonth = (long) recentStaffInMonths.size();

            //Số nhân sự theo từng chức vụ
            List totalEachType = staffRepository.countStaffByType();

            //Đếm số nhân sự làm việc trong ngày -> Lấy shift detail trong ngày
            List<ShiftDetail> shiftDetailsInOneDay = shiftDetailRepository.findByShiftDateBetweenOrderByStaffType(new com.project.hrm.Models.Date(dateNow),
                    new com.project.hrm.Models.Date(dateNow));
            //Lưu danh sách nhân viên làm hôm nay, hông trùng
            Set<Staff> staffWorkingOnDay = new HashSet<>();

            for (ShiftDetail s : shiftDetailsInOneDay) {
                staffWorkingOnDay.add(s.getStaff());
            }
            //Tổng số làm việc hôm nay
            Integer totalWorkToday = staffWorkingOnDay.size();
            // Tạo một Map để tính tổng số nhân sự cho mỗi loại
            Map<String, Integer> totalByType = new HashMap<>();
            //Đếm mỗi loại bao nhiêu người
            for (Staff staff : staffWorkingOnDay) {
                String typeName = staff.getType().getName();
                totalByType.put(typeName.trim(), totalByType.getOrDefault(typeName.trim(), 0) + 1);

            }

            return new ResponseWithData<>(new SummaryStatistics(totalStaff,
                    totalNewStaffInMonth,
                    totalEachType,
                    totalWorkToday,
                    totalByType),
                    HttpStatus.OK, "Tổng quan trong tháng và tổng quan làm việc hôm nay");

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi trong quá trình tính toán");
        }


    }
}
