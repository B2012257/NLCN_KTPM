package com.project.hrm.Repositorys;

import com.project.hrm.Models.Date;
import com.project.hrm.Models.Shift;
import com.project.hrm.Models.ShiftDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


import com.project.hrm.Models.Staff;

import java.util.List;


@Repository
public interface ShiftDetailRepository extends JpaRepository<ShiftDetail, Long> {
        List<ShiftDetail>findAllByShift(Shift shift);

        List<ShiftDetail> findByShiftDateBetweenAndStaff(com.project.hrm.Models.Date start, com.project.hrm.Models.Date end, Staff staff); //Tìm trong khoảng thời gian và 1 nhân sự
        ShiftDetail findOneById(Long id);
        Boolean existsShiftDetailByShiftAndStaff(Shift shift, Staff staff);

        List<ShiftDetail> findByShiftIn(List<Shift> shift);
        List<ShiftDetail> findByShiftDateBetweenOrderByStaffType(com.project.hrm.Models.Date start, com.project.hrm.Models.Date end);
        List<ShiftDetail> findAllByStaff(Staff staff);
        void deleteShiftDetailsByStaffUid(String uid);
}
