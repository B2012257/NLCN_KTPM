package com.project.hrm.Services;

//Thiết lập các chức năng liên quan đến thống kê

import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.payloads.Response.StatisticsMonth;

import java.util.Date;
import java.util.List;

public interface StatisticsService {
    public ResponseWithData MonthlyStatisticsWorking(Date dateViewStatistics);
    public void SixMonthStatisticsStaff(Date dateViewStatistics);
    public void SixMonthStatisticsWorking(Date dateViewStatistics);

}
