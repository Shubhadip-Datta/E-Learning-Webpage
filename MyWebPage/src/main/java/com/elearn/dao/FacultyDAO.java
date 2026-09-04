package com.elearn.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.elearn.config.DBConnection;
import com.elearn.model.Faculty;

public class FacultyDAO {

	// =================================
	// GET ALL FACULTY
	// =================================

	public List<Faculty> getAllFaculty() {

		List<Faculty> facultyList = new ArrayList<>();

		String sql = "SELECT u.user_id, fp.name, fp.subject, u.status " + "FROM users u " + "JOIN faculty_profiles fp "
				+ "ON u.user_id = fp.user_id " + "WHERE u.role = 'FACULTY' " + "ORDER BY u.user_id";

		try (Connection connection = DBConnection.getConnection();

				PreparedStatement statement = connection.prepareStatement(sql);

				ResultSet result = statement.executeQuery()) {

			while (result.next()) {

				Faculty faculty = new Faculty(result.getString("user_id"), result.getString("name"),
						result.getString("subject"), "ACTIVE".equals(result.getString("status")));

				facultyList.add(faculty);
			}

		} catch (Exception e) {

			e.printStackTrace();
		}

		return facultyList;
	}
	// =================================
	// UPDATE FACULTY STATUS
	// =================================

	public boolean updateFacultyStatus(String userId, boolean active) {

		String status = active ? "ACTIVE" : "INACTIVE";

		String sql = "UPDATE users " + "SET status = ? " + "WHERE user_id = ? " + "AND role = 'FACULTY'";

		try (Connection connection = DBConnection.getConnection();

				PreparedStatement statement = connection.prepareStatement(sql)) {

			statement.setString(1, status);
			statement.setString(2, userId);

			return statement.executeUpdate() > 0;

		} catch (Exception e) {

			e.printStackTrace();

			return false;
		}
	}
	// =================================
	// REMOVE FACULTY
	// =================================

	public boolean removeFaculty(String userId) {

	    String sql =
	            "DELETE FROM users " +
	            "WHERE user_id = ? " +
	            "AND role = 'FACULTY'";

	    try (
	            Connection connection =
	                    DBConnection.getConnection();

	            PreparedStatement statement =
	                    connection.prepareStatement(sql)
	    ) {

	        statement.setString(1, userId);

	        return statement.executeUpdate() > 0;

	    } catch (Exception e) {

	        e.printStackTrace();

	        return false;
	    }
	}

}