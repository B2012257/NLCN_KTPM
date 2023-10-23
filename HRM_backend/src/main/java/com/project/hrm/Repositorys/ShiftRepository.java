package com.project.hrm.Repositorys;

import com.project.hrm.Models.Date;
import com.project.hrm.Models.Shift;
import com.project.hrm.Models.ShiftType;
import com.project.hrm.Models.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Integer> {

    List<Shift> findAllByDateBetween(Date start, Date end);
    List<Shift> findAllByShiftTypeAndDate(ShiftType shiftType, Date date);

    Shift findOneByShiftTypeAndDate(ShiftType shiftType, Date date);

    List<Shift> findAllByShiftType(ShiftType shiftType);

    Shift findOneById(Integer id);


    List<Shift> findByDate(Date date);

}
