package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Data
public class ShiftType {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private Time start;
    private Time end;
    public ShiftType() {
    }
    public ShiftType(ShiftType shiftType) {
        this.id = shiftType.getId();
        this.name = shiftType.getName();
        this.start = shiftType.getStart();
        this.end = shiftType.getEnd();
    }
    public ShiftType(String name, Time start, Time end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }
    public ShiftType(ShiftType newShiftType){
        this.name= newShiftType.getName();
        this.start = newShiftType.getStart();
        this.end= newShiftType.getEnd();
    }


}
