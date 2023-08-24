package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class ShiftRegister {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_time_id")
    private List<WorkTime> workTime;
    public ShiftRegister() {
    }
}
