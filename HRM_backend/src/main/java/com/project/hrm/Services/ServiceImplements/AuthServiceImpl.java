package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.DTOs.Response.ErrorResponse;
import com.project.hrm.DTOs.Response.LoginResponse;
import com.project.hrm.DTOs.Response.Response;
import com.project.hrm.Models.Manager;
import com.project.hrm.Models.Staff;
import com.project.hrm.Repositorys.ManagerRepository;
import com.project.hrm.Repositorys.StaffRepository;
import com.project.hrm.Services.AuthService;
import com.project.hrm.Utils.JwtUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private StaffRepository staffRepository;

    private Argon2PasswordEncoder encoder;
    private JwtUntil jwtUntitl;
    public AuthServiceImpl() {
        this.encoder = new Argon2PasswordEncoder(
                12,
                64,
                1, 15 * 1024,
                2);
        jwtUntitl = new JwtUntil();
    }
    @Override
    public Response Register(String username, String password) {
        //Kiểm tra username có tồn tại trong DB chưa, kiểm tra cả 2 bảng staff và Manager
        Manager isExist = managerRepository.findByUserName(username);
        Staff  isExistStaff = staffRepository.findByUserName(username);
        //Nếu tồn tại thì thông báo lỗi
        if (isExist != null || isExistStaff != null) {
            return new ErrorResponse(HttpStatus.CONFLICT, "Tài khoản đã tồn tại");
        }
        //Mã hóa mật khẩu
        String hashPassword = encoder.encode(password);
        System.out.println(hashPassword);
        Manager newManager = new Manager(username, hashPassword);
        Manager saved = managerRepository.saveAndFlush(newManager);

        //Lưu thành công, trả về mesage thành công
        if (saved != null) {
            return new LoginResponse<Manager>(
                    newManager, HttpStatus.OK, "Đăng ký tài khoản quản lý thành công");
        }
        return new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra vui lòng thử lại");
    }

    @Override
    public Response Login(String username, String password) {
        //Kiểm tra tên tài khoản có tồn tại hay chưa
        //Kiểm tra mật khẩu gữi lên và mật khẩu trong DB
        Manager isExistByUserName = managerRepository.findByUserName(username);
        Manager managerDb = new Manager(isExistByUserName);
        //Tiếp tục kiểm tra mật khẩu
        if(isExistByUserName != null) {
            if(encoder.matches(password, managerDb.getPassword())) {
                //Trùng khớp mật khẩu
                //Tạo JWT token
                String jwt = jwtUntitl.generateToken(username, managerDb.getRole());
                System.out.println("Token la: " + jwt);
            }
        }
        return null;
    }

    @Override
    public Response Logout() {
        return null;
    }

    @Override
    public Response RfToken() {
        return null;
    }
    //Repository Autowired


}
