package com.project.hrm.payloads.Response;

import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.Staff;
import com.project.hrm.Models.Timekeeping;
import com.project.hrm.Models.Type;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class SummaryStatistics {
    private Long totalStaff;
    private Long newStaffInMonth;
    private List<Map<String, Long>> totalEachType; //Tổng nhân sự theo từng loại
    private Integer totalWorkToday;
    private Map<String, Integer> totalWorkTodayGroupByType; //Tổng nhân sự làm hôm nay theo từng loại

    public SummaryStatistics(Long totalStaff, Long newStaffInMonth, List<Map<String, Long>> totalEachType, Integer totalWorkToday, Map<String, Integer>totalWorkTodayGroupByType) {
        this.totalStaff = totalStaff;
        this.newStaffInMonth = newStaffInMonth;
        this.totalEachType = totalEachType;
        this.totalWorkToday = totalWorkToday;
        this.totalWorkTodayGroupByType = totalWorkTodayGroupByType;
    }
}
