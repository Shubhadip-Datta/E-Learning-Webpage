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

@WebServlet("/admin-update-course-status")
public class AdminUpdateCourseStatusServlet
        extends HttpServlet {

    private final CourseDAO courseDAO =
            new CourseDAO();

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session =
                request.getSession(false);

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

            String activeValue =
                    request.getParameter("active");

            if (courseId == null ||
                courseId.trim().isEmpty() ||
                activeValue == null) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                response.getWriter().print(
                        "{\"success\":false," +
                        "\"message\":\"Course ID and status are required\"}"
                );

                return;
            }

            boolean active =
                    Boolean.parseBoolean(activeValue);

            boolean success =
                    courseDAO.updateCourseStatus(
                            courseId.trim(),
                            active
                    );

            if (success) {

                response.getWriter().print(
                        "{\"success\":true," +
                        "\"message\":\"Course status updated successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().print(
                        "{\"success\":false," +
                        "\"message\":\"Failed to update course status\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            response.getWriter().print(
                    "{\"success\":false," +
                    "\"message\":\"Server error while updating course status\"}"
            );
        }
    }
}