package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "salary_level")
    private Salary salary;

    public Role() {}

    public Role(Role role) {
        this.id = role.getId();
        this.name = role.getName();
        this.salary = role.getSalary();
    }

    public Role(String name, Salary salary) {
        this.name = name;
        this.salary = salary;
    }
}
