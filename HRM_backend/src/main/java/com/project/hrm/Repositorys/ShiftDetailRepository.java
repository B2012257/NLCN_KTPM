package com.project.hrm.Repositorys;

import com.project.hrm.Models.ShiftDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ShiftDetailRepository extends JpaRepository<ShiftDetail, Long> {

    List<ShiftDetail> findAllByDateBetween(Date start,Date end);
}
