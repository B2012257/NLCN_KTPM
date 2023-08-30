package com.project.hrm.Repositorys;

import com.project.hrm.Models.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ShiftRepository  extends JpaRepository<Shift, Integer> {

    List<Shift>findAllByDateBetween(Date start,Date end);
}
