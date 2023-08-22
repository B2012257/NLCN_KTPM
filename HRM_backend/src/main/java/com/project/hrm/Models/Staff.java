package com.project.hrm.Models;

import com.project.hrm.Configs.ValueConfigs;
import com.project.hrm.Utils.UidUtil;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
public class Staff {
    @Id
    private String uid;
    private String userName;
    private String password;
    private String fullName;
    private String phone;
    private Date beginWork;
    private String location;
    private String bankName;
    private String bankAccount;
    public Staff() {
    }
    public Staff(Staff newStaff) {
        this.uid = new UidUtil().GenerateUid(ValueConfigs.uidPrefix);
        this.userName = newStaff.getUserName();
        this.password = newStaff.getPassword();
        this.fullName = newStaff.getFullName();
        this.phone = newStaff.getPhone();
        this.beginWork = newStaff.getBeginWork();
        this.location = newStaff.getLocation();
        this.bankName = newStaff.getBankName();
        this.bankAccount = newStaff.getBankAccount();
    }

}
