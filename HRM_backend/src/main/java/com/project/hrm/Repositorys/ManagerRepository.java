package com.project.hrm.Repositorys;

import com.project.hrm.Models.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, String> {
    Manager findByUserName(String username);
}
