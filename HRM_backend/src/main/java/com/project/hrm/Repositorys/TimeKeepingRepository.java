package com.project.hrm.Repositorys;

import com.project.hrm.Models.ShiftDetail;
import com.project.hrm.Models.Timekeeping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TimeKeepingRepository extends JpaRepository<Timekeeping,Long> {

    Timekeeping findByShiftDetail(ShiftDetail shiftDetail);
}
