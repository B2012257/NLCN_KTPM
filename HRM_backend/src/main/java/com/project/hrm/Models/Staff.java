package com.project.hrm.Models;

import com.project.hrm.Configs.ValueConfigs;
import com.project.hrm.Utils.UidUtil;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.Normalizer;

import static com.project.hrm.Configs.ValueConfigs.passwordStaff;

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
    private String urlAvatar;
    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;
    public Staff() {
    }
    public Staff(Staff newStaff) {
        this.uid = new UidUtil().GenerateUid(ValueConfigs.uidPrefix);
        this.userName = generateUsernameFromFullName(removeAccents(newStaff.getFullName())); // Lấy giá trị userName từ newStaff
        this.password = passwordStaff;
        this.fullName = newStaff.getFullName();
        this.phone = newStaff.getPhone();
        this.beginWork = newStaff.getBeginWork();
        this.location = newStaff.getLocation();
        this.bankName = newStaff.getBankName();
        this.bankAccount = newStaff.getBankAccount();
        this.type =newStaff.getType();
        this.urlAvatar=newStaff.getUrlAvatar();

    }

    public String removeAccents(String input) {
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase();
    }
    public String generateUsernameFromFullName(String fullName) {
        // Xử lý và chuyển đổi fullname thành username ngẫu nhiên
        String[] nameParts = fullName.trim().toLowerCase().split("\\s+");
        StringBuilder usernameBuilder = new StringBuilder();
        for (String part : nameParts) {
            usernameBuilder.append(part);
        }
        return usernameBuilder.toString();
    }

//    public void setUserName(String fullName) {
//        // Xóa khoảng trắng thừa và chuyển đổi tất cả ký tự thành chữ thường
//        String[] nameParts = fullName.trim().toLowerCase().split("\\s+");
//
//        // Xây dựng username từ các phần tên
//        StringBuilder usernameBuilder = new StringBuilder();
//        for (String part : nameParts) {
//            usernameBuilder.append(part);
//        }
//
//        // Đặt giá trị username
//        this.userName = usernameBuilder.toString();
//    }






}
