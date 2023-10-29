package com.project.hrm.Controllers;

import com.project.hrm.Services.ServiceImplements.StatisticsServiceImplements;
import com.project.hrm.Services.StatisticsService;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.payloads.Response.ResponseWithData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/manager/statistics")
public class StatisticsController {
    @Autowired
    StatisticsServiceImplements statisticsService;
    @GetMapping("/month")
    private ResponseWithData monthStatistics() {
        return statisticsService.MonthlyStatisticsWorking(new Date());
    }


    @GetMapping("/work/sumary")
    private Response summaryStatisticsWorking() {
        return statisticsService.summaryStatisticsWorking();
    }

    @GetMapping("/newStaff/sumarySixMonth")
    private Response SixMonthStatisticsStaff() {
        return statisticsService.SixMonthStatisticsStaff();
    }
}
