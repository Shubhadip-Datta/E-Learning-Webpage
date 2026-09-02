package com.elearn.servlet;

import java.io.IOException;
import java.util.List;

import com.elearn.model.StudentEnrollment;
import com.elearn.model.User;
import com.elearn.service.EnrollmentService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/student-enrollments")
public class StudentEnrollmentsServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private EnrollmentService enrollmentService =
            new EnrollmentService();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session =
                request.getSession(false);

        if (session == null) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            return;
        }

        User user =
                (User) session.getAttribute("user");

        if (user == null ||
                !"STUDENT".equals(user.getRole())) {

            response.setStatus(
                    HttpServletResponse.SC_FORBIDDEN
            );

            return;
        }

        List<StudentEnrollment> enrollments =
                enrollmentService.getStudentEnrollments(
                        user.getUserId()
                );

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        StringBuilder json =
                new StringBuilder();

        json.append("[");

        for (int i = 0; i < enrollments.size(); i++) {

            StudentEnrollment enrollment =
                    enrollments.get(i);

            json.append("{");

            json.append("\"batchName\":\"")
                    .append(enrollment.getBatchName())
                    .append("\"");

            json.append("}");

            if (i < enrollments.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        response.getWriter().print(
                json.toString()
        );
    }
}