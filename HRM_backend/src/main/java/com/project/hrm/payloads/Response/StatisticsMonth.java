package com.project.hrm.payloads.Response;

import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.Staff;
import com.project.hrm.Models.Timekeeping;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class StatisticsMonth {

    private Timekeeping timekeeping;
    private Integer totalBasicDayWork;
    private Integer totalOvertimeHourWork;
    private Integer totalHourWork;
    private BigDecimal totalSalary;
    private BigDecimal overtimeSalary;
    private BigDecimal basicSalary;
    private Staff staff;

    public StatisticsMonth() {
    }

    public StatisticsMonth(Timekeeping timekeeping, Integer totalBasicDayWork, Integer totalOvertimeHourWork, Integer totalHourWork, BigDecimal totalSalary, BigDecimal overtimeSalary, BigDecimal basicSalary, Staff staff) {
        this.timekeeping = timekeeping;
        this.totalBasicDayWork = totalBasicDayWork;
        this.totalOvertimeHourWork = totalOvertimeHourWork;
        this.totalHourWork = totalHourWork;
        this.totalSalary = totalSalary;
        this.overtimeSalary = overtimeSalary;
        this.basicSalary = basicSalary;
        this.staff = staff;
    }
}
