package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.ParseException;

@Entity
@Data
public class Salary {
    @Id
    private String level;
    private BigDecimal basic;
    private BigDecimal allowance;
    private BigDecimal overtime = BigDecimal.valueOf(0);

    public String getFormattedBasic() {
        DecimalFormat currencyFormat = new DecimalFormat("#,### VND");
        return currencyFormat.format(basic);
    }
    public String getFormattedAllowance() {
        DecimalFormat currencyFormat = new DecimalFormat("#,### VND");
        return currencyFormat.format(allowance);
    }
    public String getFormattedOvertime() {
        DecimalFormat currencyFormat = new DecimalFormat("#,### VND");
        return currencyFormat.format(overtime);
    }

    public Salary() {
    }
    public Salary(Salary sl) {
        this.level = sl.getLevel();
        this.basic = sl.getBasic();
        this.allowance = sl.getAllowance();
        this.overtime = sl.getOvertime();
    }
}
