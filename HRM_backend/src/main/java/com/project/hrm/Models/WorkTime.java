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
    @JoinColumn(name = "shift_register_id")
    private ShiftRegister shiftRegister;
    public WorkTime() {
    }


    public WorkTime (WorkTime newWorkTime){
        this.id= newWorkTime.getId();
        this.weekName=newWorkTime.getWeekName();
        this.start=newWorkTime.getStart();
        this.end= newWorkTime.getEnd();
        this.date=newWorkTime.getDate();
        this.shiftRegister=newWorkTime.getShiftRegister();
    }

    public WorkTime(String weekName, String start, String end, Date date, ShiftRegister shiftRegister) {
        this.weekName = weekName;
        this.start = start;
        this.end = end;
        this.date = date;
        this.shiftRegister = shiftRegister;
    }
}
