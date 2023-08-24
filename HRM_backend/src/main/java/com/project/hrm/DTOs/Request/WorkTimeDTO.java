package com.project.hrm.DTOs.Request;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class WorkTimeDTO {
    private Long id;
    private String weekName;
    private String start;
    private String end;

}
