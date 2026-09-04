package com.elearn.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class StudentFeeRecord {

    private int id;
    private String studentUserId;
    private int batchId;
    private LocalDate feeMonth;
    private BigDecimal amount;
    private String status;


    public StudentFeeRecord(
            int id,
            String studentUserId,
            int batchId,
            LocalDate feeMonth,
            BigDecimal amount,
            String status) {

        this.id = id;
        this.studentUserId = studentUserId;
        this.batchId = batchId;
        this.feeMonth = feeMonth;
        this.amount = amount;
        this.status = status;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getStudentUserId() {
        return studentUserId;
    }

    public void setStudentUserId(String studentUserId) {
        this.studentUserId = studentUserId;
    }


    public int getBatchId() {
        return batchId;
    }

    public void setBatchId(int batchId) {
        this.batchId = batchId;
    }


    public LocalDate getFeeMonth() {
        return feeMonth;
    }

    public void setFeeMonth(LocalDate feeMonth) {
        this.feeMonth = feeMonth;
    }


    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}