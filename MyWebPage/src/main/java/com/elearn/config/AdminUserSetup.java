package com.elearn.config;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.mindrot.jbcrypt.BCrypt;

public class AdminUserSetup {

    public static void main(String[] args) {

        String userId = "ADM001";
        String password = "admin123";
        String role = "ADMIN";

        String passwordHash =
                BCrypt.hashpw(password, BCrypt.gensalt());

        String sql =
                "INSERT INTO users " +
                "(user_id, password_hash, role, status) " +
                "VALUES (?, ?, ?, 'ACTIVE')";

        try (
            Connection connection =
                    DBConnection.getConnection();

            PreparedStatement statement =
                    connection.prepareStatement(sql)
        ) {

            statement.setString(1, userId);
            statement.setString(2, passwordHash);
            statement.setString(3, role);

            int rowsInserted =
                    statement.executeUpdate();

            if (rowsInserted > 0) {
                System.out.println(
                        "Admin user created successfully!"
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
