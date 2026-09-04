package com.elearn.service;

import java.util.List;

import com.elearn.dao.EnrollmentDAO;
import com.elearn.model.StudentEnrollment;
import com.elearn.dao.BatchDAO;
import com.elearn.model.Batch;

public class EnrollmentService {

    private EnrollmentDAO enrollmentDAO =
            new EnrollmentDAO();
    private BatchDAO batchDAO =
            new BatchDAO();

    private StudentFeeService studentFeeService =
            new StudentFeeService();

    public boolean enrollStudent(
            String studentUserId,
            String batchName) {

        if (studentUserId == null ||
            batchName == null ||
            studentUserId.trim().isEmpty() ||
            batchName.trim().isEmpty()) {

            return false;
        }

        if (enrollmentDAO.isAlreadyEnrolled(
                studentUserId,
                batchName)) {

            return false;
        }

        Batch batch =
                batchDAO.findByName(batchName);

        if (batch == null) {
            return false;
        }

        boolean enrolled =
                enrollmentDAO.enrollStudent(
                        studentUserId,
                        batchName
                );

        if (!enrolled) {
            return false;
        }

        return studentFeeService.generateFeeRecords(
                studentUserId,
                batch.getId(),
                batch.getStartDate(),
                batch.getEndDate(),
                batch.getMonthlyFee()
        );
    }


    public List<StudentEnrollment> getStudentEnrollments(
            String studentUserId) {

        return enrollmentDAO.getEnrollmentsByStudent(
                studentUserId
        );
    }
}