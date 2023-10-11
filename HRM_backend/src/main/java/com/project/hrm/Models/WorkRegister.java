package com.project.hrm.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Data
public class WorkRegister {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String weekName;

    @NotNull
    private Time start;

    @NotNull
    private Time end;

    @NotNull
    @ManyToOne
    private Date date;

    @ManyToOne
    private Staff staff;

    public WorkRegister() {
    }


    public WorkRegister(WorkRegister newWorkRegister) {
        this.id = newWorkRegister.getId();
        this.weekName = newWorkRegister.getWeekName();
        this.start = newWorkRegister.getStart();
        this.end = newWorkRegister.getEnd();
        this.date = newWorkRegister.getDate();
        this.staff=newWorkRegister.getStaff();
    }

    public WorkRegister(String weekName, Time start, Time end, Date date) {
        this.weekName = weekName;
        this.start = start;
        this.end = end;
        this.date = date;

    }
}
