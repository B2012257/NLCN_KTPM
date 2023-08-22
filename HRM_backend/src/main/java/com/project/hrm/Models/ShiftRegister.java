package com.project.hrm.Models;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class ShiftRegister {
    @Id
    @GeneratedValue
    private Long id;
    @ElementCollection
    private List<WorkTime>  workTimeList;

    public ShiftRegister() {
    }
}
