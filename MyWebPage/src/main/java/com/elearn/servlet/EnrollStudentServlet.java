package com.elearn.servlet;

import java.io.IOException;

import com.elearn.model.User;
import com.elearn.service.EnrollmentService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/enroll-student")
public class EnrollStudentServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private EnrollmentService enrollmentService =
            new EnrollmentService();

    @Override
    protected void doPost(
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

        String batchName =
                request.getParameter("batchName");

        if (batchName == null ||
                batchName.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().println(
                    "Batch name is required"
            );

            return;
        }

        boolean enrolled =
                enrollmentService.enrollStudent(
                        user.getUserId(),
                        batchName.trim()
                );

        if (enrolled) {

            response.setStatus(
                    HttpServletResponse.SC_OK
            );

            response.getWriter().println(
                    "Enrollment successful"
            );

        } else {

            response.setStatus(
                    HttpServletResponse.SC_CONFLICT
            );

            response.getWriter().println(
                    "You are already enrolled in this batch"
            );
        }
    }
}