package com.project.hrm.Repositorys;

import com.project.hrm.Models.Date;
import com.project.hrm.Models.Shift;
import com.project.hrm.Models.ShiftType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    List<Shift> findAllByShiftType(ShiftType shiftType);

    Shift findOneById(Long id);
    List<Shift> findByDate(Date date);
}
