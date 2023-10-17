package com.project.hrm.Repositorys;

import com.project.hrm.Models.Date;
import com.project.hrm.Models.FreeTime;
import com.project.hrm.Models.ShiftType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FreeTimeRepository extends JpaRepository<FreeTime, Long> {
    List<FreeTime> findAllByShiftTypeAndDateAndIsScheduleFalse(ShiftType shiftType, Date date);
}
