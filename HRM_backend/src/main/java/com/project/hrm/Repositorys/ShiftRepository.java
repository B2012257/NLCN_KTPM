package com.project.hrm.Repositorys;

import com.project.hrm.Models.Date;
import com.project.hrm.Models.Shift;
import com.project.hrm.Models.ShiftType;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Integer> {

    List<Shift> findAllByDateBetween(Date start, Date end);

    List<Shift> findAllByShiftType(ShiftType shiftType);

    Shift findOneById(Integer id);
=======

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    List<Shift> findAllByShiftType(ShiftType shiftType);

    Shift findOneById(Long id);
    List<Shift> findByDate(Date date);
>>>>>>> main
}
