package com.elearn.servlet;

import java.io.IOException;

import com.elearn.model.User;
import com.elearn.service.StudentService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/update-student-profile")
public class UpdateStudentProfileServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private StudentService studentService =
            new StudentService();

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

        String phone =
                request.getParameter("phone");

        String email =
                request.getParameter("email");

        String address =
                request.getParameter("address");

        boolean updated =
                studentService.updateStudentProfile(
                        user.getUserId(),
                        phone,
                        email,
                        address
                );

        if (updated) {

            response.setStatus(
                    HttpServletResponse.SC_OK
            );

            response.getWriter().println(
                    "Profile updated successfully"
            );

        } else {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().println(
                    "Unable to update profile"
            );
        }
    }
}