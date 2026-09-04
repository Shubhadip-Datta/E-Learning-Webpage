package com.elearn.servlet;

import java.io.IOException;

import com.elearn.dao.CourseDAO;
import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/admin-add-course")
public class AdminAddCourseServlet extends HttpServlet {

    private final CourseDAO courseDAO = new CourseDAO();

    @Override
    protected void doPost(HttpServletRequest request,
                           HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);

        // Check login
        if (session == null ||
            session.getAttribute("user") == null) {

            response.setStatus(
                HttpServletResponse.SC_UNAUTHORIZED
            );
            return;
        }

        // Check admin role
        User user =
            (User) session.getAttribute("user");

        if (!"ADMIN".equals(user.getRole())) {

            response.setStatus(
                HttpServletResponse.SC_FORBIDDEN
            );
            return;
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {

            String courseId =
                request.getParameter("courseId");

            String name =
                request.getParameter("name");

            String description =
                request.getParameter("description");

            // Validate required fields
            if (courseId == null ||
                courseId.trim().isEmpty() ||
                name == null ||
                name.trim().isEmpty()) {

                response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
                );

                response.getWriter().print(
                    "{\"success\":false," +
                    "\"message\":\"Course ID and name are required\"}"
                );

                return;
            }

            boolean success =
                courseDAO.addCourse(
                    courseId.trim(),
                    name.trim(),
                    description != null
                        ? description.trim()
                        : ""
                );

            if (success) {

                response.getWriter().print(
                    "{\"success\":true," +
                    "\"message\":\"Course added successfully\"}"
                );

            } else {

                response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().print(
                    "{\"success\":false," +
                    "\"message\":\"Failed to add course\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            response.getWriter().print(
                "{\"success\":false," +
                "\"message\":\"Server error while adding course\"}"
            );
        }
    }
}