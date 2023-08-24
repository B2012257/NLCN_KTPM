package com.project.hrm.DTOs.Request;

import com.project.hrm.Models.Shift;
import com.project.hrm.Models.Staff;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.sql.Time;
@Data
public class ShiftDetailDTO {
    private Long id;
    private Time start;
    private Time end;
    private Integer overTime;
    private Staff staff;
    private Shift shift;
}
