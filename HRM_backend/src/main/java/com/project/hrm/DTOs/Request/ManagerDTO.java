package com.project.hrm.DTOs.Request;

import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;
@Data
public class ManagerDTO {

    @Id
    private String uid;

    private String userName;
    private String fullName;
    private String phone;
    private Date beginWork;
    private String location;
    private String role;
    private String bankName;
    private String bankAccount;
}
