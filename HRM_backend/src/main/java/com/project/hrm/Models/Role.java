package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Role {
    @Id
    private Integer id;
    private String name;
    @OneToOne
    private Salary salary;
}
