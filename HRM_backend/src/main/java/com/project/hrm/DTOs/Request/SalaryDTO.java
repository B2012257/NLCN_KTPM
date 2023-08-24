package com.project.hrm.DTOs.Request;

import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class SalaryDTO {
    private String level;
    private BigDecimal basic;
    private BigDecimal allowance;
    private BigDecimal overtime;

}
