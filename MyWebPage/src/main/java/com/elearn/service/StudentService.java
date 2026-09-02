package com.elearn.service;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.mindrot.jbcrypt.BCrypt;

import com.elearn.config.DBConnection;
//import com.elearn.dao.StudentDAO;
//import com.elearn.model.Student;

public class StudentService {

//    private StudentDAO studentDAO = new StudentDAO();

    public boolean createStudent(
            String userId,
            String password,
            String name,
            String batch) {

        String passwordHash =
                BCrypt.hashpw(
                        password,
                        BCrypt.gensalt()
                );

        Connection connection = null;

        try {

            connection =
                    DBConnection.getConnection();

            connection.setAutoCommit(false);


            // =================================
            // CREATE LOGIN ACCOUNT
            // =================================

            String userSql =
                    "INSERT INTO users " +
                    "(user_id, password_hash, role, status) " +
                    "VALUES (?, ?, 'STUDENT', 'ACTIVE')";

            try (
                PreparedStatement statement =
                        connection.prepareStatement(userSql)
            ) {

                statement.setString(1, userId);
                statement.setString(2, passwordHash);

                statement.executeUpdate();
            }


            // =================================
            // CREATE STUDENT PROFILE
            // =================================

            String studentSql =
                    "INSERT INTO student_profiles " +
                    "(user_id, name, batch) " +
                    "VALUES (?, ?, ?)";

            try (
                PreparedStatement statement =
                        connection.prepareStatement(studentSql)
            ) {

                statement.setString(1, userId);
                statement.setString(2, name);
                statement.setString(3, batch);

                statement.executeUpdate();
            }


            connection.commit();

            return true;


        } catch (Exception e) {

            if (connection != null) {

                try {
                    connection.rollback();
                } catch (Exception rollbackError) {
                    rollbackError.printStackTrace();
                }
            }

            e.printStackTrace();

            return false;


        } finally {

            if (connection != null) {

                try {
                    connection.close();
                } catch (Exception closeError) {
                    closeError.printStackTrace();
                }
            }
        }
    }
    public boolean updateStudentProfile(
            String userId,
            String phone,
            String email,
            String address) {

        String sql =
                "UPDATE student_profiles " +
                "SET phone = ?, email = ?, address = ? " +
                "WHERE user_id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, phone);
            statement.setString(2, email);
            statement.setString(3, address);
            statement.setString(4, userId);

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
}