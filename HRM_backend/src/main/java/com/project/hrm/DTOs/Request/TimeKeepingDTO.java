package com.project.hrm.DTOs.Request;

import com.project.hrm.Models.ShiftDetail;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.sql.Time;
@Data
public class TimeKeepingDTO {
    private Long id;
    private Time start;
    private Time end;
    private Long overTime;
    private ShiftDetail shiftDetail;
}
