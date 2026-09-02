package com.elearn.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.elearn.config.DBConnection;
import com.elearn.model.Student;

public class StudentDAO {

    public boolean addStudent(Student student) {

        String sql =
                "INSERT INTO student_profiles " +
                "(user_id, name, batch) " +
                "VALUES (?, ?, ?)";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    student.getUserId()
            );

            statement.setString(
                    2,
                    student.getName()
            );

            statement.setString(
                    3,
                    student.getBatch()
            );

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }


    public Student findByUserId(String userId) {

        String sql =
                "SELECT id, user_id, name, batch, " +
                "phone, email, address " +
                "FROM student_profiles " +
                "WHERE user_id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(
                    1,
                    userId
            );

            try (
                    ResultSet result =
                            statement.executeQuery()
            ) {

                if (result.next()) {

                    return new Student(
                            result.getInt("id"),
                            result.getString("user_id"),
                            result.getString("name"),
                            result.getString("batch"),
                            result.getString("phone"),
                            result.getString("email"),
                            result.getString("address")
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }


    public List<Student> getAllStudents() {

        List<Student> students =
                new ArrayList<>();

        String sql =
                "SELECT id, user_id, name, batch, " +
                "phone, email, address " +
                "FROM student_profiles " +
                "ORDER BY id";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql);

                ResultSet result =
                        statement.executeQuery()
        ) {

            while (result.next()) {

                Student student =
                        new Student(
                                result.getInt("id"),
                                result.getString("user_id"),
                                result.getString("name"),
                                result.getString("batch"),
                                result.getString("phone"),
                                result.getString("email"),
                                result.getString("address")
                        );

                students.add(student);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return students;
    }
}