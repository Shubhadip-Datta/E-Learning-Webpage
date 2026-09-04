package com.elearn.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.elearn.config.DBConnection;
import com.elearn.model.StudentEnrollment;

public class EnrollmentDAO {

    public boolean enrollStudent(
            String studentUserId,
            String batchName) {

        String sql =
                "INSERT INTO student_enrollments " +
                "(student_user_id, batch_name) " +
                "VALUES (?, ?)";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, studentUserId);
            statement.setString(2, batchName);

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    public boolean isAlreadyEnrolled(
            String studentUserId,
            String batchName) {

        String sql =
                "SELECT id " +
                "FROM student_enrollments " +
                "WHERE student_user_id = ? " +
                "AND batch_name = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, studentUserId);
            statement.setString(2, batchName);

            try (
                    ResultSet result =
                            statement.executeQuery()
            ) {

                return result.next();
            }

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    public List<StudentEnrollment> getEnrollmentsByStudent(
            String studentUserId) {

        List<StudentEnrollment> enrollments =
                new ArrayList<>();

        String sql =
                "SELECT se.id, b.id AS batch_id, " +
                "se.student_user_id, b.name AS batch_name " +
                "FROM student_enrollments se " +
                "JOIN batches b " +
                "ON se.batch_name = b.name " +
                "WHERE se.student_user_id = ? " +
                "ORDER BY se.id";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    studentUserId
            );

            try (
                    ResultSet result =
                            statement.executeQuery()
            ) {

                while (result.next()) {

                    StudentEnrollment enrollment =
                            new StudentEnrollment(
                                    result.getInt("id"),
                                    result.getInt("batch_id"),
                                    result.getString(
                                            "student_user_id"),
                                    result.getString(
                                            "batch_name")
                            );

                    enrollments.add(enrollment);
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return enrollments;
    }
}
