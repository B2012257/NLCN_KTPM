package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
public class WorkStatistics {
    @Id
    @GeneratedValue
    private Long id;
    private Long totalWorkDays;
    private Long totalHours;
    private Boolean isPay;
    private BigDecimal totalSalary;
    private Timestamp dateExport;
    private Timestamp paymentDate;

    public WorkStatistics() {
    }
}
