package com.project.hrm.Repositorys;

import com.project.hrm.Models.Salary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaryRepository extends JpaRepository<Salary, String> {
    Salary findOneByLevel (String level);
}
