package com.elearn.service;

import java.util.List;

import com.elearn.dao.StudentFeeDAO;
import com.elearn.model.StudentFeeRecord;

public class StudentFeeService {

    private StudentFeeDAO studentFeeDAO =
            new StudentFeeDAO();

    public List<StudentFeeRecord> getFeesByStudentAndBatch(
            String studentUserId,
            int batchId) {

        return studentFeeDAO.getFeesByStudentAndBatch(
                studentUserId,
                batchId
        );
    }
    public boolean generateFeeRecords(
            String studentUserId,
            int batchId,
            java.time.LocalDate startDate,
            java.time.LocalDate endDate,
            java.math.BigDecimal monthlyFee) {

        return studentFeeDAO.generateFeeRecords(
                studentUserId,
                batchId,
                startDate,
                endDate,
                monthlyFee
        );
    }
    public List<StudentFeeRecord> getAllFeeRecords() {

        return studentFeeDAO.getAllFeeRecords();
    }
    public boolean markAsPaid(int feeRecordId) {

        return studentFeeDAO.markAsPaid(
                feeRecordId
        );
    }
 // =================================
 // UPDATE PENDING FEES FOR BATCH
 // =================================

 public boolean updatePendingFeesForBatch(
         int batchId,
         java.math.BigDecimal newAmount) {

     return studentFeeDAO.updatePendingFeesForBatch(
             batchId,
             newAmount
     );
 }
}