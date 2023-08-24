package com.project.hrm.DTOs.Request;

import com.project.hrm.Models.WorkTime;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class ShiftRegisterDTO {
    private Long id;
    private List<WorkTime> workTime;
}
