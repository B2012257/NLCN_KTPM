package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Type {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "salary_level")
    private Salary salary;

    public Type() {}

    public Type(Type role) {
        this.id = role.getId();
        this.name = role.getName();
        this.salary = role.getSalary();
    }

    public Type(String name, Salary salary) {
        this.name = name;
        this.salary = salary;
    }
    public Type(String name) {
        this.name = name;
    }
}
