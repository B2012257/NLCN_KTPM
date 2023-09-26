package com.project.hrm.payloads.Request;

import com.project.hrm.Models.ShiftDetail;
import lombok.Data;

import java.util.List;

@Data
public class ShiftDetailRequest {

    private Integer shift_id;
    private List<ShiftDetail> dataSet;
}
