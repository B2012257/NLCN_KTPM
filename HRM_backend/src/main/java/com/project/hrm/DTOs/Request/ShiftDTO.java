package com.project.hrm.DTOs.Request;

import com.project.hrm.Models.Manager;
import com.project.hrm.Models.Role;
import com.project.hrm.Models.ShiftType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.sql.Date;

@Data
public class ShiftDTO {
    private Integer id;
    private Date date;
    private String task;
    private ShiftType shiftType;
    private Manager manager;
}
