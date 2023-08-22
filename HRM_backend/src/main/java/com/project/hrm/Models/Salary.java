package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
@Entity
@Data
public class Salary {
    @Id
    private String level;
    private BigDecimal basic;
    private BigDecimal allowance;
    private BigDecimal overtime;

    public Salary() {
    }
    public Salary(Salary sl) {
        this.level = sl.getLevel();
        this.basic = sl.getBasic();
        this.allowance = sl.getAllowance();
        this.overtime = sl.getOvertime();
    }
}
