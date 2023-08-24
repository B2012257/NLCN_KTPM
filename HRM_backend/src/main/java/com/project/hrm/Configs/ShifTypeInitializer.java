package com.project.hrm.Configs;

import com.project.hrm.Models.ShiftType;
import com.project.hrm.Repositorys.ShiftTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.sql.Time;

//Khởi tạo 3 ca mặc định khi chạy ứng dụng
@Component
public class ShifTypeInitializer implements ApplicationListener<ContextRefreshedEvent> {
    @Value("${server.port}")
    private String port;
    private int defaultStart = 07; //Bắt đầu ca 1 mặc định
    private int defaultTimeLine = 5; //mặc định số tiếng 1 ca
    private
    @Autowired
    ShiftTypeRepository shiftTypeRepository;
    @Override
    //Xử lí bắt sự kiện lúc ứng dụng được khởi chạy hoặc làm mới (ContextRefreshedEvent)
    public void onApplicationEvent(ContextRefreshedEvent event) {
        System.out.println("Ứng dụng khởi chạy tại port: " + port);
        //Kiểm tra shiftType nếu có không có dữ liệu thì sẽ tạo 3 ca sáng chiều tối
        //Mặc định ca 5 tiếng

        if (shiftTypeRepository.count() ==0) {
            ShiftType morningShift = new ShiftType(
                    "Sáng",
                    new Time(defaultStart, 0, 0),
                    new Time(defaultStart + defaultTimeLine, 0, 0));
            ShiftType afternoonShift = new ShiftType(
                    "Chiều",
                    new Time(defaultStart + defaultTimeLine, 0, 0),
                    new Time(defaultStart + defaultTimeLine + defaultTimeLine, 0, 0));
            ShiftType nightShift = new ShiftType(
                    "Tối",
                    new Time(defaultStart + defaultTimeLine + defaultTimeLine, 0, 0),
                    new Time(defaultStart + defaultTimeLine + defaultTimeLine + defaultTimeLine, 0, 0));
            //Lưu 3 ca vào csdl
            shiftTypeRepository.save(morningShift);
            shiftTypeRepository.save(afternoonShift);
            shiftTypeRepository.save(nightShift);
        }


    }
}
