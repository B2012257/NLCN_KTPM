package com.project.hrm.Models;

import com.project.hrm.Configs.ValueConfigs;
import com.project.hrm.Utils.UidUtil;
import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
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
        this.role =newStaff.getRole();
    }

    public void setUserName(String fullName) {
        // Xóa khoảng trắng thừa và chuyển đổi tất cả ký tự thành chữ thường
        String[] nameParts = fullName.trim().toLowerCase().split("\\s+");

        // Xây dựng username từ các phần tên
        StringBuilder usernameBuilder = new StringBuilder();
        for (String part : nameParts) {
            usernameBuilder.append(part);
        }

        // Đặt giá trị username
        this.userName = usernameBuilder.toString();
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
