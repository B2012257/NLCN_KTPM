package com.project.hrm.Repositorys;

import com.project.hrm.Models.Salary;
import com.project.hrm.Models.Staff;

import com.project.hrm.Models.Type;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
    Staff findByUserName(String username);
    Staff findByUid(String uid);
    List<Staff> findAllByFullName(String fullName);

    Staff findByBankAccount(String bankNumber);
    List<Staff> findAllByType(Type type);
    List<Staff> findByFullNameContainingIgnoreCase(String partialName);
    List<Staff> findAllBySalary(Salary salary);
    List<Staff> findByCreatedDateTimeBetween(LocalDateTime start, LocalDateTime end);

    List<Staff> findByCreatedDateTimeBetweenOrderByCreatedDateTimeDesc(LocalDateTime start, LocalDateTime end);
//    List<Staff> findAllByOrderByType(Sort sort);
    // Hàm JPA để lấy số lượng nhân sự cho mỗi loại Type
@Query("SELECT s.type.name AS typeName, COUNT(s) AS count FROM Staff s GROUP BY s.type.name")
List<Map<String, Object>> countStaffByType();


}
