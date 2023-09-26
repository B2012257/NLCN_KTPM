package com.project.hrm.Repositorys;

import com.project.hrm.Models.Staff;
<<<<<<< HEAD
=======
import com.project.hrm.Models.Type;
>>>>>>> main
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
    Staff findByUserName(String username);
    Staff findByUid(String uid);
    List<Staff> findAllByFullName(String fullName);
<<<<<<< HEAD
=======
    Staff findByBankAccount(String bankNumber);
    List<Staff> findAllByType(Type type);
>>>>>>> main

}
