package com.project.hrm.Repositorys;

import com.project.hrm.Models.Date;
import com.project.hrm.Models.WorkRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRegisterRepository extends JpaRepository<WorkRegister,Long> {
        Boolean existsByDate(Date date);

}
