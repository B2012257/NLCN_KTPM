package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class WorkTime {
    @Id
    @GeneratedValue
    private Long id;
    private String weekName;
    private String start;
    private String end;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "shiftRegister_id")
    private ShiftRegister shiftRegister;
    public WorkTime() {
    }
}
