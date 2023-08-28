package com.project.hrm.Repositorys;

import com.project.hrm.Models.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShiftRepository  extends JpaRepository<Shift, Integer> {
}
