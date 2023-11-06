package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Data
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"staff_uid", "shift_id"})}) //Cặp giá trị Staff_uid và Shift_id là duy nhất
public class ShiftDetail {
    @Id
    @GeneratedValue
    private Long id;

    private Integer overTime;

    @ManyToOne()
    private Staff staff;

    @ManyToOne
    private Shift shift;

    public ShiftDetail() {
    }

    public ShiftDetail(ShiftDetail newShiftDetail) {
        this.id = newShiftDetail.getId();
        this.overTime = newShiftDetail.getOverTime();
        this.staff = newShiftDetail.getStaff();
        this.shift = newShiftDetail.getShift();
    }
}
