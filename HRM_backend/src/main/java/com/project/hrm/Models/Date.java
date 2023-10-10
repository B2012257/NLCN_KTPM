package com.project.hrm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
@Entity
@Data
public class Date {
    @Id
    @Temporal(TemporalType.DATE)
    private java.util.Date date;

    public Date() {}

    public Date(java.util.Date date) {
        this.date = date;
    }

}
