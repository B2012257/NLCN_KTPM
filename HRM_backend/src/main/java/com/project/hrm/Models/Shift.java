package com.project.hrm.Models;

import jakarta.persistence.*;
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

    @ManyToOne
    private ShiftType shiftType;

    @ManyToOne
    private Manager manager;

    public Shift() {
    }

    public Shift(Shift newShift) {
        this.date = newShift.getDate();
        this.task = newShift.getTask();
        this.shiftType = newShift.getShiftType();
        this.manager = newShift.getManager();
    }
}
