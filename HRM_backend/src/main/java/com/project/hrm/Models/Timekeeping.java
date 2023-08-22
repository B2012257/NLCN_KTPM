package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Time;

@Entity
@Data
public class Timekeeping {
    @Id
    @GeneratedValue
    private Long id;
    private Time Start;
    private Time End;
    private Long Overtime;

    public Timekeeping() {
    }
}
