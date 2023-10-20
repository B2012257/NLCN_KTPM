package com.project.hrm.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"date_date", "shiftType_id"})})
//Một ngày không thể có trùng loại ca (Một loại ca không thể xuất hiện 2 lần một ngày)
public class Shift {
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    private Date date;

    private String task; // will be deleted

    @ManyToOne
    @JoinColumn(name = "shiftType_id")
    private ShiftType shiftType;

    public Shift() {
    }
    public Shift(Shift shift) {
        this.id = shift.getId();
        this.date  = shift.getDate();
        this.task = shift.getTask();
        this.shiftType = shift.getShiftType();
    }
}
