package com.elearn.service;

import java.util.List;

import com.elearn.dao.EnrollmentDAO;
import com.elearn.model.StudentEnrollment;

public class EnrollmentService {

    private EnrollmentDAO enrollmentDAO =
            new EnrollmentDAO();

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

        return enrollmentDAO.enrollStudent(
                studentUserId,
                batchName
        );
    }


    public List<StudentEnrollment> getStudentEnrollments(
            String studentUserId) {

        return enrollmentDAO.getEnrollmentsByStudent(
                studentUserId
        );
    }
}