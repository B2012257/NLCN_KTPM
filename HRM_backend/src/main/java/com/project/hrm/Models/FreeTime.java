package com.project.hrm.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Time;

@Entity
@Data
public class FreeTime {
    @Id
    @GeneratedValue
    private Long id;

    private Boolean isSchedule;

    @NotNull
    @ManyToOne
    private Date date;

    @ManyToOne
    private Staff staff;

    @ManyToOne
    private ShiftType shiftType;

    public FreeTime() {
    }


    public FreeTime(FreeTime newFreeTime) {
        this.id = newFreeTime.getId();
       this.isSchedule = newFreeTime.getIsSchedule();
        this.date = newFreeTime.getDate();
        this.staff= newFreeTime.getStaff();
    }
}
