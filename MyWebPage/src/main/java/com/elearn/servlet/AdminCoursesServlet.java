package com.elearn.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.elearn.dao.CourseDAO;
import com.elearn.model.Course;
import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/admin-courses")
public class AdminCoursesServlet extends HttpServlet {

    private final CourseDAO courseDAO =
            new CourseDAO();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session =
                request.getSession(false);

        if (session == null ||
            session.getAttribute("user") == null) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            return;
        }

        User user =
                (User) session.getAttribute("user");

        if (!"ADMIN".equals(user.getRole())) {

            response.setStatus(
                    HttpServletResponse.SC_FORBIDDEN
            );

            return;
        }

        List<Course> courses =
                courseDAO.getAllCourses();

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        PrintWriter out =
                response.getWriter();

        out.print("[");

        for (int i = 0;
             i < courses.size();
             i++) {

            Course course =
                    courses.get(i);

            out.print("{");

            out.print(
                    "\"id\":" +
                    course.getId() +
                    ","
            );

            out.print(
                    "\"courseId\":\"" +
                    escapeJson(
                            course.getCourseId()
                    ) +
                    "\","
            );

            out.print(
                    "\"name\":\"" +
                    escapeJson(
                            course.getName()
                    ) +
                    "\","
            );

            out.print(
                    "\"description\":\"" +
                    escapeJson(
                            course.getDescription()
                    ) +
                    "\","
            );

            out.print(
                    "\"active\":" +
                    course.isActive()
            );

            out.print("}");

            if (i < courses.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }

    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}