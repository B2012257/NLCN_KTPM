package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Time;

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
}
