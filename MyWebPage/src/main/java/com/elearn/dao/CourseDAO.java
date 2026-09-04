package com.elearn.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.elearn.config.DBConnection;
import com.elearn.model.Course;

public class CourseDAO {

	// =================================
	// GET ALL COURSES
	// =================================

	public List<Course> getAllCourses() {

		List<Course> courses = new ArrayList<>();

		String sql = "SELECT id, course_id, name, description, active " + "FROM courses " + "ORDER BY id";

		try (Connection connection = DBConnection.getConnection();

				PreparedStatement statement = connection.prepareStatement(sql);

				ResultSet result = statement.executeQuery()) {

			while (result.next()) {

				Course course = new Course(result.getInt("id"), result.getString("course_id"), result.getString("name"),
						result.getString("description"), result.getBoolean("active"));

				courses.add(course);
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

		return courses;
	}
	// =================================
	// ADD COURSE
	// =================================

	public boolean addCourse(String courseId, String name, String description) {

		String sql = "INSERT INTO courses " + "(course_id, name, description, active) " + "VALUES (?, ?, ?, TRUE)";

		try (Connection connection = DBConnection.getConnection();

				PreparedStatement statement = connection.prepareStatement(sql)) {

			statement.setString(1, courseId);
			statement.setString(2, name);
			statement.setString(3, description);

			return statement.executeUpdate() > 0;

		} catch (Exception e) {

			e.printStackTrace();

			return false;
		}
	}
//=================================
//UPDATE COURSE STATUS
//=================================

	public boolean updateCourseStatus(String courseId, boolean active) {

		String sql = "UPDATE courses " + "SET active = ? " + "WHERE course_id = ?";

		try (Connection connection = DBConnection.getConnection();

				PreparedStatement statement = connection.prepareStatement(sql)) {

			statement.setBoolean(1, active);
			statement.setString(2, courseId);

			return statement.executeUpdate() > 0;

		} catch (Exception e) {

			e.printStackTrace();

			return false;
		}
	}
	// =================================
	// REMOVE COURSE
	// =================================

	public boolean removeCourse(String courseId) {

		String sql = "DELETE FROM courses " + "WHERE course_id = ?";

		try (Connection connection = DBConnection.getConnection();

				PreparedStatement statement = connection.prepareStatement(sql)) {

			statement.setString(1, courseId);

			return statement.executeUpdate() > 0;

		} catch (Exception e) {

			e.printStackTrace();

			return false;
		}
	}
}