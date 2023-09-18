package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"date", "shiftType_id"})})
//Một ngày không thể có trùng loại ca (Một loại ca không thể xuất hiện 2 lần một ngày)
public class Shift {
    @Id
    @GeneratedValue
    private Integer id;
    @NotNull
    private Date date;
    private String task;

    @ManyToOne
    @JoinColumn(name = "shiftType_id")
    private ShiftType shiftType;

    @NotNull
    @ManyToOne
    private Manager manager;

    public Shift() {
    }
    public Shift(Shift shift) {
        this.id = shift.getId();
        this.date  = shift.getDate();
        this.task = shift.getTask();
        this.manager = shift.getManager();
        this.shiftType = shift.getShiftType();
    }
}
