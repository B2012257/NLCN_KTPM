package com.project.hrm.payloads.Response;

import com.project.hrm.Models.Staff;
import com.project.hrm.Models.Timekeeping;
import com.project.hrm.Models.Type;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class SummaryStatistics {
    private Long totalStaff;
    private Long newStaffInMonth;
    private Map<Type, Long> totalEachType; //Tổng nhân sự theo từng loại
    private Long totalWorkToday;
    private Map<Type, Long> totalWorkTodayEachType; //Tổng nhân sự làm hôm nay theo từng loại
}
