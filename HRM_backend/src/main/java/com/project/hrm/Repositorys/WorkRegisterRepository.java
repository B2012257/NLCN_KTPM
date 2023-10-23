package com.project.hrm.Repositorys;

import com.project.hrm.Models.Date;
import com.project.hrm.Models.FreeTime;
import com.project.hrm.Models.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRegisterRepository extends JpaRepository<FreeTime,Long> {
        Boolean existsByDate(Date date);



}
