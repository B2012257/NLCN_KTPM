package com.project.hrm.Repositorys;

import com.project.hrm.Models.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, String> {
    Staff findByUserName(String username);

}
