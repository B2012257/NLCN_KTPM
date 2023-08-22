package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
public class Shift {
    @Id
    @GeneratedValue
    private Integer id;
    private Date date;
    private String task;

    public Shift() {
    }
}
