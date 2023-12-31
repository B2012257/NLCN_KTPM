package com.project.hrm.Repositorys;

import com.project.hrm.Models.Date;
import org.springframework.data.jpa.repository.JpaRepository;



public interface DateRepository extends JpaRepository<Date, java.util.Date> {

    Date findOneByDate(java.util.Date date);
}
