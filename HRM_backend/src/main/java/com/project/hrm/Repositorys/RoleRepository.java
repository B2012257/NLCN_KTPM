package com.project.hrm.Repositorys;

import com.project.hrm.Models.Role;
import com.project.hrm.Models.Salary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByName(String name);
    List<Role> findAllBySalary(Salary salary);

    Role findOneById(Integer id);
}
