package com.elearn.service;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.mindrot.jbcrypt.BCrypt;

import com.elearn.config.DBConnection;

public class FacultyService {

    public boolean createFaculty(
            String userId,
            String password,
            String name,
            String subject) {

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
            // CREATE FACULTY LOGIN ACCOUNT
            // =================================

            String userSql =
                    "INSERT INTO users " +
                    "(user_id, password_hash, role, status) " +
                    "VALUES (?, ?, 'FACULTY', 'ACTIVE')";

            try (
                    PreparedStatement statement =
                            connection.prepareStatement(userSql)
            ) {

                statement.setString(1, userId);
                statement.setString(2, passwordHash);

                statement.executeUpdate();
            }


            // =================================
            // CREATE FACULTY PROFILE
            // =================================

            String profileSql =
                    "INSERT INTO faculty_profiles " +
                    "(user_id, name, subject) " +
                    "VALUES (?, ?, ?)";

            try (
                    PreparedStatement statement =
                            connection.prepareStatement(profileSql)
            ) {

                statement.setString(1, userId);
                statement.setString(2, name);
                statement.setString(3, subject);

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
}