package com.project.hrm.Services;

//Thiết lập các chức năng liên quan đến thống kê

import java.util.Date;

public interface StatisticsService {
    public void MonthlyStatisticsWorking(Date dateViewStatistics);
    public void SixMonthStatisticsStaff(Date dateViewStatistics);
    public void SixMonthStatisticsWorking(Date dateViewStatistics);

}
