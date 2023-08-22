package com.project.hrm.Models;

import com.project.hrm.Configs.ValueConfigs;
import com.project.hrm.Utils.UidUtil;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;
@Entity
@Data
public class Manager extends Staff{
    public Manager() {
        super();
    }
    public Manager(Staff newStaff) {
        super(newStaff);
    }
}
