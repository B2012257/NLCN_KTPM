package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;

@Entity
@Data
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"staff_uid", "shift_id"})})
public class ShiftDetail {
    @Id
    @GeneratedValue
    private Long id;
    private Time start;
    private Time end;
    private Integer overTime;

    @ManyToOne
    private Staff staff;

    @ManyToOne
    private Shift shift;

    public ShiftDetail() {
    }
}
