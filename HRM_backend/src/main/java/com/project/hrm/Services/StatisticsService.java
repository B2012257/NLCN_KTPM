package com.project.hrm.Services;

//Thiết lập các chức năng liên quan đến thống kê

import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.payloads.Response.StatisticsMonth;

import java.util.Date;
import java.util.List;

public interface StatisticsService {
    public ResponseWithData MonthlyStatisticsWorking(Date dateViewStatistics);
    public Response SixMonthStatisticsStaff(Date dateViewStatistics);
    public Response SixMonthStatisticsWorking(Date dateViewStatistics);

    public Response summaryStatisticsWorking(Date dateViewStatistics); //Trả về tổng quan của hệ thống để hiển thị vào sidebar trang chủ
}
