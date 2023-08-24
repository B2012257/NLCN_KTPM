package com.project.hrm.DTOs.Request;

import com.project.hrm.Models.Staff;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class StaffStatisticsDTO {
    private Long id;
    private Long totalWorkDays;
    private Long totalHours;
    private Boolean isPay;
    private BigDecimal totalSalary;
    private Timestamp dateExport;
    private Timestamp paymentDate;
    private Staff staff;
}
