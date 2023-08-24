package com.project.hrm.DTOs.Request;

import com.project.hrm.Models.Role;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.sql.Date;

@Data
public class StaffDTO {
    private String uid;
    private String userName;
    private String password;
    private String fullName;
    private String phone;
    private Date beginWork;
    private String location;
    private String bankName;
    private String bankAccount;
    private Role role;
}
