package com.project.hrm.Models;

import com.project.hrm.Configs.ValueConfigs;
import com.project.hrm.Utils.UidUtil;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;
@Entity
@Data
public class Manager {
    @Id
    private String uid;

    private String userName;
    private String password;
    private String fullName;
    private String phone;
    private Date beginWork;
    private String location;
    private String role = "Quản lý";
    private String bankName;
    private String bankAccount;
    public Manager() {

    }
    public Manager(String username, String password) {
        this.uid = new UidUtil().GenerateUid(ValueConfigs.uidManagerPrefix);
        this.userName = username;
        this.password = password;
    }
    public Manager(Manager manager) {
        this.uid = new UidUtil().GenerateUid(ValueConfigs.uidManagerPrefix);
        this.userName = manager.getUserName();
        this.password = manager.getPassword();
        this.fullName = manager.getFullName();
        this.phone = manager.getPhone();
        this.beginWork = manager.getBeginWork();
        this.location = manager.getLocation();
        this.bankName = manager.getBankName();
        this.bankAccount = manager.getBankAccount();
    }
}
