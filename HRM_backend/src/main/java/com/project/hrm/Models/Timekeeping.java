package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;

@Entity
@Data
public class Timekeeping {
    @Id
    @GeneratedValue
    private Long id;
    private Time start;
    private Time end;
    private Long overTime;

   @ManyToOne
   private ShiftDetail shiftDetail;
    public Timekeeping() {
    }
}
