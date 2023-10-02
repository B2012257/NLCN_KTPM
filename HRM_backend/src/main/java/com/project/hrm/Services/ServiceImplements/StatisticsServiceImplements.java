package com.project.hrm.Services.ServiceImplements;
import com.project.hrm.Services.StatisticsService;
import org.springframework.stereotype.Service;
import java.util.Date;

//Thiết lập các chức năng liên quan đến thống kê
@Service
public class StatisticsServiceImplements implements StatisticsService {
    //Thống kê theo tháng dựa vào vào ngày xem báo cáo (Từ ngày bắt đầu tháng đến ngày xem báo cáo)
    //Hàm này trả về thống kê của toàn bộ nhân sự

    @Override
    public void MonthlyStatisticsWorking(Date dateViewStatistics) {

    }

    @Override
    public void SixMonthStatisticsStaff(Date dateViewStatistics) {

    }

    @Override
    public void SixMonthStatisticsWorking(Date dateViewStatistics) {

    }
}
