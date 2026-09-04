package com.elearn.model;

public class StudentEnrollment {

    private int id;
    private int batchId;
    private String studentUserId;
    private String batchName;

    public StudentEnrollment() {
    }

    public StudentEnrollment(
            int id,
            int batchId,
            String studentUserId,
            String batchName) {

        this.id = id;
        this.batchId = batchId;
        this.studentUserId = studentUserId;
        this.batchName = batchName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBatchId() {
        return batchId;
    }

    public void setBatchId(int batchId) {
        this.batchId = batchId;
    }

    public String getStudentUserId() {
        return studentUserId;
    }

    public void setStudentUserId(String studentUserId) {
        this.studentUserId = studentUserId;
    }

    public String getBatchName() {
        return batchName;
    }

    public void setBatchName(String batchName) {
        this.batchName = batchName;
    }
}