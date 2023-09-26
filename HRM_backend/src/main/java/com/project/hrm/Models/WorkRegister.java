package com.project.hrm.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

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
    private String start;

    @NotNull
    private String end;

    @NotNull
    @ManyToOne
    private Date date;

    public WorkRegister() {
    }


    public WorkRegister(WorkRegister newWorkRegister) {
        this.id = newWorkRegister.getId();
        this.weekName = newWorkRegister.getWeekName();
        this.start = newWorkRegister.getStart();
        this.end = newWorkRegister.getEnd();
        this.date = newWorkRegister.getDate();
    }

    public WorkRegister(String weekName, String start, String end, Date date) {
        this.weekName = weekName;
        this.start = start;
        this.end = end;
        this.date = date;
    }
}
