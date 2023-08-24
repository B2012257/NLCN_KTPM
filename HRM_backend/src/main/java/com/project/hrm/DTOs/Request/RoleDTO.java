package com.project.hrm.DTOs.Request;

import com.project.hrm.Models.Salary;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
public class RoleDTO {
    private Integer id;
    private String name;
    private Salary salary;

}
