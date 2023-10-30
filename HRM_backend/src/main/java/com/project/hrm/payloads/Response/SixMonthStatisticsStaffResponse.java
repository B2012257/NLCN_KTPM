package com.project.hrm.payloads.Response;

import lombok.Data;

import java.util.List;

@Data
public class SixMonthStatisticsStaffResponse {
    private String[] labels;
    private List<Integer> value;

    public SixMonthStatisticsStaffResponse(String[] labels, List<Integer> value) {
        this.labels = labels;
        this.value = value;
    }
    public SixMonthStatisticsStaffResponse() {

    }
}
