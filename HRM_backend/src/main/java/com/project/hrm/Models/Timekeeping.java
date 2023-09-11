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

   @OneToOne
   private ShiftDetail shiftDetail;
    public Timekeeping() {
    }
}
