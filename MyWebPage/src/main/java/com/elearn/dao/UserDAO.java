package com.elearn.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.elearn.config.DBConnection;
import com.elearn.model.User;

public class UserDAO {

    public User findByUserId(String userId) {

        String sql =
                "SELECT id, user_id, password_hash, role, status " +
                "FROM users " +
                "WHERE user_id = ?";

        try (
            Connection connection =
                    DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setString(1, userId);

            ResultSet resultSet =
                    statement.executeQuery();

            if (resultSet.next()) {

                User user = new User();

                user.setId(
                        resultSet.getLong("id")
                );

                user.setUserId(
                        resultSet.getString("user_id")
                );

                user.setPasswordHash(
                        resultSet.getString("password_hash")
                );

                user.setRole(
                        resultSet.getString("role")
                );

                user.setStatus(
                        resultSet.getString("status")
                );

                return user;
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }
    public boolean createUser(
            String userId,
            String passwordHash,
            String role,
            String status) {

        String sql =
                "INSERT INTO users " +
                "(user_id, password_hash, role, status) " +
                "VALUES (?, ?, ?, ?)";

        try (
            Connection connection =
                    DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setString(1, userId);
            statement.setString(2, passwordHash);
            statement.setString(3, role);
            statement.setString(4, status);

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }
}