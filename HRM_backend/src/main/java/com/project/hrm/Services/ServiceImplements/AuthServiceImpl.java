package com.project.hrm.Services.ServiceImplements;

import com.project.hrm.payloads.Response.ErrorResponse;
import com.project.hrm.payloads.Response.ResponseWithData;
import com.project.hrm.payloads.Response.Response;
import com.project.hrm.Models.Manager;
import com.project.hrm.Models.Staff;
import com.project.hrm.Repositorys.ManagerRepository;
import com.project.hrm.Repositorys.StaffRepository;
import com.project.hrm.Services.AuthService;
import com.project.hrm.Utils.JwtUntil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

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
        Staff isExistStaff = staffRepository.findByUserName(username);
        //Nếu tồn tại thì thông báo lỗi
        if (isExist != null || isExistStaff != null) {
            return new ErrorResponse(HttpStatus.CONFLICT, "Tài khoản đã tồn tại");
        }
        //Mã hóa mật khẩu
        String hashPassword = encoder.encode(password);

        Manager newManager = new Manager(username, hashPassword);
        Manager saved = managerRepository.saveAndFlush(newManager);

        //Lưu thành công, trả về mesage thành công
        if (saved != null) {
            return new ResponseWithData<Manager>(
                    newManager, HttpStatus.OK, "Đăng ký tài khoản quản lý thành công");
        }
        return new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR, "Có lỗi xảy ra vui lòng thử lại");
    }

    @Override
    public ResponseEntity Login(String username, String password) {
        //Kiểm tra tên tài khoản có tồn tại hay chưa trong cả 2 bảng Staff và Manager
        //Kiểm tra mật khẩu gữi lên và mật khẩu trong DB
        Manager isManagerExistByUserName = managerRepository.findByUserName(username);
        //Nếu có trong bảng Manager
        if (isManagerExistByUserName != null) {
            if (encoder.matches(password, isManagerExistByUserName.getPassword())) {
                //Trùng khớp mật khẩu
                //Tạo JWT token
                String jwt = jwtUntitl.generateToken(username, isManagerExistByUserName.getRole());
                System.out.println("Token la: " + jwt);
                ResponseCookie cookie = ResponseCookie.from("Authentication", jwt)
                        .httpOnly(true)
                        .sameSite("Lax")
                        .path("/") // Đảm bảo cookie áp dụng cho toàn bộ ứng dụng
                        .build();

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
                ResponseWithData loginResponseRs = new ResponseWithData(
                        isManagerExistByUserName,
                        HttpStatus.OK,
                        "Đăng nhập thành công");

                return ResponseEntity.ok()
                        .headers(headers)
                        .body(loginResponseRs);
            } else
                return ResponseEntity.ok().body(new ErrorResponse(HttpStatus.UNAUTHORIZED, "Tài khoản hoặc mật khẩu không đúng!"));
        }
        //Nếu có trong bảng Staff
        Staff isStaffExistByUserName = staffRepository.findByUserName(username);
        if (isStaffExistByUserName != null) {

            if (encoder.matches(password, isManagerExistByUserName.getPassword())) {
                //Trùng khớp mật khẩu
                //Tạo JWT token
                String jwt = jwtUntitl.generateToken(username, isManagerExistByUserName.getRole());
                System.out.println("Token la: " + jwt);
                ResponseCookie cookie = ResponseCookie.from("Authentication", jwt)
                        .httpOnly(true)
                        .sameSite("Lax")
                        .path("/") // Đảm bảo cookie áp dụng cho toàn bộ ứng dụng
                        .build();

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
                ResponseWithData loginResponseRs = new ResponseWithData(
                        isStaffExistByUserName,
                        HttpStatus.OK,
                        "Đăng nhập thành công");

                return ResponseEntity.ok()
                        .headers(headers)
                        .body(loginResponseRs);
            } else {
                return ResponseEntity.ok().body(new ErrorResponse(HttpStatus.UNAUTHORIZED, "Tài khoản hoặc mật khẩu không đúng!"));
            }
        }
        //Nếu không tồn tại
        return ResponseEntity.ok()
                .body(new ErrorResponse(HttpStatus.NOT_FOUND, "Tài khoản không tồn tại!"));
    }

    @Override
    public ResponseEntity Logout() {
        //Ghi đè tại cookie cũ và cho hết hạn luôn. Trình duyệt sẽ tự xóa
        ResponseCookie cookie = ResponseCookie.from("Authentication", null)
                .maxAge(0) // Thời gian sống của cookie (đơn vị: giây)
                .httpOnly(true) // Chỉ cho phép truy cập qua HTTP, không cho phép JavaScript truy cập
                //.secure(true) // Chỉ sử dụng cookie qua kết nối HTTPS
                .path("/") // Đường dẫn áp dụng cookie (ở đây áp dụng cho toàn bộ ứng dụng)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok()
                .headers(headers)
                .body(new Response(HttpStatus.OK, "Đăng xuất thành công"));
    }

    @Override
    public Response RfToken() {
        return null;
    }

    @Override
    public String testCookie() {

        return "Thanh cong";
    }
    //Repository Autowired


}
