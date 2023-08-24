package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
public class StaffStatistics {
    @Id
    @GeneratedValue
    private Long id;
    private Long totalWorkDays;
    private Long totalHours;
    private Boolean isPay;
    private BigDecimal totalSalary;
    private Timestamp dateExport;
    private Timestamp paymentDate;

    @ManyToOne
    private Staff staff;
    public StaffStatistics() {
    }
}
