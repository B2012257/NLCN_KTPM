package com.project.hrm.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class ShiftRegister {
    @Id
    @GeneratedValue
    private Long id;

    private Date dateStart;
    private Date dateEnd;

    @ManyToOne
    private Staff staff;

    @OneToMany(mappedBy = "shiftRegister")
    private Collection<WorkTime> workTimes;

    public ShiftRegister() {
    }
}
