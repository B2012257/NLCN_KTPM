package com.project.hrm.Models;

import com.project.hrm.Configs.ValueConfigs;
import com.project.hrm.Utils.UidUtil;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private String userName;
    @NotNull
    private String password;
    @NotNull
    private String fullName;
    private String gender;

    @NotNull
    private String phone;

//    private String gender;
    private Date beginWork;
    private String location;
    private String bankName;
    private String bankAccount;
    private String urlAvatar;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;

    @ManyToOne
    @JoinColumn(name = "salary_level")
    private Salary salary;

    public Staff() {
    }

    public Staff(Staff newStaff) {
        this.uid = new UidUtil().GenerateUid(ValueConfigs.uidPrefix);
        this.userName = newStaff.getUserName(); // Lấy giá trị userName từ newStaff
        this.password = newStaff.getPassword();
        this.fullName = newStaff.getFullName();
        this.gender = newStaff.getGender();
        this.phone = newStaff.getPhone();
        this.beginWork = newStaff.getBeginWork();
        this.location = newStaff.getLocation();
        this.bankName = newStaff.getBankName();
        this.bankAccount = newStaff.getBankAccount();
        this.type = newStaff.getType();
        this.urlAvatar = newStaff.getUrlAvatar();

        this.gender = newStaff.getGender();

    }

//    public String removeAccents(String input) {
//        return Normalizer.normalize(input, Normalizer.Form.NFD)
//                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
//                .toLowerCase();
//    }

//    public String generateUsernameFromFullName(String fullName) {
//        // Xử lý và chuyển đổi fullname thành username ngẫu nhiên
//        String[] nameParts = fullName.trim().toLowerCase().split("\\s+");
//        StringBuilder usernameBuilder = new StringBuilder();
//        for (String part : nameParts) {
//            usernameBuilder.append(part);
//        }
//        return usernameBuilder.toString();
//    }

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
