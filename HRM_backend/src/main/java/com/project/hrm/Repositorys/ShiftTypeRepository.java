package com.project.hrm.Repositorys;

import com.project.hrm.Models.ShiftType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShiftTypeRepository extends JpaRepository<ShiftType,Integer> {
    ShiftType findOneByName(String name);

}
