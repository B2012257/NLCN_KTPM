package com.project.hrm.Models;

import jakarta.persistence.Id;

public class Staff {
    @Id
    private String uid;
    private String name;
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }
}