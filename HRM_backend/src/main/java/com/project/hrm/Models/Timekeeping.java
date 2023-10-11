package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Data
public class Timekeeping {
    @Id
    @GeneratedValue
    private Long id;
    private Time start;
    private Time end;
    private Long overTime;

    private String note;

   @OneToOne
   private ShiftDetail shiftDetail;

    public Timekeeping() {}

    public Timekeeping(Long id, Time start, Time end, Long overTime, ShiftDetail shiftDetail, String note) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.overTime = overTime;
        this.shiftDetail = shiftDetail;
        this.note = note;
    }

    public Timekeeping(Timekeeping timekeeping) {
        this.id=timekeeping.getId();
        this.start=timekeeping.getStart();
        this.end=timekeeping.getEnd();
        this.shiftDetail=timekeeping.getShiftDetail();
        this.overTime=timekeeping.getOverTime();
        this.note = timekeeping.getNote();

    }

}
