package com.project.hrm.payloads.Request;

import com.project.hrm.Models.Shift;
import com.project.hrm.Models.Staff;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Data
public class ShiftDetailRequest {

    private Shift shift;
    private List<Objects> dataSet;
}
