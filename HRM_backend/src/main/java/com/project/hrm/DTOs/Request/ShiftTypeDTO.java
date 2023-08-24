package com.project.hrm.DTOs.Request;

import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Time;
@Data
public class ShiftTypeDTO {
    @Id
    private Integer id;
    private String name;
    private Time start;
    private Time end;
}
