package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class WorkTime {
    @Id
    @GeneratedValue
    private Long id;
    private String weekName;
    private String start;
    private String end;

    public WorkTime() {
    }
}
