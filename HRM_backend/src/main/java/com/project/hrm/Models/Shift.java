package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Data
public class Shift {
    @Id
    @GeneratedValue
    private Integer id;
    private Date date;
    private String task;
    @ManyToOne
    private ShiftType shiftType;

    @ManyToOne
    private Manager manager;

    public Shift() {
    }
}
